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

exports.dot = function(a,b) {
  if( a === b ) {
    return cwise({
      args:['array'],
      pre: function() {
        this.sum = 0;
      },
      body: function(a) {
        this.sum += a * a;
      },
      post: function() {
        return this.sum;
      }
    })(a)
  } else {
    return cwise({
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
    })(a,b)
  }
};

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
    var a_abs = Math.abs(a);
    if (a_abs > this.maxValue) {
        this.maxValue = a_abs;
        this.maxIndex = this.index;
    }
    this.index++;
  },
  post: function() {
    return this.maxIndex;
  }
});
