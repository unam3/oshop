const cart = require("../reducers/cart.js"),
    showMore = function (state, action) {
      return state + 6;
    },
    products = function (state = "silly bastards", action) {
      console.log(action);
      switch (action.type) {
        case "fetch_products":
          console.log("pre pl_fP");
          return function (dispatch) {
            console.log("pl_fP");
            console.log(dispatch);
            //return dispatch(this.receiveProducts);
          };
        case "request_products":
          console.log("pre pl_reqP");
          return state;
        case "receive_products":
          console.log("pre pl_recicipeP");
          //return function (state, action) {
          //  console.log("pl_recP");
          //  //var received = JSON.parse(action.payload.json);
          //  //return received && received.length ?
          //  //  state.concat(action.payload.json) : state;
          //return function (dispatch, getState) {
          //  console.log("pl_reqP");
          //  window.setTimeout(dispatch, 2200, this.receiveProducts);
          //  return getState();
          //}
          //};
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
