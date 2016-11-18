const deleteFromOrder = function (state, action) {
    var productId = action.payload.id,
        orderProducts = state && state.slice() || [];
    if (typeof productId !== "string") debugger;
    Object.keys(orderProducts).some(function (k) {
      if (orderProducts[k] && orderProducts[k].id === productId) {
        delete orderProducts[k];
        return true;
      }
    });
    return orderProducts;
  },
  orderProducts = function (state = "silly bastards", action) {
    return (action.type === "delete_from_order") ?
      deleteFromOrder(state, action) : state;
  },
  changeQuantity = function (state, action) {
    var id = action.payload.id,
        quantity = action.payload.quantity,
        newState = JSON.parse(JSON.stringify(
          state || {}
        ));
    console.log(id, quantity, JSON.stringify(newState, false, 2))
    newState[id] = quantity;
    console.log(newState, action);
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
  };

module.exports = require('redux').combineReducers({ 
  orderProducts,
  productId_quantity,
  processingOrder
});
