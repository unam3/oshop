import React from 'react';
import { Filter } from '../Filter/Filter';

export const CostFilter = function () {
  require('./CostFilter.css');

  // можно с reduce пройти в начале по всем элементам, найти min/max и
  // выставить defaultValue
  const filter = (
    <div className="cost-filter flex-row">
      <input className="cost-filter__part cost-filter__input"
        type="number" defaultValue="0" />
      <div className="cost-filter__part">
        —
      </div>
      <input className="cost-filter__part cost-filter__input"
        type="number" defaultValue="1000000" />
    </div>
  );

  return (
    <Filter additionalClasses="filters__cost-filter filters__filter"
      filterName="Цена"
      filter={filter} />);
};
