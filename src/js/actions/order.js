module.exports = {
  toggleProcessingOrderStatus: function (action) {
    return {
      type: "toggle_processing_status"
    };
  },
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
