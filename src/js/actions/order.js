module.exports = {
  handleServerResponse: ({payload}) => ({
    payload,
    type: "handle_server_response",
  }),

  toggleProcessingOrderStatus: (action) => ({
    type: "toggle_processing_status"
  }),

  deleteFromOrder: ({id}) => ({
    type: "delete_from_order",
    payload: {
      id
    }
  }),

  changeQuantity: ({id, quantity}) => ({
    type: "change_product_quantity",
    payload: {
      id,
      quantity
    }
  })
};
