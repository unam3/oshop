const React = require("react"),
    products = require('../products.js'),
    BlueButton = require('../blueButton.js');

function CostFilter(props) {
  // можно с reduce пройти в начале по всем элементам, найти min/max и
  // выставить defaultValue в ComponentDidMount
  const filter = <div>
      <input type="number" defaultValue="0" />
      <div>
        —
      </div>
      <input type="number" defaultValue="1000000" />
    </div>;
  return <Filter filterName="Цена" filter={filter} />;
}

function BrandFilter(props) {
  //var brands = Object.keys(props.products.reduce(function (brands, product) {
  //  brands[product.brand] = true;
  //}, {}));
  var brandsObj = {};
  props.products.forEach(function (product) {
    brandsObj[product.brand] = true;
  })
  var brands = Object.keys(brandsObj);
  return <Filter
      filterName="Бренд"
      filter={brands.map((brand) => <div key={brand}>
          <input type="checkbox" /> {brand}
        </div>)}
    />;
}

function Filter(props) {
  return <div>  
      <h6>{props.filterName}</h6>
      {props.filter}
    </div>
}

class Filters extends React.Component {
  render () {
    return (
      <section className="filters">
        <CostFilter products={this.props.products} />
        <BrandFilter products={this.props.products} />
        <input type="button" value="Применить" />
        <a href="#">Сбросить</a>
      </section>
    );
  }
}

function Product(props) {
  return (<div>
      <img />
      <a href="#">{props.name}</a>
      <div className="">{props.cost} руб.</div>
      <BlueButton text="В корзину" fobj={{f: props.f}} />
    </div>);
}

function ShowMoreProducts(props) {
  return <a href="#" onClick={() => alert("composeProducts(6)")}>
      Показать еще 6 товаров
    </a>;
}


class ProductTable extends React.Component {
  render () {
    const addToCart = function () {
      alert("Добавено в корзину");
    };

    return <div>
        <h1>{this.props.productsCategory}</h1>
        <section>
          {this.props.products.map((product) =>
            <Product key={product.id} id={product.id} name={product.name} cost={product.cost} f={addToCart} />
          )}
        </section>
        <ShowMoreProducts />
      </div>;
  }
}

var productsCategory = Object.keys(products)[0],
    productsList = products[productsCategory];

require("react-dom").render(
  <div>
    <Filters products={productsList} />
    <ProductTable products={productsList} category={productsCategory} />
  </div>,
  document.getElementById("main")
)
