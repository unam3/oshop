"use strict";

const React = require("react"),
    ReactDOM = require("react-dom"),
    rr = require("react-redux"),
    Redux = require("redux"),
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
            {
              !props.cart[props.id] && <BlueButton
                additionalClasses="add-to-cart" text="В корзину"
                fobj={{f: props.onAddToCart, args: {id: props.id}}}
                />
            }
          </div>
        </div>);
    },

    ShowMoreProducts = function (props) {
      return <a href="#" className="show-more"
        onClick={(e) => {e.preventDefault(); props.onShowMoreProducts();}}>
          Показать еще 6 товаров
        </a>;
    },

    Ring = function () {
      return <div className='uil-ring-css'>
          <div />
        </div>;
    },

    ProductTable = function (props) {
      return <div className="products-table product-list_product-table flex-column">
          <h1 className="products-table__title title">{props.productsCategory}</h1>
          <section className="products-table__table flex-row">
            {props.products.slice(0, props.productsLoadOffset)
              .map((product) =>
                <Product key={product.id} id={product.id} brand={product.brand}
                  name={product.name} cost={product.cost} cart={props.cart}
                  onAddToCart={props.onAddToCart} />
            )}
          </section>
          <ShowMoreProducts onShowMoreProducts={props.onShowMoreProducts} />
        </div>;
    },
    ProductList = function (props) {
      // ~ componentDidMount
      if (props.products.length === 0 && props.productsLoadOffset === 0) {
        props.onShowMoreProducts();
      }
      return props.products.length ? (
        <div className="product-list main__product-list flex-row">
          <Filters products={props.products} />
          <ProductTable products={props.products}
            productsCategory={props.productsCategory}
            cart={props.cart}
            onAddToCart={props.onAddToCart}
            onShowMoreProducts={props.onShowMoreProducts}
            />
        </div>) : (<Ring />);
    },
    productsCategory = Object.keys(products)[0],
    store = Redux.createStore(require('../reducers/product_list.js'),
      { 
        cart: {
          "b3d": true,
          "dbb": true,
          "bda": true,
          "1bd": true,
          "5f3": true,
          "d61": true,
          "h3f": true,
          "5bb": true,
          "cba": true,
          "l5c": true
        },
        products: [],
        productsLoadOffset: 0
      },
      Redux.applyMiddleware(require("redux-thunk").default)
    ),
    cart_actions = require("../actions/cart.js"),
    pl_actions = require("../actions/product_list.js"),
    mapStateToProps = function (state) {
      return {
        cart: state.cart,
        products: state.products,
        productsLoadOffset: state.productsLoadOffset,
        productsCategory: productsCategory,
      };
    },
    mapDispatchToProps = function (dispatch) {
      return {
        onAddToCart: (props) => dispatch(cart_actions.addToCart(props)),
        onShowMoreProducts: (props) => {
          dispatch(pl_actions.showMore());
          return dispatch(pl_actions.fetchProducts(props));
        }
      };
    },
    ConProductList = rr.connect(
      mapStateToProps,
      mapDispatchToProps
    )(ProductList),
    Cart = function ({cart}) {
      const productsCount = Object.keys(cart).length;
      return <div className="cart blue-text">
        {productsCount ?
          <a className="blue-text" href="#">
            {"В корзине " + productsCount + " товаров"}
          </a>
            : "Корзина пуста"}
        </div>;
    },
    ConCart = rr.connect(
      function (state) {
        return {cart: state.cart};
      }
      //mapStateToProps//,
      //mapDispatchToProps
    )(Cart);

ReactDOM.render(
  <rr.Provider store={store}>
    <ConProductList />
  </rr.Provider>,
  document.getElementById("main")
);

ReactDOM.render(
  <rr.Provider store={store}>
    <ConCart />
  </rr.Provider>,
  document.getElementById("cart")
);
