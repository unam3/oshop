import React from 'react';

export default ({f, productId}) => (
  <a className="product__delete-product-button product__element blue-text link-wo-underline"
    onClick={(e) => {
      e.preventDefault();

      f({'id': productId});
    }}
    href="#" >
    Убрать
  </a>
);
