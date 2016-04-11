'use strict';

var ndarray = require('ndarray');
var nrm2 = require('../nrm2');
var assert = require('chai').assert;
var almostEqual = require('almost-equal');

describe('nrm2', function () {
  it('computes the L2 norm', function () {
    var a = ndarray(new Float64Array([1, 2, 3, 4]));

    assert(almostEqual(nrm2(a), Math.sqrt(1 * 1 + 2 * 2 + 3 * 3 + 4 * 4)));
  });
});

