const cart = require("../reducers/cart.js"),

      showMore = function (state, action) {
        return state + 6;
      },

      products = function (state = "silly bastards", action) {
        switch (action.type) {
          //case "fetch_products":
          //  return function (dispatch) {
          //  };
          case "request_products":
            return state;
          case "receive_products":
            return state.concat(action.payload.products);
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
