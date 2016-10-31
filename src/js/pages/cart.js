const React = require("react"),
    products = require('../products.js'),
    BlueButton = require('../blueButton.js');

function Quantity(props) {
  return <div>
      <img />
      <input type="number" min="1" defaultValue="1" />
      <img />
    </div>;
}

function ProductsInCart(props) {
  function deleteFromOrders() {
  };

  return <div className="products-in-cart flex-row flex-children">
      {props.cart.map((product) => <div className="product" key={product.id}>
        <img className="product__preview cart-product-preview" />
        <div>
          <a href="#" className="product__link blue-text">{product.name}</a>
        </div>
        <div className="product__cost">{product.cost} руб.</div>
        <Quantity />
        <a href="#" className="product__delete-from-cart-button blue-text"
          onClick={deleteFromOrders}>Убрать</a>
      </div>)}
    </div>;
}

function TotalCost(props) {
  const totalCost = props.cart.reduce((totalCost, product) => totalCost + product.cost, 0);
  return <div className="total-cost">Итого: {totalCost} руб.</div>;
}

function Form(props) {
  var order = function (args) {
    alert("оформили");
  };
  return <form className="order-form flex-row">
      <input name="name" placeholder="Ваше имя" required />
      <input name="email" placeholder="Email" required />
      <input name="phone_number" placeholder="Телефон" required />
      <input name="adress" placeholder="Адрес доставки" required />
      <textarea name="comment" placeholder="Комментарий" required />
      <BlueButton text="Оформить заказ" additionalClasses="order" />
    </form>;
}

class OrderForm extends React.Component {
  //constructor (props) {
  //  super(props);

  //  this.state = {
  //  };
  //}

  render () {
    var productsCategory = Object.keys(products)[0],
        productsList = products[productsCategory],
        cart = productsList.slice(0, 3);

    return <div className="cart-order flex-row">
        <h1>Оформление заказа</h1>
        <ProductsInCart cart={cart} />
        <TotalCost cart={cart} />
        <Form />
      </div>;
  }
}

require("react-dom").render(
  <OrderForm />,
  document.getElementById("main")
)
