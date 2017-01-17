import React from 'react';

export default ({onQuantityChange, productId}) => (
  <div className="product__element">
    <img />
    <input className="quantity"
      onChange={(e) => {
        e.preventDefault();

        const inputValue = e.target.value;

        onQuantityChange({
          id: productId,
          // in case of manual deleted input number (value === '')
          quantity: inputValue !== '' ? parseInt(inputValue, 10) : 0
        });
      }}
      type="number" min="1" defaultValue="1" />
    <img />
  </div>
);
