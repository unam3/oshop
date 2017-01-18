import React from 'react';
import { Ring } from '../../components/Ring/Ring';
import { Filters } from '../../components/Filters/Filters';
import { ProductTable } from '../../components/ProductTable/ProductTable';

export default class ProductList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {
      products,
      productsLoadOffset,
      onShowMoreProducts,
    } = this.props;

    if (products.length === 0 && productsLoadOffset === 0) {
      onShowMoreProducts();
    }
  }

  render () {
    require('../../common.css');
    require('./RealProductList.css');

    const {
      cart,
      products,
      productsCategory,
      productsLoadOffset,
      onShowMoreProducts,
      onAddToCart
    } = this.props;

    return products && products.length ? (
      <div className="product-list main__product-list flex-row">
        <Filters products={products} />
        <ProductTable products={products}
          productsCategory={productsCategory}
          cart={cart}
          onAddToCart={onAddToCart}
          onShowMoreProducts={onShowMoreProducts}
          />
      </div>) : (<Ring />);
  }
}
