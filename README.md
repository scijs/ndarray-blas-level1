# ndarray-blas-level1

[![Build Status](https://travis-ci.org/scijs/ndarray-blas-level1.svg?branch=master)](https://travis-ci.org/scijs/ndarray-blas-level1) [![npm version](https://badge.fury.io/js/ndarray-blas-level1.svg)](http://badge.fury.io/js/ndarray-blas-level1)

BLAS Level 1 operations for [ndarrays](https://github.com/scijs/ndarray)


## Usage

This library implements the basic vector operations of the Level 1 Basic Linear Algebra Subprograms (BLAS). Many of these functions are also implemented in [ndarray-ops](https://github.com/scijs/ndarray-ops)—which also has functions that are not included in BLAS. So the right answer is probably some blend of the two. This library exists mainly to frame things in a relatively standard, coherent framework.

*NB: This library performs no checks to ensure you're only passing one-dimensional vectors. That's either a bug or a feature, depending on how you think about it.*

| Function | Operation | Description |
| -------- | --------- | ----------- |
| `swap(x,y)` | ![swap](/docs/images/swap.png) | Swap the elements of x and y |
| `scal(alpha,x)` | ![scal](/docs/images/scal.png) | Multiple vector x by scalar alpha |
| `copy(x,y)` | ![copy](/docs/images/copy.png) | Copy x into y |
| `axpy(alpha, x, y)` | ![axpy](/docs/images/axpy.png) | Multiple x by alpha and add it to y |
| `cpsc(alpha, x, y)` | ![cpsc](/docs/images/cpsc.png) | Multiply x by alpha and assign it to y |
| `dot(x,y)` | ![dot](/docs/images/dot.png) | Calculate the inner product of x and y. |
| `nrm2(x)` | ![nrm2](/docs/images/nrm2.png) | Calculate the 2-norm of x |
| `asum(x)` | ![asum](/docs/images/asum.png) | Calculate the 1-norm of x |
| `iamax(x)` |  | Not yet implemented |


## Example

Usage should be pretty straightforward. There aren't really any options or variations.

```javascript
var blas1 = require('ndarray-blas-level1');

var x = ndarray([1,2,3]);
var y = ndarray([3,4,5]);

blas1.axpy( 2, x, y );
```





## Credits
(c) 2015 Ricky Reusser. MIT License
