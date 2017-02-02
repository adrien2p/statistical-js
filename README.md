[![Build Status](https://travis-ci.org/adrien2p/statistical-js.svg?branch=master)](https://travis-ci.org/adrien2p/statistical-js)
[![Coverage Status](https://coveralls.io/repos/github/adrien2p/statistical-js/badge.svg?branch=master)](https://coveralls.io/github/adrien2p/statistical-js?branch=master)
[![NPM](https://nodei.co/npm/statistical-js.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/statistical-js/)

# statistical-js

To find the complete documentation, you can go to the [wiki !](https://github.com/adrien2p/statistical-js/wiki)

### How to use
`npm install --save statistical-js`

```javascript
const statistical = require('statistical-js');
```

### Performance

To provide you with the best performance when using statistical-js, this library has implemented a variable cache system to save the last calculations.
To see how manage it if it necessary, you can go to [perfomance section !](https://github.com/adrien2p/statistical-js/wiki/Performance)

#### Actualy support

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