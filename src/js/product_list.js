var products = require('./../products.js');
var BlueButton = require('./blueButton.js');


function CostFilter (props) {
  var filterInterface = <div>
      <input value="0" />
      <div>—</div>
      <input value="стотыщ" />
    </div>;
  return <Filter filterName="Цена" filter={filterInterface} />;
}

function BrandFilter (props) {
  //    <input value="" />
  // список из брендов
  var filterInterface = <input type="checkbox" />;
  return <Filter filterName="Бренд" filter={filterInterface} />;
}

function Filter (props) {
  return <div>  
      <h6>{props.filterName}</h6>
      {props.filter}
    </div>
}

Class Filters extends React.Component {
  render () {
    return (
      <section className="filters">
        <CostFilter produc />
        <BrandFilter />
        <input type="button" value="Применить" />
        <a href="#">Сбросить</a>
      </section>
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
  return <a href="#" onClick={alert("composeProducts(6)")}>
      Показать еще 6 товаров
    </a>;
}



Class ProductTable extends React.Component {
  var productsCategory = products.Object.keys()[0],
      productsList = products[productsCategory],
      // в compronentDidMount composeProducts(0);
      //composeProducts = function (from) {
      //  return productList.slice(from, from + 5)
      //    .reduce(function (products, ) {
      //      
      //    });
      //};

  render () {
    return (
      <h1>{props.productsCategory}</h1>
      //<section>{products}</section>
      <section>
        <Product name={productsList[0].name} cost={productsList[0].cost}
          id={productsList[0].id} />
        <Product name={productsList[1].name} cost={productsList[1].cost}
          id={productsList[1].id} />
        <Product name={productsList[2].name} cost={productsList[2].cost}
          id={productsList[2].id} />
        <Product name={productsList[3].name} cost={productsList[3].cost}
          id={productsList[3].id} />
        <Product name={productsList[4].name} cost={productsList[4].cost}
          id={productsList[4].id} />
        <Product name={productsList[5].name} cost={productsList[5].cost}
          id={productsList[5].id} />
      </section>
      <ShowMoreProducts />
    );
  }
}

ReactDOM.render(
  <Filters />
  <ProductsTable />,
  document.getElementByID("main")
)
