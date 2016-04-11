'use strict';

var scalGeneric = require('./lib/scal.generic');
var scalDefault = require('./lib/scal');

module.exports = function scal (alpha, x) {
  if (x.dtype === 'generic') {
    return scalGeneric(alpha, x);
  } else {
    return scalDefault(alpha, x);
  }
};
