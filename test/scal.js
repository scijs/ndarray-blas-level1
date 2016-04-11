'use strict';

var ndarray = require('ndarray');
var scal = require('../scal');
var assert = require('chai').assert;
var ndt = require('ndarray-tests');
var proxy = require('ndarray-proxy');

describe('scal', function () {
  describe('regular ndarrays', function () {
    it('scales', function () {
      var a = ndarray(new Float64Array([1, 2, 3, 4]));
      scal(4.5, a);
      assert(ndt.equal(a, ndarray([4.5, 9, 13.5, 18]), 1e-8));
    });
  });

  describe('generic ndarrays', function () {
    it('scales a proxy', function () {
      var aStore = ndarray(new Float64Array([1, 2, 3, 4]));
      var a = proxy([4],
        function (i) {
          return aStore.get(i);
        },
        function (i, value) {
          return aStore.set(i, value);
        }
      );
      scal(4.5, a);
      assert(ndt.equal(a, ndarray([4.5, 9, 13.5, 18]), 1e-8));
    });

    it('throws an error if no setter defined', function () {
      assert.throws(function () {
        var aStore = ndarray(new Float64Array([1, 2, 3, 4]));
        var a = proxy([4],
          function (i) {
            return aStore.get(i);
          }
        );
        scal(4.5, a);
        assert(ndt.equal(a, ndarray([4.5, 9, 13.5, 18]), 1e-8));
      }, Error, /Setter not implemented/);
    });
  });
});

