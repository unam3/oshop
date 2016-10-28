const React = require("react");

module.exports = function (props) {
  var func = function (e, fobj) {
    e.preventDefault();
    if (fobj && fobj.f) fobj.f(fobj.args);
  };
  return <a
      className="BlueButton"
      //onClick={require("./preventDefault.js")}
      onClick={(e) => func(e, props.fobj)}
      href="#">
        {props.text}
    </a>;
}
