'use strict';

var ndarray = require('ndarray');
var scal = require('../scal');
var assert = require('chai').assert;
var ndt = require('ndarray-tests');

describe('scal', function () {
  it('scales', function () {
    var a = ndarray(new Float64Array([1, 2, 3, 4]));
    scal(4.5, a);
    assert(ndt.equal(a, ndarray([4.5, 9, 13.5, 18]), 1e-8));
  });
});

