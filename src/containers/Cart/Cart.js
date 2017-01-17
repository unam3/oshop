import React from 'react';
import { connect } from 'react-redux';

const Cart = ({cart}) => {
  require('./Cart.css');

  const productsCount = Object.keys(cart).length;

  return (
    <div className="cart blue-text">
      { productsCount ? (
        <a className="blue-text" href="#">
          {'В корзине ' + productsCount + ' товаров'}
        </a>) : 'Корзина пуста'
      }
    </div>
  );
};

export const ConnectedCart = connect(
  ({cart}) => ({cart})
)(Cart);
