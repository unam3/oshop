export const initialState = {
  // product.id только хранить. тянуть с сервака все остальное
  orderProducts: [
    {
      'id': '1f3',
      'name': 'Gel',
      'cost': 6600,
      'brand': 'Asics'
    },
    {
      'id': 'a3d',
      'name': 'Wave',
      'cost': 5520,
      'brand': 'Mizuno'
    },
    {
      'id': 'd2b',
      'name': 'Del Mar',
      'cost': 4930,
      'brand': 'Zoot'
    }
  ],
  productId_quantity: {
    '1f3': 1,
    'a3d': 1,
    'd2b': 1
  },
  processingOrder: false,
  serverResponse: false
};

// action creators
export const actions = {
  handleServerResponse: ({payload}) => ({
    payload,
    type: 'handle_server_response',
  }),

  toggleProcessingOrderStatus: () => ({
    type: 'toggle_processing_status'
  }),

  deleteFromOrder: ({id}) => ({
    type: 'delete_from_order',
    payload: {
      id
    }
  }),

  changeQuantity: ({id, quantity}) => ({
    type: 'change_product_quantity',
    payload: {
      id,
      quantity
    }
  })
};

// reducers
const deleteFromOrder = function (state = [], {payload: {id: productId}}) {
  const orderProducts = state.slice();

  if (typeof productId !== 'string') debugger;

  Object.keys(orderProducts).some((k) => {
    if (orderProducts[k] && orderProducts[k].id === productId) {
      delete orderProducts[k];

      return true;
    }
  });

  return orderProducts;
};

export const orderProducts = (state = initialState.orderProducts, action) => (
  (action.type === 'delete_from_order') ?
    deleteFromOrder(state, action) : state
);

const changeQuantity = function (
  state = {},
  {payload: {id: id, quantity: quantity}}
) {
  const newState = JSON.parse(JSON.stringify(state));

  newState[id] = quantity;

  return newState;
};

/* eslint camelcase: 0 */
export const productId_quantity = function (
  state = initialState.productId_quantity,
  action
) {
  switch (action.type) {
    case 'change_product_quantity':
      return Object.assign({}, changeQuantity(state, action));
    default:
      return state;
  }
};

export const processingOrder = function (state = false, action) {
  switch (action.type) {
    case 'toggle_processing_status':
      console.log('processingOrder', state, action);

      return !state;
    default:
      return state;
  }
};

export const serverResponse = function (state = false, action) {
  switch (action.type) {
    case 'handle_server_response':
      console.log('srvR', state, action);

      return action && action.payload && action.payload.statusCode || state;
    default:
      return state;
  }
};
