var products = require('./products.js');
var BlueButton = require('./blueButton.js');

function Quantity (props) {
  return <img />
    <input />
    <img />;
}

function ProductsInCart (props) {
  function deleteFromOrders () {
  
  };
  // форыч?
  return <img />
      <a href="#">{props.name}</a>
      <div className="orderCost">{props.cost} руб.</div>
      <Quantity />;
      <a href="#" onClick={deleteFromOrders}>Убрать</a>
}

function TotalCost (props) {
  var totalCost;
  return <div className="totalCost">Итого: {totalCost} руб.</div>;
}

function Form (props) {
  return <input name="name" placeholder="Ваше имя" />
    <input name="email" placeholder="Email" />
    <input name="phone_number" placeholder="Телефон" />
    <input name="adress" placeholder="Адрес доставки" />
    <texterea name="comment" placeholder="Комментарий" />
}

Class OrderForm extends React.Component {
  render () {
    return (
      <h1>Оформление заказа</h1>
      <ProductsInCart />
      <TotalCost />
      <Form />
      <BlueButton text="Оформить заказ" />
    );
  }
}

ReactDOM.render(
  <OrderForm />,
  document.getElementByID("main")
)
