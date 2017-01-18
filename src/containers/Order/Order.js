import React from 'react';
import { render } from 'react-dom';
import { connect, Provider } from 'react-redux';
import OrderWrapper from '../../components/OrderWrapper/OrderWrapper.js';
import { createStore, combineReducers } from 'redux';
import { ConnectedCart } from '../Cart/Cart.js';
import cartReducer,
  { initialState as cartInitialState } from '../../redux/modules/cart.js';

import {
  initialState,
  orderProducts,
  /* eslint camelcase: 0 */
  productId_quantity,
  processingOrder,
  serverResponse,
  actions
} from '../../redux/modules/order.js';

const store = createStore(
  combineReducers({ 
    orderProducts,
    productId_quantity,
    processingOrder,
    serverResponse
  }),
  initialState
);

const {
  changeQuantity,
  deleteFromOrder,
  toggleProcessingOrderStatus,
  handleServerResponse
} = actions;

const mapStateToProps = ({
  orderProducts,
  productId_quantity,
  processingOrder,
  serverResponse
}) => ({
  orderProducts,
  productId_quantity,
  processingOrder,
  serverResponse
});

const mapDispatchToProps = (dispatch) => ({
  onQuantityChange: (props) => dispatch(changeQuantity(props)),

  onDeleteFromOrder: (props) => dispatch(deleteFromOrder(props)),

  toggleProcessingOrderStatus: (props) => dispatch(
    toggleProcessingOrderStatus(props)
  ),

  handleServerResponse: (props) => dispatch(handleServerResponse(props))
});

const ConnectedOrderWrapper = connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderWrapper);

render(
  <Provider store={store}>
    <ConnectedOrderWrapper />
  </Provider>,

  document.getElementById("main")
);

const cartStore = createStore(
  combineReducers({ 
    'cart': cartReducer
  }),
  {
    'cart': cartInitialState
  }
);

render(
  <Provider store={cartStore}>
    <ConnectedCart />
  </Provider>,

  document.getElementById("cart")
);
