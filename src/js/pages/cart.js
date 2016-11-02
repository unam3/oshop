const React = require("react"),
    products = require('../products.js'),
    BlueButton = require('../blueButton.js');

function Quantity(props) {
  return <div className="product__element">
      <img />
      <input className="quantity" type="number" min="1" defaultValue="1" />
      <img />
    </div>;
}

function ProductsInCart(props) {
  function deleteFromOrders(e) {
      e.preventDefault();
      console.log("deleteFromOrders");
  };

  return <div className="products-in-cart flex-column flex-children">
      {props.cart.map((product) => <div className="product products-in-cart__product padded"
        key={product.id}>
          <img className="product__preview product__element cart-product-preview" />
          <a href="#" className="product__name-link product__element blue-text">{product.brand} {product.name}</a>
          <div className="product__cost product__element cart-product-cost">{product.cost} руб.</div>
          <Quantity />
          <a href="#" className="product__delete-from-cart-button product__element blue-text link-wo-underline"
            onClick={deleteFromOrders}>Убрать</a>
        </div>)}
    </div>;
}

function TotalCost(props) {
  const totalCost = props.cart.reduce((totalCost, product) => totalCost + product.cost, 0);
  return <div className="total-cost">Итого: {totalCost} руб.</div>;
}

function Form(props) {
  const order = function (args) {
    console.log("оформили");
  };
  return <form className="order-form flex-column">
      <input name="name" placeholder="Ваше имя" required />
      <input name="email" placeholder="Email" required />
      <input name="phone_number" placeholder="Телефон" required />
      <input name="adress" placeholder="Адрес доставки" required />
      <textarea className="comment-ta" name="comment" placeholder="Комментарий" required />
      <BlueButton text="Оформить заказ" additionalClasses="order"
        fobj={{f: order}} />
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

    return <div className="cart-order flex-column">
        <h1 className="title">Оформление заказа</h1>
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
