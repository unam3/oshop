module.exports = function (fobj) {
  if (fobj && fobj.f) fobj.f(fobj.args);
};
