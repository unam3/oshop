"use strict";

const React = require("react"),
    {render} = require("react-dom"),
    {connect, Provider} = require("react-redux"),
    Redux = require("redux"),
    products = require('../products.js'),
    BlueButton = require('../blueButton.js'),
    applyF = require("../applyF.js"),
    Cart = require("../cart.js"),

    CostFilter = function () {
      // можно с reduce пройти в начале по всем элементам, найти min/max и
      // выставить defaultValue
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

    BrandFilter = function ({products}) {
      const brandsObj = {};
      products.forEach(function (product) {
        brandsObj[product.brand] = true;
      })
      return <Filter
          additionalClasses="filters__brand-filter filters__filter"
          filterName="Бренд"
          filter={<div className="filter__brands flex-row">
              {Object.keys(brandsObj)
                .map((brand) => <div className="brand" key={brand}>
                  <input type="checkbox" /> {brand}
                </div>)}
            </div>}
        />;
    },

    Filter = function ({additionalClasses, filterName, filter}) {
      let className = "filter";
      if (additionalClasses)
        className += " " + additionalClasses;
      return <div className={className}>
          <h6 className="filter__title">{filterName}</h6>
          {filter}
        </div>
    },

    Filters = ({products}) => (
      <section className="filters product-list__filters flex-column">
        <CostFilter products={products} />
        <BrandFilter products={products} />
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
    ),

    Product = ({brand, name, cost, cart, id, onAddToCart}) => (
      <div className="product product-list__product flex-column">
        <img className="product__preview product-list__product-preview" />
        <div className="product-list__product-link product-list_lmargin">
          <a href="#" className="blue-text">
            {brand} {name}
          </a>
        </div>
        <div className="product-list_lmargin flex-row">
          <div className="product__cost product-list-cost">{cost} руб.</div>
          {
            !cart[id] && <BlueButton
              additionalClasses="add-to-cart" text="В корзину"
              fobj={{f: onAddToCart, args: {id: id}}}
              />
          }
        </div>
      </div>
    ),

    ShowMoreProducts = ({onShowMoreProducts}) => (
      <a href="#" className="show-more"
          onClick={(e) => {e.preventDefault(); onShowMoreProducts();}}>
        Показать еще 6 товаров
      </a>
    ),

    Ring = () => (
      <div className='uil-ring-css'>
        <div />
      </div>
    ),

    ProductTable = ({productsCategory, products, productsLoadOffset,
        cart, onAddToCart, onShowMoreProducts}) => (
      <div className="products-table product-list_product-table flex-column">
        <h1 className="products-table__title title">
          {productsCategory}
        </h1>
        <section className="products-table__table flex-row">
          {products.slice(0, productsLoadOffset)
            .map(({id, brand, name, cost}) =>
              <Product key={id} id={id} brand={brand} name={name} cost={cost}
                cart={cart} onAddToCart={onAddToCart} />
          )}
        </section>
        <ShowMoreProducts onShowMoreProducts={onShowMoreProducts} />
      </div>
    ),
    ProductList = function ({products, productsLoadOffset, onShowMoreProducts,
        cart, onAddToCart}) {
      // ~ componentDidMount
      if (products.length === 0 && productsLoadOffset === 0) {
        onShowMoreProducts();
      }
      return products.length ? (
        <div className="product-list main__product-list flex-row">
          <Filters products={products} />
          <ProductTable products={products}
            productsCategory={productsCategory}
            cart={cart}
            onAddToCart={onAddToCart}
            onShowMoreProducts={onShowMoreProducts}
            />
        </div>) : (<Ring />);
    },
    productsCategory = Object.keys(products)[0],
    store = Redux.createStore(require('../reducers/product_list.js'),
      {
        cart: Cart.stored,
        products: [],
        productsLoadOffset: 0
      },
      Redux.applyMiddleware(require("redux-thunk").default)
    ),
    mapStateToProps = ({cart, products, productsLoadOffset}) => ({
      cart: cart,
      products: products,
      productsLoadOffset: productsLoadOffset,
      productsCategory: productsCategory,
    }),
    {addToCart} = require("../actions/cart.js"),
    pl_actions = require("../actions/product_list.js"),
    mapDispatchToProps = (dispatch) => ({
      onAddToCart: (props) => dispatch(addToCart(props)),
      onShowMoreProducts: (props) => {
        dispatch(pl_actions.showMore());
        return dispatch(pl_actions.fetchProducts(props));
      }
    }),
    ConProductList = connect(
      mapStateToProps,
      mapDispatchToProps
    )(ProductList),
    ConCart = connect(
      ({cart}) => ({cart: cart})
    )(Cart.component);

render(
  <Provider store={store}>
    <ConProductList />
  </Provider>,
  document.getElementById("main")
);

render(
  <Provider store={store}>
    <ConCart />
  </Provider>,
  document.getElementById("cart")
);
