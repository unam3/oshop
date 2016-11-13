"use strict";

const React = require("react"),
    ReactDOM = require("react-dom"),
    rr = require("react-redux"),
    products = require('../products.js'),
    BlueButton = require('../blueButton.js'),
    applyF = require("../applyF.js"),

    CostFilter = function (props) {
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
    },

    BrandFilter = function (props) {
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
    },

    Filter = function (props) {
      let className = "filter";
      if (props.additionalClasses)
        className += " " + props.additionalClasses;
      return <div className={className}>
          <h6 className="filter__title">{props.filterName}</h6>
          {props.filter}
        </div>
    },

    Filters = function (props) {
      return (
        <section className="filters product-list__filters flex-column">
          <CostFilter products={props.products} />
          <BrandFilter products={props.products} />
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
    },

    Product = function (props) {
      return (<div className="product product-list__product flex-column">
          <img className="product__preview product-list__product-preview" />
          <a href="#" className="product-list__product-link product-list_lmargin blue-text">{props.brand} {props.name}</a>
          <div className="product-list_lmargin flex-row">
            <div className="product__cost product-list-cost">{props.cost} руб.</div>
            <BlueButton additionalClasses="add-to-cart" text="В корзину"
              fobj={{f: props.f}} />
          </div>
        </div>);
    },

    ShowMoreProducts = function (props) {
      return <a href="#" className="show-more"
        onClick={(e) => {e.preventDefault(); props.onShowMoreProducts();}}>
          Показать еще 6 товаров
        </a>;
    },

    ProductTable = function (props) {
      //plo = () => console.log(props.productsLoadOffset);

      return <div className="products-table product-list_product-table flex-column">
          <h1
            //onClick={plo}
            className="products-table__title title">{props.productsCategory}</h1>
          <section className="products-table__table flex-row">
            {props.products.slice(0, props.productsLoadOffset)
              .map((product) =>
                <Product key={product.id} id={product.id} brand={product.brand}
                  name={product.name} cost={product.cost}
                  addToCart={props.onAddToCart} />
            )}
          </section>
          <ShowMoreProducts onShowMoreProducts={props.onShowMoreProducts} />
        </div>;
    },
    ProductList = function (props) {
      return <div className="product-list main__product-list flex-row">
        <Filters products={props.products} />
        <ProductTable products={props.products}
          productsCategory={props.productsCategory}
          cart={props.cart}
          onAddToCart={props.onAddToCart}
          onShowMoreProducts={props.onShowMoreProducts}
          />
      </div>;
    },
    productsCategory = Object.keys(products)[0],
    store = require('redux').createStore(require('../reducers/product_list.js'),
      { 
        cart: {},
        // необходимо ли это тут?
        products: products[productsCategory],
        productsLoadOffset: 6
      }
    ),
    actions = require("../actions/product_list.js"),
    mapDispatchToProps = function (dispatch) {
      return {
        onAddToCart: (props) => dispatch(actions.addToCart(props)),
        onShowMoreProducts: (props) => dispatch(actions.showMore(props))
      };
    },
    mapStateToProps = function (state) {
      return {
        cart: state.cart,
        // необходимо ли это тут?
        // а где еще хранить подгруженные товары?
        products: state.products.slice(0, state.productsLoadOffset),
        productsLoadOffset: state.productsLoadOffset
      };
    },
    ConProductList = rr.connect(
      mapStateToProps,
      mapDispatchToProps
    )(ProductList);

ReactDOM.render(
  <rr.Provider store={store}>
    <ConProductList />
  </rr.Provider>,
  document.getElementById("main")
);
