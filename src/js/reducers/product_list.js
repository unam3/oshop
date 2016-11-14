const cart = require("../reducers/cart.js"),
    showMore = function (state, action) {
      return state + 6;
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
