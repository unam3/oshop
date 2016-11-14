const addToCart = function (state, action) {
  return state && Object.assign({}, state, {[action.payload.id]: true}) || {};
};

module.exports = function (state = "silly bastards", action) {
  switch (action.type) {
    case "add_to_cart":
      return addToCart(state, action);
    default:
      return state;
  }
};
