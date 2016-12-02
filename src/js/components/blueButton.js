const React = require("react"),
      applyF = require("../helpers/applyF.js");

module.exports = function (props) {
  let className = "button-blue";

  if (props.additionalClasses)
    className += " " + props.additionalClasses;

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
