'use strict';

var rotg = require('../rotg');
var assert = require('chai').assert;
var almostEqual = require('almost-equal');

describe('rotg', function () {
  it('rotg', function () {
    var csr = new Float64Array(3);
    var f = 1;
    var g = 2;

    rotg(f, g, csr);
    var c = csr[0];
    var s = csr[1];
    var r = csr[2];

    assert(almostEqual(r, Math.sqrt(f * f + g * g)));
    assert(almostEqual(c, f / r));
    assert(almostEqual(s, g / r));
  });
});
