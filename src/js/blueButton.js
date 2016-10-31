const React = require("react");

module.exports = function (props) {
  const applyF = function (e, fobj) {
    e.preventDefault();
    if (fobj && fobj.f) fobj.f(fobj.args);
  };
  let className = "button-blue";
  if (props.additionalClasses)
    className += " " + props.additionalClasses;
  return <a className={className} onClick={(e) => applyF(e, props.fobj)}
      href="#">
        {props.text}
    </a>;
}
