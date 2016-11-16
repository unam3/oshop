"use strict";

const React = require("react"),
    ReactDOM = require("react-dom"),
    rr = require("react-redux"),
    products = require('../products.js'),
    BlueButton = require('../blueButton.js'),

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
          <a href="#" className="product__name-link product__element blue-text">{product.brand} {product.name}</a>
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
              console.log(costSum, piq[productId],
                getProduct(products, productId))
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
      const checkout = function (args) {
        console.log("оформили");
      };
      return <form className="order-form flex-column">
          <input name="name" placeholder="Ваше имя" required />
          <input name="email" placeholder="Email" required />
          <input name="phone_number" placeholder="Телефон" required />
          <input name="adress" placeholder="Адрес доставки" required />
          <textarea className="comment-ta" name="comment" placeholder="Комментарий" required />
          <BlueButton text="Оформить заказ" additionalClasses="checkout"
            fobj={{f: checkout}} />
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
        }
      }
    ),
    actions = require("../actions/order.js"),
    mapDispatchToProps = function (dispatch) {
      return {
        onQuantityChange: (props) => dispatch(actions.changeQuantity(props)),
        onDeleteFromOrder: (props) => dispatch(actions.deleteFromOrder(props))
      };
    },
    mapStateToProps = function (state) {
      return {
        orderProducts: state.orderProducts,
        productId_quantity: state.productId_quantity
      };
    },
    Order = function (props) {
      const redirect = function () {
        setTimeout(() => window.location = "cart", 6000);
      }
      return props.orderProducts.some((l) => l !== null) ? (
        <div className="order flex-column">
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
        <Form />
        </div>)
      : (redirect(),
        <div className="empty-order">
            Заказ пуст, перемещаемся в корзину для составления нового заказа
        </div>)
    },
    ConOrder = rr.connect(
      mapStateToProps,
      mapDispatchToProps
    )(Order);

ReactDOM.render(
  <rr.Provider store={store}>
    <ConOrder />
  </rr.Provider>,
  document.getElementById("main")
)
