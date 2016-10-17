var products = require('./../products.js');
var BlueButton = require('./blueButton.js');

function Filter (props) {
}

function CostFilter (props) {
}

function BrandFilter (props) {
}

Class Filters extends React.Component {
  render () {
    return (
      <CostFilter />
      <BrandFilter />
    );
  }
}

function Product (props) {
  return <div>
      <img />
      <a href="#">{props.name}</a>
      <div className="">{props.cost} руб.</div>
      <BlueButton text="В корзину" />
    </div>;
}

function ShowMoreProducts (props) {
  return <a href="">Показать еще 6 товаров</a>
}



Class ProductTable extends React.Component {
  var composeProducts = function () {};
  var products = composeProducts();
  render () {
    return (
      <h1>{productsCategory}</h1>
      <section>{products}<section>
      <ShowMoreProducts />
    );
  }
}

ReactDOM.render(
  <Filters />,
  document.getElementByID("main")
)
