# ndarray-blas-level1

BLAS Level 1 operations for [ndarrays](https://github.com/scijs/ndarray)


## Usage

This library implements the basic vector operations of the Level 1 Basic Linear Algebra Subprograms (BLAS). Many of these functions are also implemented in [ndarray-ops](https://github.com/scijs/ndarray-ops)—which also has functions that are not included in BLAS. So the right answer is probably some blend of the two. This library exists mainly to frame things in a relatively standard, coherent framework.

*NB: This library performs no checks to ensure you're only passing one-dimensional vectors. That's either a bug or a feature, depending on how you think about it.*

### `swap(x,y)`
Swaps the elements of x and y.
![swap](/docs/images/swap.png)

### `scal(alpha, x)`
Multiple vector x by scalar alpha.
![scal](/docs/images/scal.png)

### `copy(x,y)`
Copy x into y.
![copy](/docs/images/copy.png)

### `axpy(alpha, x, y)`
Multiple x by alpha and add it to y.
![axpy](/docs/images/axpy.png)

### `cpsc(alpha, x, y)`
Multiply x by alpha and assign it to y.
![cpsc](/docs/images/cpsc.png)

### `dot(x,y)`
Calculate the inner product of x and y.
![dot](/docs/images/dot.png)

### `nrm2(x)`
Calculate the 2-norm of x.
![nrm2](/docs/images/nrm2.png)

### `asum(x)`
Calculate the 1-norm of x.
![asum](/docs/images/asum.png)

### `iamax(x)`
*Not yet implemented*: Determine the argmax of x. See [ndarray-ops](https://github.com/scijs/ndarray-ops) for a robust implementation.


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
