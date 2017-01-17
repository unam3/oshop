import React from 'react';
import OrderProducts from '../OrderProducts/OrderProducts';
import TotalCost from '../TotalCost/TotalCost';
import Form from '../Form/Form';

export default ({
  orderProducts,
  onQuantityChange,
  onDeleteFromOrder,
  productId_quantity,
  /* eslint no-shadow: 0 */
  toggleProcessingOrderStatus,
  /* eslint no-shadow: 0 */
  handleServerResponse
}) => {
  require('./Order.css');
  return (
  <div className="order flex-column">
    <h1 className="title">Оформление заказа</h1>
    <OrderProducts
      orderProducts={orderProducts}
      onQuantityChange={onQuantityChange}
      onDeleteFromOrder={onDeleteFromOrder}
      />
    <TotalCost data={{
      orderProducts,
      productId_quantity
    }} />
  <Form productId_quantity={productId_quantity}
    toggleProcessingOrderStatus={toggleProcessingOrderStatus}
    handleServerResponse={handleServerResponse} />
  </div>);
};
