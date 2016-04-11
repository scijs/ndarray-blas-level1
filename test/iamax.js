'use strict';

var ndarray = require('ndarray');
var iamax = require('../iamax');
var assert = require('chai').assert;

describe('iamax', function () {
  it('iamax', function () {
    var a = ndarray(new Float64Array([1, 2, 3, 4]));
    var b = ndarray(new Float64Array([2, 1, 4, 2]));

    assert.equal(iamax(a), 3);
    assert.equal(iamax(b), 2);
  });
});
