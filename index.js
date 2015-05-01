'use strict';

var cwise = require('cwise');

exports.swap = cwise({
  args: ['array', 'array'],
  body: function(a,b) {
    var tmp = a;
    a = b;
    b = tmp;
  }
});

exports.scal = cwise({
  args: ['scalar', 'array'],
  body: function(alpha,x) {
    x *= alpha;
  }
});

exports.copy = cwise({
  args: ['array', 'array'],
  body: function(x,y) {
    y = x;
  }
});

exports.axpy = cwise({
  args:['scalar', 'array', 'array'],
  body: function(alpha, x, y) {
    y += alpha * x;
  }
});

exports.dot = cwise({
  args:['array', 'array'],
  pre: function() {
    this.sum = 0;
  },
  body: function(a,b) {
    this.sum += a * b;
  },
  post: function() {
    return this.sum;
  }
});

exports.cpsc = cwise({
  args:['scalar', 'array', 'array'],
  body: function(alpha, x, y) {
    y = alpha * x;
  }
});

exports.nrm2 = cwise({
  args:['array'],
  pre: function() {
    this.sum = 0;
  },
  body: function(a) {
    this.sum += a * a;
  },
  post: function() {
    return Math.sqrt(this.sum);
  }
});

exports.asum = cwise({
  args:['array'],
  pre: function() {
    this.sum = 0;
  },
  body: function(a) {
    this.sum += Math.abs(a);
  },
  post: function() {
    return this.sum;
  }
});

exports.iamax = cwise({
  args:['array'],
  pre: function() {
    this.maxValue = 0;
    this.maxIndex = 0;
    this.index = 0;
  },
  body: function(a) {
    if (Math.abs(a) > this.maxValue) {
        this.maxValue = a;
        this.maxIndex = this.index;
    }
    this.index++;
  },
  post: function() {
    return this.maxIndex;
  }
});
