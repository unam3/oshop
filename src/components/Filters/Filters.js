import React from 'react';
import { CostFilter } from '../CostFilter/CostFilter';
import { BrandFilter } from '../BrandFilter/BrandFilter';

const onClickHandler = function (e) {
  e.preventDefault();
  console.log('reset filters');
};

export const Filters = ({products}) => (
  <section className="filters product-list__filters flex-column">
    <CostFilter products={products} />
    <BrandFilter products={products} />
    <div className="filters__controls flex-row">
      <div className="control__wrapper">
        <input type="button" value="Применить" />
      </div>
      <div className="control__wrapper">
        <a href="#" onClick={onClickHandler}>
          Сбросить
        </a>
      </div>
    </div>
  </section>
);
