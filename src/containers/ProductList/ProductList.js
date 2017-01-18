import React from 'react';
import { render } from 'react-dom';
import { connect, Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { ConnectedCart } from '../Cart/Cart.js';
import {
  addToCart,
  initialState as cartInitialState
} from '../../redux/modules/cart.js';

import ProductList from '../RealProductList/RealProductList';
import allProducts from '../../helpers/products.js';
import {
  actions,
  initialState,
  cart,
  products,
  productsLoadOffset
} from '../../redux/modules/product_list.js';

initialState.cart = cartInitialState;

const store = createStore(
  combineReducers({ 
    cart,
    products,
    productsLoadOffset
  }),
  initialState,
  applyMiddleware(reduxThunk)

);

const productsCategory = Object.keys(allProducts)[0];

const mapStateToProps = ({cart, products, productsLoadOffset}) => ({
  cart,
  products,
  productsLoadOffset,
  productsCategory
});

const mapDispatchToProps = (dispatch) => ({
  onAddToCart: (props) => {
    console.log('oATC');
    console.log(props);
    return dispatch(addToCart(props));
  },

  onShowMoreProducts: (...props) => {
    console.log('oSMP');
    console.log(props);
    dispatch(actions.showMore());

    return dispatch(actions.fetchProducts(props));
  }
});

const ConProductList = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductList);

render(
  <Provider store={store}>
    <ConProductList />
  </Provider>,

  document.getElementById("main")
);

render(
  <Provider store={store}>
    <ConnectedCart />
  </Provider>,

  document.getElementById("cart")
);
