module.exports = {
  showMore: function (action) {
    return {
      type: "show_more",
    };
  },
  addToCart: function (action) {
    return {
      type: "add_to_cart",
      payload: {
        id: action.id
      }
    };
  }
}
