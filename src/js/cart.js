const React = require("react");

module.exports = {
  "component": function ({cart}) {
    const productsCount = Object.keys(cart).length;
    return <div className="cart blue-text">
      {productsCount ?
        <a className="blue-text" href="#">
          {"В корзине " + productsCount + " товаров"}
        </a>
          : "Корзина пуста"}
      </div>;
  },
  "stored": {
    "b3d": true,
    "dbb": true,
    "bda": true,
    "1bd": true,
    "5f3": true,
    "d61": true,
    "h3f": true,
    "5bb": true,
    "cba": true,
    "l5c": true
  }
};
