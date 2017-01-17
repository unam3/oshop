// action creator
export const addToCart = ({id}) => ({
  type: 'add_to_cart',
  payload: {
    id
  }
});

// reducer
export default function (state = 'silly bastards', action) {
  switch (action.type) {
    case 'add_to_cart':
      return state ?
        Object.assign({}, state, {[action.payload.id]: true})
        : {};
    default:
      return state;
  }
}

// для эмуляции десяти позиций в корзине
export const initialState = {
  'b3d': true,
  'dbb': true,
  'bda': true,
  '1bd': true,
  '5f3': true,
  'd61': true,
  'h3f': true,
  '5bb': true,
  'cba': true,
  'l5c': true
};
