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
    
    // приводить все в исходное состояние руками или запоминать его при
    // componentDidMount?
    //var cancel = function () {}
    return (
      <section className="filters flex-row">
        <CostFilter products={this.props.products} />
        <BrandFilter products={this.props.products} />
        <input type="button" value="Применить" />
        <a href="#"
          //onClick={cancel}
          >Сбросить</a>
      </section>
    );
  }
}

function Product(props) {
  return (<div className="product flex-grid">
      <img className="product__preview product-list-product-preview" />
      <a href="#">{props.name}</a>
      <div className="product__cost">{props.cost} руб.</div>
      <BlueButton text="В корзину" fobj={{f: props.f}} />
    </div>);
}

function ShowMoreProducts(props) {
  return <a href="#" className="show-more"
    onClick={() => alert("composeProducts(6)")}>
      Показать еще 6 товаров
    </a>;
}


class ProductTable extends React.Component {
  render () {
    const addToCart = function () {
      alert("Добавено в корзину");
    };

    return <div className="products-table">
        <h1 className="products-table__title">{this.props.productsCategory}</h1>
        <section className="products-table__table flex-row">
          {this.props.products.map((product) =>
            <Product key={product.id}
              id={product.id} name={product.name} cost={product.cost}
              f={addToCart} />
          )}
        </section>
        <ShowMoreProducts />
      </div>;
  }
}

var productsCategory = Object.keys(products)[0],
    productsList = products[productsCategory];

require("react-dom").render(
  <div className="flex-grid">
    <Filters products={productsList} />
    <ProductTable products={productsList} category={productsCategory} />
  </div>,
  document.getElementById("main")
)
