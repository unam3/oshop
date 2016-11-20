"use strict";

const React = require("react"),
    ReactDOM = require("react-dom"),
    rr = require("react-redux"),
    products = require('../products.js'),
    BlueButton = require('../blueButton.js'),
    Cart = require("../cart.js"),

    Quantity = function (props) {
      return <div className="product__element">
          <img />
          <input className="quantity"
            onChange={(e) => {
              e.preventDefault();
              props.onQuantityChange({
                id: props.productId,
                quantity: parseInt(e.target.value)
              });
            }}
            type="number" min="1" defaultValue="1" />
          <img />
        </div>;
    },

    DeleteOrderProduct = function (props) {
      return <a href="#" className="product__delete-product-button product__element blue-text link-wo-underline"
        onClick={(e) => {e.preventDefault(); props.f({"id": props.productId});}}>Убрать</a>
    },

    OrderProducts = function (props) {
      return <div className="order-products flex-column flex-children">
        {props.orderProducts.map((product) => product ? (<div className="product order-products__product padded" key={product.id}>
          <img className="product__preview product__element order-product-product-preview" />
          <div className="product__name-link product__element">
            <a href="#" className="blue-text">
              {product.brand} {product.name}
            </a>
          </div>
          <div className="product__cost product__element order-product-cost">{product.cost} руб.</div>
          <Quantity onQuantityChange={props.onQuantityChange} productId={product.id} />
          <DeleteOrderProduct f={props.onDeleteFromOrder} productId={product.id} />
        </div>) : null)}
      </div>;
    },

    TotalCost = function (props) {
      const evaluateTotalCost = function (piq, products) {
        var product,
          getProduct = function (products, id) {
            if (!products.length)
              throw "shi~~";
            products.some((p) => {
              product = false;
              if (p && p.id === id) {
                product = p;
                return true;
              }
            });
            return product;
          };
        return Object.keys(piq).reduce(
            (costSum, productId) => {
              //console.log(costSum, piq[productId],
              //  getProduct(products, productId))
              const product = getProduct(products, productId);
              return costSum + piq[productId] * (product && product.cost || 0);
            },
            0
          )
      };
      return <div className="total-cost">
        Итого: {evaluateTotalCost(props.data.productId_quantity, props.data.orderProducts)} руб.
      </div>;
    },

    Form = function (props) {
      const form = {},
        processResponse = function (response) {
          switch (response) {
            case 200:
              props.toggleProcessingOrderStatus();
              props.handleServerResponse({
                "payload": {
                  "statusCode": 200
                }
              });
              break;
            default:
              debugger;
          }
        },
        checkout = function (props) {
          props.toggleProcessingOrderStatus();
          // проверка заполненности формы 
          let emptyInput;
          if (Object.keys(form)
              .every((inputName) => {
                let v = form[inputName].value,
                  checkPassed = (v.length !== 0) && /\S/m.test(v);
                console.log("cp", checkPassed)
                if (!checkPassed)
                  emptyInput = form[inputName];
                return checkPassed; })) {
            // отправка
            setTimeout(processResponse, 1000, 200);
          } else {
            props.toggleProcessingOrderStatus();
            emptyInput.focus();
          }
        };
      return <form className="order-form flex-column">
          <div className="order-form__requirement">
            Поля ниже необходимо заполнить:
          </div>
          <input name="name" ref={(l) => form["name"] = l}
            placeholder="Ваше имя" required />
          <input name="email" ref={(l) => form["email"] = l} placeholder="Email"
            required />
          <input name="phone_number" ref={(l) => form["phone_number"] = l}
            placeholder="Телефон" required />
          <input name="address" ref={(l) => form["address"] = l}
            placeholder="Адрес доставки" required />
          <textarea className="comment-ta" ref={(l) => form["comment"] = l}
            name="comment" placeholder="Комментарий" required />
          <BlueButton text="Оформить заказ" additionalClasses="checkout"
            fobj={{f: checkout, args: props}} />
        </form>;
    },

    productsCategory = Object.keys(products)[0],
    productsList = products[productsCategory],
    store = require('redux').createStore(require('../reducers/order.js'),
      { 
        // product.id только хранить. тянуть с сервака все остальное
        orderProducts: [
          {
            "id": "1f3",
            "name": "Gel",
            "cost": 6600,
            "brand": "Asics"
          },
          {
            "id": "a3d",
            "name": "Wave",
            "cost": 5520,
            "brand": "Mizuno"
          },
          {
            "id": "d2b",
            "name": "Del Mar",
            "cost": 4930,
            "brand": "Zoot"
          }
        ],
        productId_quantity: {
          "1f3": 1,
          "a3d": 1,
          "d2b": 1
        },
        processingOrder: false,
        serverResponse: false
      }
    ),
    actions = require("../actions/order.js"),
    mapDispatchToProps = function (dispatch) {
      return {
        onQuantityChange: (props) => dispatch(actions.changeQuantity(props)),
        onDeleteFromOrder: (props) => dispatch(actions.deleteFromOrder(props)),
        toggleProcessingOrderStatus: (props) => dispatch(actions.toggleProcessingOrderStatus(props)),
        handleServerResponse: (props) => dispatch(actions.handleServerResponse(props))
      };
    },
    mapStateToProps = function (state) {
      return {
        orderProducts: state.orderProducts,
        productId_quantity: state.productId_quantity,
        processingOrder: state.processingOrder,
        serverResponse: state.serverResponse
      };
    },
    OrderInfo = function (props) {
     return <div className="order-info">
            {props.text}
        </div>;
    },
    Order = function (props) {
      return <div className="order flex-column">
        <h1 className="title">Оформление заказа</h1>
        <OrderProducts
          orderProducts={props.orderProducts}
          onQuantityChange={props.onQuantityChange}
          onDeleteFromOrder={props.onDeleteFromOrder}
          />
        <TotalCost data={{
          orderProducts: props.orderProducts,
          productId_quantity: props.productId_quantity
        }} />
      <Form productId_quantity={props.productId_quantity}
        toggleProcessingOrderStatus={props.toggleProcessingOrderStatus}
        handleServerResponse={props.handleServerResponse} />
      </div>;
    },
    OrderWrapper = function (props) {
      const redirect = function () {
        setTimeout(() => window.location = "cart", 6000);
      };
      console.log(props.processingOrder, props.serverResponse)
      return props.orderProducts.some((l) => l !== null) ?
        (props.processingOrder ? 
          (<OrderInfo text="Обрабатываем заказ" />)
            : props.serverResponse === 200 ?
              // можно редирект в корзину для оформления нового заказа
              (<OrderInfo text="Заказ успешно отправлен" />)
              : (<Order
                orderProducts={props.orderProducts}
                productId_quantity={props.productId_quantity}
                onQuantityChange={props.onQuantityChange}
                onDeleteFromOrder={props.onDeleteFromOrder}
                toggleProcessingOrderStatus={props.toggleProcessingOrderStatus}
                handleServerResponse={props.handleServerResponse}
                />)
        )
      : (redirect(),
        <OrderInfo
          text="В форме заказа нет товаров. Перемещаемся в корзину для составления нового заказа" />);
    },
    ConOrder = rr.connect(
      mapStateToProps,
      mapDispatchToProps
    )(OrderWrapper);

ReactDOM.render(
  <rr.Provider store={store}>
    <ConOrder />
  </rr.Provider>,
  document.getElementById("main")
);

ReactDOM.render(
  <Cart.component cart={Cart.stored} />,
  document.getElementById("cart")
);
