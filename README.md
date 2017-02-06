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
const res = statistical.sum([1, 2, 3]);
```

### Prerequisites

They are no dependencies, so you can use it just like that and ES6.


### Performance

To provide you with the best performance when using statistical-js, this library has implemented a variable cache system to save the last calculations.
To see how manage it if it necessary, you can go to [perfomance section !](https://github.com/adrien2p/statistical-js/wiki/Performance)

### Actually supported

Click there see the complete [documentation](https://github.com/adrien2p/statistical-js/wiki).

- Simple statistics
    - Min
    - Max
    - Sum
    - Median
    - Mode
    - Mean
    - Variance
    - Standard deviation
    - Quantile
    - Summary (regroup all descriptives statistics above)
    - Percentile
    - Factorial
    - Geometric mean
    - Harmonic mean
    - InterQuartileRange
    - Sample variance (Non biased variance)
    - Sample Standard deviation (Non biased std deviation)
-Advanced statistics
    - Covariance
    - Binomial
    - Bernoulli
    - Poisson
    - Chi Squared Goodness Of Fit
    - T-test - one sample (t-value)
    - T-test - two sample (t-value)

As soon as possible, more feature will be available.


## Test

To run test without coverage.
> npm run test

If you want to generate coverage in `./coverage`.
> npm run test:coverage

## Lint

The `npm run lint` command lint code and fix it at the same time.

## build

To build dev version `./lib/statistical.js`
> npm run build:dev

If you want to generate the production version `./lib/statistical.min.js`
> npm run build:prod

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
