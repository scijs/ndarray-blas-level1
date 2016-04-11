'use strict';

module.exports = function scal (alpha, x) {
  var i;
  for (i = x.shape[0] - 1; i >= 0; i--) {
    x.set(i, alpha * x.get(i));
  }
};
