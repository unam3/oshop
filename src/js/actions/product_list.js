module.exports = {
  showMore: function (action) {
    return {
      type: "show_more",
    };
  },
  requestProducts: function (dispatch, getState) {
    console.log("act_reqP");
    return {
      type: "request_products"
    };
  },
  receiveProducts: function (dispatch, state) {
    var products = [
        {
          "id": "1f3",
          "name": "Gel",
          "cost": 6600,
          "brand": "Asics"
        },
        {
          "id": "a3d",
          "name": "Wave",
          "cost": 5520,
          "brand": "Mizuno"
        },
        {
          "id": "d2b",
          "name": "Del Mar",
          "cost": 4930,
          "brand": "Zoot"
        },
        {
          "id": "da1",
          "name": "Ruler",
          "cost": 4536,
          "brand": "Mammut"
        },
        {
          "id": "1cd",
          "name": "Cabana",
          "cost": 4389,
          "brand": "Puma"
        },
        {
          "id": "bca",
          "name": "Runamuck",
          "cost": 4194,
          "brand": "Five Ten"
        },
        {
          "id": "hgf",
          "name": "LK Sport",
          "cost": 4314,
          "brand": "Adidas"
        },
        {
          "id": "1bb",
          "name": "Patriot 5",
          "cost": 3821,
          "brand": "Asics"
        },
        {
          "id": "1ba",
          "name": "Patriot 3",
          "cost": 4821,
          "brand": "Asics"
        },
        {
          "id": "l4c",
          "name": "S-Crown GTX",
          "cost": 3497,
          "brand": "Lowa"
        },
        {
          "id": "13c",
          "name": "S-Crown",
          "cost": 3797,
          "brand": "Lowa"
        },
        {
          "id": "1b2",
          "name": "X-Tour",
          "cost": 3752,
          "brand": "Salomon"
        }
      ],
      offsetEnd = state().productsLoadOffset;

    console.log("act_recP");
    return {
      type: "receive_products",
      payload: {
        products: products.slice(offsetEnd - 6, offsetEnd)
      }
    };
  },
  fetchProducts: function (action) {
    console.log("act_fP");
    return (dispatch, getState) => {
      dispatch(this.requestProducts(dispatch, getState));
      setTimeout(() => dispatch(this.receiveProducts(dispatch, getState)), 2100);
      console.log("after sT");
      return getState();
    };
  }
}
