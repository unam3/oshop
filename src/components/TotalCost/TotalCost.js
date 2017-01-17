import React from 'react';

export default function ({data}) {
  const getProduct = function (products, id) {
    if (!products.length) {
      /* eslint no-throw-literal: 0 */
      throw 'shi~~';
    }

    let product;

    products.some((p) => {
      product = false;

      if (p && p.id === id) {
        product = p;

        return true;
      }
    });

    return product;
  };

  const evaluateTotalCost = function (piq, products) {
    return Object.keys(piq).reduce(
      (costSum, productId) => (
        costSum + piq[productId]
          * ((getProduct(products, productId) || {}).cost || 0)
      ),
      0
    );
  };

  return (<div className="total-cost">
    Итого: {evaluateTotalCost(
      data.productId_quantity,
      data.orderProducts)
    } руб.
  </div>);
}
