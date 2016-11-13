const actions = require("../actions/product_list.js"),
  showMore = function (state, action) {
    return state + 6;
  },
  addToCart = function (state, action) {
    var newState = state && state.slice() || [];
    newState.push(action.payload.id);
    return newState;
  },
  cart = function (state = "silly bastards", action) {
    switch (action.type) {
      case "add_to_cart":
        return addToCart(state, action);
      default:
        return state;
    }
  },
  // заглушка
  products = function (state = "silly bastards", action) {
    switch (action.type) {
      case "":
        return function (state, action) { return state;};
      default:
        return state;
    }
  },
  productsLoadOffset = function (state = "silly bastards", action) {
    switch (action.type) {
      case "show_more":
        return showMore(state, action);
      default:
        return state;
    }
  };

module.exports = require('redux').combineReducers({ 
  cart,
  products,
  productsLoadOffset
});
