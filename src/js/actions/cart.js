module.exports = {
  addToCart: function (action) {
    return {
      type: "add_to_cart",
      payload: {
        id: action.id
      }
    };
  }
}
