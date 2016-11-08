const React = require("react"),
    products = require('../products.js'),
    BlueButton = require('../blueButton.js'),
    applyF = require("../applyF.js");

function CostFilter(props) {
  // можно с reduce пройти в начале по всем элементам, найти min/max и
  // выставить defaultValue в ComponentDidMount
  const filter = <div className="cost-filter flex-row">
      <input className="cost-filter__part cost-filter__input"
        type="number" defaultValue="0" />
      <div className="cost-filter__part">
        —
      </div>
      <input className="cost-filter__part cost-filter__input"
        type="number" defaultValue="1000000" />
    </div>;
  return <Filter
    additionalClasses="filters__cost-filter filters__filter"
    filterName="Цена"
    filter={filter} />;
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
      additionalClasses="filters__brand-filter filters__filter"
      filterName="Бренд"
      filter={<div className="filter__brands flex-row">
          {brands.map((brand) => <div className="brand" key={brand}>
            <input type="checkbox" /> {brand}
          </div>)}
        </div>}
    />;
}

function Filter(props) {
  let className = "filter";
  if (props.additionalClasses)
    className += " " + props.additionalClasses;
  return <div className={className}>
      <h6 className="filter__title">{props.filterName}</h6>
      {props.filter}
    </div>
}

class Filters extends React.Component {
  render () {
    
    // приводить все в исходное состояние руками или запоминать его при
    // componentDidMount?
    //var cancel = function () {}
    return (
      <section className="filters product-list__filters flex-column">
        <CostFilter products={this.props.products} />
        <BrandFilter products={this.props.products} />
        <div className="filters__controls flex-row">
          <div className="control__wrapper">
            <input type="button" value="Применить" />
          </div>
          <div className="control__wrapper">
            <a href="#"
              onClick={function (e) {
                e.preventDefault();
                console.log("reset filters");
              }}
              >Сбросить</a>
          </div>
        </div>
      </section>
    );
  }
}

function Product(props) {
  return (<div className="product product-list__product flex-column">
      <img className="product__preview product-list__product-preview" />
      <a href="#" className="product-list__product-link product-list_lmargin blue-text">{props.brand} {props.name}</a>
      <div className="product-list_lmargin flex-row">
        <div className="product__cost product-list-cost">{props.cost} руб.</div>
        <BlueButton additionalClasses="add-to-cart" text="В корзину"
          fobj={{f: props.f}} />
      </div>
    </div>);
}

function ShowMoreProducts(props) {
  return <a href="#" className="show-more"
    onClick={props.onShowMoreProducts}>
      Показать еще 6 товаров
    </a>;
}


class ProductTable extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      products: props.products,
      productsLoadOffset: 6
    }

    this.showMoreProducts = (e) => {
      e.preventDefault();
      this.setState((prevState) => ({
        productsLoadOffset: prevState.productsLoadOffset + 6
      }));
    }

    this.plo = () => console.log(this.state.productsLoadOffset);
  }

  render () {
    const addToCart = function () {
      console.log("addToCart");
    };

    return <div className="products-table product-list_product-table flex-column">
        <h1 onClick={this.plo} className="products-table__title title">{this.props.productsCategory}</h1>
        <section className="products-table__table flex-row">
          {this.state.products.slice(0, this.state.productsLoadOffset)
            .map((product) =>
              <Product key={product.id} id={product.id} brand={product.brand}
                name={product.name} cost={product.cost} f={addToCart} />
          )}
        </section>
        <ShowMoreProducts onShowMoreProducts={this.showMoreProducts} />
      </div>;
  }
}

var productsCategory = Object.keys(products)[0],
    productsList = products[productsCategory];

require("react-dom").render(
  <div className="product-list main__product-list flex-row">
    <Filters products={productsList} />
    <ProductTable products={productsList} productsCategory={productsCategory} />
  </div>,
  document.getElementById("main")
)
