import React from 'react';
import Quantity from '../Quantity/Quantity';
import DeleteOrderProduct from '../DeleteOrderProduct/DeleteOrderProduct';

export default ({
  orderProducts,
  onQuantityChange,
  onDeleteFromOrder
}) => (
  <div className="flex-grid flex-column flex-children">
    {
      orderProducts.map((product) => product ?
        (<div className="product order-products__product padded"
            key={product.id}>
        <img className="product__preview product__element order-product-product-preview" />
        <div className="product__name-link product__element">
          <a href="#" className="blue-text">
            {product.brand} {product.name}
          </a>
        </div>
        <div className="product__cost product__element order-product-cost">
          {product.cost} руб.
        </div>
        <Quantity onQuantityChange={onQuantityChange}
            productId={product.id} />
        <DeleteOrderProduct f={onDeleteFromOrder} productId={product.id} />
      </div>) : null)
    }
  </div>
);
