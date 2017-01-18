import React from 'react';
import BlueButton from '../BlueButton/BlueButton';

export const Product = ({brand, name, cost, cart, id, onAddToCart}) => {
  require('./Product.css');

  return (
    <div className="product product-list__product flex-column">
      <img className="product__preview product-list__product-preview" />
      <div className="product-list__product-link product-list__product_margin">
        <a href="#" className="blue-text">
          {brand} {name}
        </a>
      </div>
      <div className="product-list__product_margin flex-row">
        <div className="product__cost product-list-cost">{cost} руб.</div>
        { cart[id] ? (
            <div className="product-in-cart">
              В корзине
            </div>
          ) : (
            <BlueButton additionalClasses="add-to-cart" text="В корзину"
              fobj={{
                f: onAddToCart,
                args: {id}
              }} />
          )
        }
      </div>
    </div>
  );
};
