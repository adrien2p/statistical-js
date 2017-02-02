[![Build Status](https://travis-ci.org/adrien2p/statistical-js.svg?branch=master)](https://travis-ci.org/adrien2p/statistical-js)
[![Coverage Status](https://coveralls.io/repos/github/adrien2p/statistical-js/badge.svg?branch=master)](https://coveralls.io/github/adrien2p/statistical-js?branch=master)

[![NPM](https://nodei.co/npm/statistical-js.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/statistical-js/)

# Statistical-JS

Library that provide you some statistics which are useful and with the best performance execution.

## Getting Started

`npm install --save statistcal-js`
```javascript
/* how to import and use it */
const statistical = require('statistical-js');
const res = statistical.base.sum([1, 2, 3]);
```

To see what you can do with `statistical-js` you can go [there !](https://github.com/adrien2p/statistical-js/wiki).

### Prerequisites

They are no dependencies, so you can use it just like that and ES6.


### Performance

To provide you with the best performance when using statistical-js, this library has implemented a variable cache system to save the last calculations.
To see how manage it if it necessary, you can go to [perfomance section !](https://github.com/adrien2p/statistical-js/wiki/Performance)

### Actually provided

- Basics
  - epsilon (const value 0.0001)
  - min
  - max
  - Sum
  - Median
  - Mode
  - Mean
  - Variance
  - Standard deviation
  - Quantile
  - Summary (regroup all descriptives statistics above)
  - Percentile
  - factorial
- Distribution
  - Binomial
  - Bernoulli
  - Poisson
  - Chi Squared Goodness Of Fit

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
