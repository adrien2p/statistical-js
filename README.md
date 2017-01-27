[![Build Status](https://travis-ci.org/adrien2p/statistical.js.svg?branch=master)](https://travis-ci.org/adrien2p/statistical.js)
# statistical.js

This library is work in progress...

## How to use

statistical.js is really easy to use. 

```javascript
const statistical = require('statistical');

const sets = {
    set1: [0, 1, 2, 3, 4],
    set2: [0, 1, 2, 3, 4],
    set3: [0, 1, 2, 3, 4],
    set3: [0, 1, 2, 3, 4]
};
``` 
Above, i've initialize 4 data set to use in below example.

### Example

> All methods presented below return the same pattern for them result.
> - when only one dataSet is provided, the result will be a number.
> - when multiple dataSet are provided, the result will be an array of number where each number correspond to a dataSe in the same order.

#### Sum

`statistical.sum({object})`

```javascript
const sums = statistical.sum(sets);
console.log(sums);

// Show in the console :
// [10, 10, 10, 10]
```
#### Average

`statistical.average({object})`

```javascript
const avgs = statistical.avg(sets);
console.log(avgs);

// Show in the console :
// "[2, 2, 2, 2]"
```

#### Variance

`statistical.variance({object})`

```javascript
const variances = statistical.variance(sets);
console.log(variances);

// Show in the console :
// "[2, 2, 2, 2]"
```



