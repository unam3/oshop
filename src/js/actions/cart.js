module.exports = {
  addToCart: ({id}) => ({
    type: "add_to_cart",
    payload: {
      id
    }
  })
};
