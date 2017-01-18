import React from 'react';

export const ShowMoreProducts = ({onShowMoreProducts}) => {
  require('./ShowMoreProducts.css');

  return (
    <a href="#" className="show-more text-color"
        onClick={
          (e) => {e.preventDefault();
          onShowMoreProducts();
          }
        }>
      Показать еще 6 товаров
    </a>
  );
};
