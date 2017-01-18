export const actions = {
  showMore (action) {
    console.log('showMore');
    return {
      type: 'show_more',
    };
  },

  requestProducts (dispatch, getState) {
    console.log('requestProducts');
    return {
      type: 'request_products'
    };
  },

  receiveProducts (dispatch, state) {
    const products = [
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
      },
      {
        'id': 'da1',
        'name': 'Ruler',
        'cost': 4536,
        'brand': 'Mammut'
      },
      {
        'id': '1cd',
        'name': 'Cabana',
        'cost': 4389,
        'brand': 'Puma'
      },
      {
        'id': 'bca',
        'name': 'Runamuck',
        'cost': 4194,
        'brand': 'Five Ten'
      },
      {
        'id': 'hgf',
        'name': 'LK Sport',
        'cost': 4314,
        'brand': 'Adidas'
      },
      {
        'id': '1bb',
        'name': 'Patriot 5',
        'cost': 3821,
        'brand': 'Asics'
      },
      {
        'id': '1ba',
        'name': 'Patriot 3',
        'cost': 4821,
        'brand': 'Asics'
      },
      {
        'id': 'l4c',
        'name': 'S-Crown GTX',
        'cost': 3497,
        'brand': 'Lowa'
      },
      {
        'id': '13c',
        'name': 'S-Crown',
        'cost': 3797,
        'brand': 'Lowa'
      },
      {
        'id': '1b2',
        'name': 'X-Tour',
        'cost': 3752,
        'brand': 'Salomon'
      }
    ];

    const offsetEnd = state().productsLoadOffset;

    console.log('receiveProducts');
    return {
      type: 'receive_products',
      payload: {
        products: products.slice(offsetEnd - 6, offsetEnd)
      }
    };
  },

  fetchProducts (action) {
    console.log('fetchProducts');
    return (dispatch, getState) => {
      console.log('afp inner');
      dispatch(this.requestProducts(dispatch, getState));

      setTimeout(
        () => dispatch(this.receiveProducts(dispatch, getState)),
        2100
      );

      return getState();
    };
  }
};

export const initialState = {
  products: [],
  productsLoadOffset: 0,
};

// reducers
export const cart = require('./cart').default;

export const products = function (state = 'silly bastards', action) {
  switch (action.type) {
    //case 'fetch_products':
    //  return function (dispatch) {
    //  };
    case 'request_products':
      return state;
    case 'receive_products':
      return state.concat(action.payload.products);
    default:
      return state;
  }
};

export const productsLoadOffset = function (state = 'silly bastards', action) {
  switch (action.type) {
    case 'show_more':
      return state + 6;
    default:
      return state;
  }
};
