[![Build Status](https://travis-ci.org/adrien2p/statistical-js.svg?branch=master)](https://travis-ci.org/adrien2p/statistical-js)
[![Coverage Status](https://coveralls.io/repos/github/adrien2p/statistical-js/badge.svg?branch=master)](https://coveralls.io/github/adrien2p/statistical-js?branch=master)
# statistical.js

This is a new statistics library, but i want to do my best.

## How to use

statistical.js is really easy to use in many sense.

```javascript
const statistical = require('statistical');
```

### Example

#### Sum

`statistical.sum({Array})`

```javascript
const dataSet = [0, 1, 2, 3, 4];
const sums = statistical.sum(dataSet);

console.log(sums);

// Show in the console :
// 10
```

#### Median

`statistical.median({Array})`

```javascript
const odddataSet = [0, 1, 2, 3, 4];
const evendataSet = [1, 2, 3, 4];

const median1 = statistical.sum(evendataSet);
const median2 = statistical.sum(odddataSet);

console.log(median1);
console.log(median2);

// Show in the console :
// 2
// 2.5
```

#### Mode

`statistical.mode({Array})`

```javascript
const dataSet1 = [0, 1, 2, 3, 4];
const dataSet2 = [0, 1, 1, 2];

const mode1 = statistical.sum(dataSet);
const mode2 = statistical.sum(dataSet);

console.log(mode1);
console.log(mode2);

// Show in the console :
// [0, 1, 2, 3, 4]
// 1
```

#### Average

`statistical.average({Array})`

```javascript
const dataSet = [0, 1, 2, 3, 4];
const avg = statistical.avg(dataSet);

console.log(avg);

// Show in the console :
// 2
```

#### Variance

`statistical.variance({Array})`

```javascript
const dataSet = [0, 1, 2, 3, 4];
const variances = statistical.variance(dataSet);
console.log(variances);

// Show in the console :
// 2
```

### ...

Above showed you some simple method and how to use them.
To find the complete documentation, you can go to the [wiki !](https://github.com/adrien2p/statistical-js.wiki.git)

