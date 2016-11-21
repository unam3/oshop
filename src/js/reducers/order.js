"use strict";

const deleteFromOrder = function (state = [], {payload: {id: productId}}) {
    const orderProducts = state.slice();
    if (typeof productId !== "string") debugger;
    Object.keys(orderProducts).some((k) => {
      if (orderProducts[k] && orderProducts[k].id === productId) {
        delete orderProducts[k];
        return true;
      }
    });
    return orderProducts;
  },
  orderProducts = (state = "silly bastards", action) => (
    (action.type === "delete_from_order") ?
      deleteFromOrder(state, action) : state
  ),
  changeQuantity = function (state = {},
      {payload: {id: id, quantity: quantity}}) {
    const newState = JSON.parse(JSON.stringify(state));
    //console.log(id, quantity, JSON.stringify(newState, false, 2))
    newState[id] = quantity;
    return newState;
  },
  productId_quantity = function (state = "silly bastards", action) {
    switch (action.type) {
      case "change_product_quantity":
        return Object.assign({}, changeQuantity(state, action));
      default:
        return state;
    }
  },
  processingOrder = function (state = false, action) {
    switch (action.type) {
      case "toggle_processing_status":
        console.log("processingOrder", state, action)
        return !state;
      default:
        return state;
    }
  },
  serverResponse = function (state = false, action) {
    switch (action.type) {
      case "handle_server_response":
        console.log("srvR", state, action);
        return action && action.payload && action.payload.statusCode || state;
      default:
        return state;
    }
  };

module.exports = require('redux').combineReducers({ 
  orderProducts,
  productId_quantity,
  processingOrder,
  serverResponse
});
