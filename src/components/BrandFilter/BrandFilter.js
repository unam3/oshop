import React from 'react';
import { Filter } from '../Filter/Filter';

export const BrandFilter = function ({products}) {
  require('./BrandFilter.css');

  const brandsObj = {};

  products.forEach(function (product) {
    brandsObj[product.brand] = true;
  });

  return (
    <Filter
      additionalClasses="filters__brand-filter filters__filter"
      filterName="Бренд"
      filter={<div className="filter__brands flex-row">
          {Object.keys(brandsObj)
            .map((brand) => <div className="brand" key={brand}>
              <input type="checkbox" /> {brand}
            </div>)}
        </div>}
    />
  );
};
