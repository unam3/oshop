const React = require("react"),
    {render} = require("react-dom"),
    {connect, Provider} = require("react-redux"),
    BlueButton = require('../components/blueButton.js'),
    Cart = require("../components/cart.js"),

    Quantity = ({onQuantityChange, productId}) => (
      <div className="product__element">
        <img />
        <input className="quantity"
          onChange={(e) => {
            e.preventDefault();
            onQuantityChange({
              id: productId,
              quantity: parseInt(e.target.value)
            });
          }}
          type="number" min="1" defaultValue="1" />
        <img />
      </div>
    ),

    DeleteOrderProduct = ({f, productId}) => (
      <a href="#" className="product__delete-product-button product__element blue-text link-wo-underline"
          onClick={(e) => {
            e.preventDefault();
            f({"id": productId});
          }}>
        Убрать
      </a>
    ),

    OrderProducts = ({orderProducts, onQuantityChange, onDeleteFromOrder}) => (
      <div className="order-products flex-column flex-children">
        {
          orderProducts.map((product) => product ?
            (<div className="product order-products__product padded"
                key={product.id}>
            <img className="product__preview product__element order-product-product-preview" />
            <div className="product__name-link product__element">
              <a href="#" className="blue-text">
                {product.brand} {product.name}
              </a>
            </div>
            <div className="product__cost product__element order-product-cost">
              {product.cost} руб.
            </div>
            <Quantity onQuantityChange={onQuantityChange}
                productId={product.id} />
            <DeleteOrderProduct f={onDeleteFromOrder} productId={product.id} />
          </div>)
          : null)
        }
      </div>
    ),

    TotalCost = function ({data}) {
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
          (costSum, productId) => (
            costSum + piq[productId]
              * ((getProduct(products, productId) || {}).cost || 0)
          ),
          0
        );
      };
      return <div className="total-cost">
        Итого: {evaluateTotalCost(
          data.productId_quantity,
          data.orderProducts)
        } руб.
      </div>;
    },

    Form = function ({toggleProcessingOrderStatus, handleServerResponse}) {
      const form = {},
        processResponse = function (response) {
          switch (response) {
            case 200:
              toggleProcessingOrderStatus();
              handleServerResponse({
                "payload": {
                  "statusCode": 200
                }
              });
              break;
            default:
              debugger;
          }
        },
        checkout = function () {
          toggleProcessingOrderStatus();
          // проверка заполненности формы 
          let emptyInput;
          if (Object.keys(form)
              .every((inputName) => {
                let v = form[inputName].value,
                  checkPassed = (v.length !== 0) && /\S/m.test(v);
                console.log("cp", checkPassed);
                if (!checkPassed)
                  emptyInput = form[inputName];
                return checkPassed; })) {
            // отправка
            setTimeout(processResponse, 1000, 200);
          } else {
            toggleProcessingOrderStatus();
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
            fobj={{f: checkout}} />
        </form>;
    },

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
    {changeQuantity, deleteFromOrder, toggleProcessingOrderStatus,
        handleServerResponse} = require("../actions/order.js"),
    mapDispatchToProps = (dispatch) => ({
      onQuantityChange: (props) => dispatch(changeQuantity(props)),
      onDeleteFromOrder: (props) => dispatch(deleteFromOrder(props)),
      toggleProcessingOrderStatus: (props) => dispatch(toggleProcessingOrderStatus(props)),
      handleServerResponse: (props) => dispatch(handleServerResponse(props))
    }),
    mapStateToProps = ({orderProducts, productId_quantity,
        processingOrder, serverResponse}) => ({
      orderProducts: orderProducts,
      productId_quantity: productId_quantity,
      processingOrder: processingOrder,
      serverResponse: serverResponse
    }),
    OrderInfo = ({text}) => (
      <div className="order-info">  
        {text}
      </div>
    ),
    Order = ({orderProducts, onQuantityChange, onDeleteFromOrder, 
        productId_quantity, toggleProcessingOrderStatus,
        handleServerResponse}) => (
      <div className="order flex-column">
        <h1 className="title">Оформление заказа</h1>
        <OrderProducts
          orderProducts={orderProducts}
          onQuantityChange={onQuantityChange}
          onDeleteFromOrder={onDeleteFromOrder}
          />
        <TotalCost data={{
          orderProducts: orderProducts,
          productId_quantity: productId_quantity
        }} />
      <Form productId_quantity={productId_quantity}
        toggleProcessingOrderStatus={toggleProcessingOrderStatus}
        handleServerResponse={handleServerResponse} />
      </div>
    ),
    OrderWrapper = function ({processingOrder, serverResponse, orderProducts,
        productId_quantity, onQuantityChange, onDeleteFromOrder,
        toggleProcessingOrderStatus, handleServerResponse}) {
      const redirect = (path) => setTimeout(() => window.location = path, 6000);
      console.log(processingOrder, serverResponse);
      return orderProducts.some((l) => l !== null) ?
        (processingOrder ? 
          (<OrderInfo text="Обрабатываем заказ" />)
            : serverResponse === 200 ?
              // можно редирект в корзину для оформления нового заказа
              (<OrderInfo text="Заказ успешно отправлен" />)
              : (<Order
                orderProducts={orderProducts}
                productId_quantity={productId_quantity}
                onQuantityChange={onQuantityChange}
                onDeleteFromOrder={onDeleteFromOrder}
                toggleProcessingOrderStatus={toggleProcessingOrderStatus}
                handleServerResponse={handleServerResponse}
                />)
        )
      : (redirect("cart"),
        <OrderInfo
          text="В форме заказа нет товаров. Перемещаемся в корзину для составления нового заказа" />);
    },
    ConOrder = connect(
      mapStateToProps,
      mapDispatchToProps
    )(OrderWrapper);

render(
  <Provider store={store}>
    <ConOrder />
  </Provider>,
  document.getElementById("main")
);

render(
  <Cart.component cart={Cart.stored} />,
  document.getElementById("cart")
);
