import React from 'react';
import { Product } from '../Product/Product';
import { ShowMoreProducts } from '../ShowMoreProducts/ShowMoreProducts';

export const ProductTable = ({
  productsCategory,
  products,
  productsLoadOffset,
  cart,
  onAddToCart,
  onShowMoreProducts
}) => (
  <div className="products-table product-list_product-table flex-column">
    <h1 className="products-table__title title">
      {productsCategory}
    </h1>
    <section className="products-table__table flex-row">
      {products.slice(0, productsLoadOffset)
        .map(({id, brand, name, cost}) => (
          <Product key={id}
            id={id} 
            brand={brand}
            name={name}
            cost={cost}
            cart={cart}
            onAddToCart={onAddToCart} />
        )
      )}
    </section>
    <ShowMoreProducts onShowMoreProducts={onShowMoreProducts} />
  </div>
);
