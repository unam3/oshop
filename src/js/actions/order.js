module.exports = {
  deleteFromOrder: function (action) {
    return {
      type: "delete_from_order",
      payload: {
        id: action.id
      }
    };
  },
  changeQuantity: function (action) {
    return {
      type: "change_product_quantity",
      payload: {
        id: action.id,
        quantity: action.quantity
      }
    };
  }
}
