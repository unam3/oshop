const React = require("react"),
    ReactDOM = require("react-dom"),
    products = require('../products.js'),
    BlueButton = require('../blueButton.js');

function Quantity(props) {
  return <div className="product__element">
      <img />
      <input className="quantity" type="number" min="1" defaultValue="1" />
      <img />
    </div>;
}

class OrderProducts extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      orderProducts: {}
    };

    this.deleteFromOrder = (e) => {
      e.preventDefault();
      console.log("deleteFromOrder");
    };
  }


  render () {
    return <div className="order-products flex-column flex-children">
      {this.props.orderProducts.map((product) => <div className="product order-products__product padded" key={product.id}>
        <img className="product__preview product__element order-product-product-preview" />
        <a href="#" className="product__name-link product__element blue-text">{product.brand} {product.name}</a>
        <div className="product__cost product__element order-product-cost">{product.cost} руб.</div>
        <Quantity />
        <a href="#" className="product__delete-product-button product__element blue-text link-wo-underline"
          onClick={this.deleteFromOrder}>Убрать</a>
      </div>)}
    </div>;
  }
}

function TotalCost(props) {
  const totalCost = props.orderProducts.reduce((totalCost, product) => totalCost
    + product.cost, 0);
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
      <BlueButton text="Оформить заказ" additionalClasses="do-order"
        fobj={{f: order}} />
    </form>;
}

class Order extends React.Component {
  //constructor (props) {
  //  super(props);

  //  this.state = {
  //  };
  //}

  render () {
    var productsCategory = Object.keys(products)[0],
        productsList = products[productsCategory],
        orderProducts = productsList.slice(0, 3);

    return <div className="order flex-column">
        <h1 className="title">Оформление заказа</h1>
        <OrderProducts orderProducts={orderProducts} />
        <TotalCost orderProducts={orderProducts} />
        <Form />
      </div>;
  }
}

ReactDOM.render(
  <Order />,
  document.getElementById("main")
)
