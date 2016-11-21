"use strict";

module.exports = {
  handleServerResponse: ({payload}) => ({
    type: "handle_server_response",
    payload: payload
  }),
  toggleProcessingOrderStatus: (action) => ({
    type: "toggle_processing_status"
  }),
  deleteFromOrder: ({id}) => ({
    type: "delete_from_order",
    payload: {
      id: id
    }
  }),
  changeQuantity: ({id, quantity}) => ({
    type: "change_product_quantity",
    payload: {
      id: id,
      quantity: quantity
    }
  })
}
