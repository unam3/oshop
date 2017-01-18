import React from 'react';
import OrderInfo from '../OrderInfo/OrderInfo';
import Order from '../Order/Order';

export default function ({
  processingOrder,
  serverResponse,
  // orderProducts = [],
  orderProducts,
  productId_quantity,
  onQuantityChange,
  onDeleteFromOrder,
  /* eslint no-shadow: 0 */
  toggleProcessingOrderStatus,
  /* eslint no-shadow: 0 */
  handleServerResponse,
}) {
  const redirect = path => setTimeout(
    () => window.location = path,
    6000
  );

  // console.log(processingOrder, serverResponse);

  if (orderProducts.every((l) => l === null)) {
    redirect('cart');

    return <OrderInfo text="В форме заказа нет товаров. Перемещаемся в корзину для составления нового заказа" />;
  }

  if (processingOrder) {
    return <OrderInfo text="Обрабатываем заказ" />;
  }

  return (serverResponse === 200) ?
    // можно редирект в корзину для оформления нового заказа
    <OrderInfo text="Заказ успешно отправлен" />
    : (
      <Order
        orderProducts={orderProducts}
        productId_quantity={productId_quantity}
        onQuantityChange={onQuantityChange}
        onDeleteFromOrder={onDeleteFromOrder}
        toggleProcessingOrderStatus={toggleProcessingOrderStatus}
        handleServerResponse={handleServerResponse}
        />
    );
}
