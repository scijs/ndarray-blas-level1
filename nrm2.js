'use strict';

module.exports = function nrm2 (x) {
  var i, tmp;
  var dx = x.data;
  var ox = x.stride[0];
  var px = x.offset;
  var sum = 0;
  for (i = x.shape[0] - 1; i >= 0; i--, px += ox) {
    tmp = dx[px];
    sum += tmp * tmp;
  }
  return Math.sqrt(sum);
};
