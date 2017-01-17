import React from 'react';
import applyF from '../../helpers/applyF.js';

module.exports = function (props) {
  require('./BlueButton.css');

  let className = 'button-blue';

  if (props.additionalClasses) {
    className += ' ' + props.additionalClasses;
  }

  return (
    <a className={className}
      onClick={function (e) {
        e.preventDefault();

        applyF(props.fobj);
      }}
      href="#">
        {props.text}
    </a>);
};
