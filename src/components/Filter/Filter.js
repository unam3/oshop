import React from 'react';

export const Filter = function ({additionalClasses, filterName, filter}) {
  let className = 'filter';

  if (additionalClasses) {
    className += ' ' + additionalClasses;
  }

  return (<div className={className}>
      <h6 className="filter__title">{filterName}</h6>
      {filter}
    </div>);
};
