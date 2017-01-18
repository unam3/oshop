import React from 'react';
import BlueButton from '../BlueButton/BlueButton';

export default function ({toggleProcessingOrderStatus, handleServerResponse}) {
  const form = {};

  const processResponse = function (response) {
    switch (response) {
      case 200:
        toggleProcessingOrderStatus();

        handleServerResponse({
          'payload': {
            'statusCode': 200
          }
        });

        break;
      default:
        /* eslint no-debugger: 0 */
        debugger;
    }
  };

  const checkout = function () {
    toggleProcessingOrderStatus();

    // проверка заполненности формы
    let emptyInput;

    Object.keys(form)
      .every((inputName) => {
        const v = form[inputName].value;

        const checkPassed = (v.length !== 0) && /\S/m.test(v);

        console.log('cp', checkPassed);

        if (!checkPassed) {
          emptyInput = form[inputName];
        }

        return checkPassed;
      });

    if (emptyInput) {
      toggleProcessingOrderStatus();

      emptyInput.focus();
    } else {
      // эмуляция отправки и обработки ответа
      setTimeout(processResponse, 1000, 200);
    }
  };

  return (
    <form className="order-form flex-column">
      <div className="order-form__requirement">
        Поля ниже необходимо заполнить:
      </div>
      <input name="name" ref={(l) => form.name = l}
        placeholder="Ваше имя" required />
      <input name="email" ref={(l) => form.email = l} placeholder="Email"
        required />
      <input name="phone_number" ref={(l) => form.phone_number = l}
        placeholder="Телефон" required />
      <input name="address" ref={(l) => form.address = l}
        placeholder="Адрес доставки" required />
      <textarea className="comment-ta" ref={(l) => form.comment = l}
        name="comment" placeholder="Комментарий" required />
      <BlueButton text="Оформить заказ" additionalClasses="checkout"
        fobj={{f: checkout}} />
    </form>
  );
}
