(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("statistical", [], factory);
	else if(typeof exports === 'object')
		exports["statistical"] = factory();
	else
		root["statistical"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var interceptor = __webpack_require__(2);
	var cacheManager = __webpack_require__(3);
	var StatisticalMethod = __webpack_require__(4);
	
	var Statistical = function (_StatisticalMethod) {
	    _inherits(Statistical, _StatisticalMethod);
	
	    function Statistical() {
	        var _ret;
	
	        _classCallCheck(this, Statistical);
	
	        var _this = _possibleConstructorReturn(this, (Statistical.__proto__ || Object.getPrototypeOf(Statistical)).call(this));
	
	        _this._settings = {
	            cache: {
	                enabled: true,
	                rootElementCount: 10,
	                subElementCount: 30
	            }
	        };
	        return _ret = interceptor.cacheBefore(_this, cacheManager, [
	        /* Excluded from the proxy */
	        '_settings', 'settings', 'chiSquaredProbTable']), _possibleConstructorReturn(_this, _ret);
	    }
	
	    /**
	     * Return settings used in statistical class.
	     *
	     * @returns {*}
	     */
	
	
	    _createClass(Statistical, [{
	        key: 'settings',
	        get: function get() {
	            return this._settings;
	        }
	
	        /**
	         * Allow to updates statistical settings.
	         *
	         * @param {*|object} options
	         */
	        ,
	        set: function set(options) {
	            if (!options && !options.cache) throw new Error('Missing parameter options (Statistical:settings');
	            if (isNaN(options.cache.rootElementCount)) throw new Error('rootElementCount must be a number (Statistical:settings');
	            if (isNaN(options.cache.subElementCount)) throw new Error('subElementCount must be a number (Statistical:settings');
	
	            this._settings = {
	                cache: {
	                    enabled: options.cache.enabled,
	                    rootElementCount: options.cache.rootElementCount || 10,
	                    subElementCount: options.cache.subElementCount || 30
	                }
	            };
	            cacheManager.settings = this._settings.cache;
	        }
	    }]);
	
	    return Statistical;
	}(StatisticalMethod);
	
	module.exports = new Statistical();

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Interceptor = function () {
	    function Interceptor() {
	        _classCallCheck(this, Interceptor);
	    }
	
	    /**
	     * Create a proxy to wrap a class method and intercept each call.
	     *
	     * @param {object} object
	     * @param {object} cacheManager
	     */
	
	
	    _createClass(Interceptor, [{
	        key: 'cacheBefore',
	        value: function cacheBefore(object, cacheManager, exclude) {
	            return new Proxy(object, {
	                get: function get(target, propKey) {
	                    if (propKey in target && !exclude.includes(propKey)) {
	                        return function () {
	                            var res = void 0;
	                            if (cacheManager.settings.enabled) {
	                                var cache = cacheManager.find(propKey, arguments.length <= 0 ? undefined : arguments[0]);
	                                if (cache) return cache.result;
	
	                                res = target[propKey].apply(target, arguments);
	                                cacheManager.update(propKey, { dataSet: arguments.length <= 0 ? undefined : arguments[0], result: res });
	                            } else {
	                                res = target[propKey].apply(target, arguments);
	                            }
	
	                            return res;
	                        };
	                    } else {
	                        return Reflect.get(target, propKey);
	                    }
	                }
	            });
	        }
	    }]);
	
	    return Interceptor;
	}();
	
	module.exports = new Interceptor();

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var CacheManager = function () {
	    function CacheManager() {
	        _classCallCheck(this, CacheManager);
	
	        this._cache = {};
	        this._settings = {
	            enabled: true,
	            rootElementCount: 10,
	            subElementCount: 30
	        };
	    }
	
	    /**
	     * Return CacheManager settings.
	     *
	     * @returns {{maxLength: number}|*}
	     */
	
	
	    _createClass(CacheManager, [{
	        key: 'update',
	
	
	        /**
	         * Update the cache saved with new results.
	         *
	         * @param {string} method
	         * @param {Object} options
	         */
	        value: function update(method, options) {
	            if (Object.keys(this._cache).length >= this._settings.rootElementCount) delete this._cache[Object.keys(this._cache)[0]];
	            if (this._cache[method] && this._cache[method].length >= this._settings.subElementCount) this._cache[method].splice(0, 1);
	
	            this._cache[method] = this._cache[method] || [];
	            this._cache[method].push({
	                date: new Date().getTime(),
	                dataSet: options.dataSet,
	                result: options.result
	            });
	        }
	
	        /**
	         * Find an existing dataSet in the cache and return it.
	         *
	         * @param {String} method
	         * @param {Array} dataSet
	         * @returns {Object}
	         */
	
	    }, {
	        key: 'find',
	        value: function find(method, dataSet) {
	            var cache = this._cache[method] || [];
	
	            var res = null;
	            cache.some(function (v) {
	                if (v.dataSet === dataSet) {
	                    res = v;
	                    return true;
	                }
	
	                return false;
	            });
	
	            return res;
	        }
	
	        /**
	         * Reset the cache to be empty.
	         */
	
	    }, {
	        key: 'reset',
	        value: function reset() {
	            this._cache = {};
	        }
	    }, {
	        key: 'settings',
	        get: function get() {
	            return this._settings;
	        }
	
	        /**
	         * Return the entire cache
	         *
	         * @returns {{}|*}
	         */
	        ,
	
	
	        /**
	         * Update existing settings to manage cache.
	         *
	         * @param {*} options
	         */
	        set: function set(options) {
	            if (!options) throw new Error('Missing parameter options (CacheManager:settings)');
	            this._settings = {
	                enabled: options.enabled,
	                rootElementCount: options.rootElementCount || 10,
	                subElementCount: options.subElementCount || 30
	            };
	        }
	    }, {
	        key: 'cache',
	        get: function get() {
	            return this._cache;
	        }
	    }]);
	
	    return CacheManager;
	}();
	
	module.exports = new CacheManager();

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var validator = __webpack_require__(5);
	var epsilon = __webpack_require__(6);
	var chiSquaredTable = __webpack_require__(7);
	
	var StatisticalMethod = function () {
	    function StatisticalMethod() {
	        _classCallCheck(this, StatisticalMethod);
	
	        this._validator = validator;
	        this._chiSquaredProbTable = chiSquaredTable;
	        this._epsilon = epsilon;
	    }
	
	    /**
	     * Return table of chi squared prob.
	     *
	     * @returns {*}
	     */
	
	
	    _createClass(StatisticalMethod, [{
	        key: 'min',
	
	
	        /**
	         * Return the smallest value of the dataSet.
	         *
	         * @param {Array} dataSet
	         * @returns {number}
	         */
	        value: function min(dataSet) {
	            this._validator.validate('dataSet', dataSet, ['isArray', 'length > 0']);
	            return dataSet.sort(function (a, b) {
	                return a - b;
	            })[0];
	        }
	
	        /**
	         * Return the biggest value of the dataSet.
	         *
	         * @param {Array} dataSet
	         * @returns {number}
	         */
	
	    }, {
	        key: 'max',
	        value: function max(dataSet) {
	            this._validator.validate('dataSet', dataSet, ['isArray', 'length > 0']);
	            return dataSet.sort(function (a, b) {
	                return a + b;
	            })[0];
	        }
	
	        /**
	         * The [Sum](https://en.wikipedia.org/wiki/Sum).
	         *
	         * @param dataSet
	         * @returns {*}
	         */
	
	    }, {
	        key: 'sum',
	        value: function sum(dataSet) {
	            this._validator.validate('dataSet', dataSet, ['isArray', 'length > 0']);
	            return dataSet.reduce(function (accumulator, current) {
	                return accumulator + current;
	            }, 0);
	        }
	
	        /**
	         * The [Median](https://en.wikipedia.org/wiki/Median).
	         *
	         * @param {Array} dataSet
	         * @returns {number}
	         */
	
	    }, {
	        key: 'median',
	        value: function median(dataSet) {
	            this._validator.validate('dataSet', dataSet, ['isArray', 'length > 0']);
	
	            var middle = Math.floor(dataSet.length / 2);
	            var isEven = dataSet.length % 2 === 0;
	
	            dataSet = dataSet.sort(function (a, b) {
	                return a - b;
	            });
	
	            return isEven ? (dataSet[middle - 1] + dataSet[middle]) / 2 : dataSet[middle];
	        }
	
	        /**
	         * The [Mode](https://en.wikipedia.org/wiki/Mode).
	         *
	         * @param {Array} dataSet
	         * @returns {*}
	         */
	
	    }, {
	        key: 'mode',
	        value: function mode(dataSet) {
	            this._validator.validate('dataSet', dataSet, ['isArray', 'length > 0']);
	
	            var counter = {};
	            var mode = [];
	            var max = 0;
	
	            dataSet.map(function (value, index) {
	                if (!(dataSet[index] in counter)) counter[dataSet[index]] = 0;
	
	                counter[dataSet[index]]++;
	
	                if (counter[dataSet[index]] === max) mode.push(dataSet[index]);
	                if (counter[dataSet[index]] > max) {
	                    max = counter[dataSet[index]];
	                    mode = [dataSet[index]];
	                }
	            });
	
	            return mode.length > 1 ? mode : mode[0];
	        }
	
	        /**
	         * The [Mean](https://en.wikipedia.org/wiki/Mean).
	         *
	         * @param {Array} dataSet
	         * @returns {number}
	         */
	
	    }, {
	        key: 'mean',
	        value: function mean(dataSet) {
	            this._validator.validate('dataSet', dataSet, ['isArray', 'length > 0']);
	
	            return this.sum(dataSet) / dataSet.length;
	        }
	
	        /**
	         * The [Variance](https://en.wikipedia.org/wiki/Variance).
	         *
	         * @param {Array} dataSet
	         * @returns {number}
	         */
	
	    }, {
	        key: 'variance',
	        value: function variance(dataSet) {
	            this._validator.validate('dataSet', dataSet, ['isArray', 'length > 0']);
	
	            var avg = this.mean(dataSet);
	            var n = dataSet.length;
	
	            return this.sum(dataSet.map(function (value) {
	                return Math.pow(value - avg, 2);
	            })) / n;
	        }
	
	        /**
	         * The [Standard Deviation](https://en.wikipedia.org/wiki/Standard_deviation).
	         *
	         * @param {Array} dataSet
	         * @returns {number}
	         */
	
	    }, {
	        key: 'stdDeviation',
	        value: function stdDeviation(dataSet) {
	            this._validator.validate('dataSet', dataSet, ['isArray', 'length > 0']);
	            return Math.sqrt(this.variance(dataSet));
	        }
	
	        /**
	         * The [Quantile](http://en.wikipedia.org/wiki/Quantile).
	         *
	         * @param {Array} dataSet
	         * @param {number} index
	         * @returns {Array}
	         */
	
	    }, {
	        key: 'quantile',
	        value: function quantile(dataSet) {
	            var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
	
	            this._validator.validate('dataSet', dataSet, ['isArray', 'length > 0']);
	
	            dataSet = dataSet.sort(function (a, b) {
	                return a - b;
	            });
	            return !index ? [1, 2, 3, 4].map(function (i) {
	                return dataSet[Math.ceil(dataSet.length * (i / 4)) - 1];
	            }) : dataSet[Math.ceil(dataSet.length * (index / 4) - 1)];
	        }
	
	        /**
	         * The [Percentile](https://en.wikipedia.org/wiki/Percentile).
	         *
	         * @param {Array} dataSet
	         * @param {number} index
	         * @returns {Array}
	         */
	
	    }, {
	        key: 'percentile',
	        value: function percentile(dataSet) {
	            var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
	
	            this._validator.validate('dataSet', dataSet, ['isArray', 'length > 0']);
	
	            dataSet = dataSet.sort(function (a, b) {
	                return a - b;
	            });
	            return !index ? Array.from({ length: 99 }, function (v, k) {
	                return k + 1;
	            }).map(function (i) {
	                return dataSet[i];
	            }) : dataSet[Math.ceil(index / 100 * dataSet.length)];
	        }
	
	        /**
	         * Return the entire result of descriptives statistics above.
	         *
	         * @param {Array} dataSet
	         * @returns {{min: number, max: number, sum: *, median: number, mode: *, mean: number, variance: number, stdDeviation: number, quantile: Array}}
	         */
	
	    }, {
	        key: 'summary',
	        value: function summary(dataSet) {
	            this._validator.validate('dataSet', dataSet, ['isArray', 'length > 0']);
	
	            return {
	                min: this.min(dataSet),
	                max: this.max(dataSet),
	                sum: this.sum(dataSet),
	                median: this.median(dataSet),
	                mode: this.mode(dataSet),
	                mean: this.mean(dataSet),
	                variance: this.variance(dataSet),
	                stdDeviation: this.stdDeviation(dataSet),
	                quantile: this.quantile(dataSet)
	            };
	        }
	
	        /**
	         * The [Factorial](https://en.wikipedia.org/wiki/Factorial).
	         *
	         * @param {number} n
	         * @returns {number}
	         */
	
	    }, {
	        key: 'factorial',
	        value: function factorial(n) {
	            this._validator.validate('n', n, ['isNumber', 'positive']);
	
	            var factorialResult = 1;
	            for (var i = 2; i <= n; i++) {
	                factorialResult *= i;
	            }
	
	            return factorialResult;
	        }
	
	        /**
	         * The [Geometric Mean](https://en.wikipedia.org/wiki/Geometric_mean).
	         *
	         * @param {Array} dataSet
	         * @returns {number}
	         */
	
	    }, {
	        key: 'geometricMean',
	        value: function geometricMean(dataSet) {
	            this._validator.validate('dataSet', dataSet, ['isArray', 'length > 0']);
	            return Math.pow(dataSet.reduce(function (accumulator, current) {
	                return accumulator * current;
	            }, 1), 1 / dataSet.length);
	        }
	
	        /**
	         * The [Harmonic Mean](https://en.wikipedia.org/wiki/Harmonic_mean).
	         *
	         * @param {Array} dataSet
	         * @returns {number}
	         */
	
	    }, {
	        key: 'harmonicMean',
	        value: function harmonicMean(dataSet) {
	            this._validator.validate('dataSet', dataSet, ['isArray', 'length > 0']);
	            return dataSet.length / dataSet.reduce(function (accumulator, current) {
	                return accumulator + 1 / current;
	            }, 0);
	        }
	
	        /**
	         * The [Variance](https://en.wikipedia.org/wiki/Harmonic_mean).
	         * The [Biais](https://fr.wikipedia.org/wiki/Estimateur_(statistique)#Biais).
	         *
	         * Non biased variance
	         *
	         * @param {Array} dataSet
	         * @returns {number}
	         */
	
	    }, {
	        key: 'sampleVariance',
	        value: function sampleVariance(dataSet) {
	            this._validator.validate('dataSet', dataSet, ['isArray', 'length > 0']);
	
	            var avg = this.mean(dataSet);
	            var n = dataSet.length - 1;
	
	            return this.sum(dataSet.map(function (value) {
	                return Math.pow(value - avg, 2);
	            })) / n;
	        }
	
	        /**
	         * The [Binomial Distribution](http://en.wikipedia.org/wiki/Binomial_distribution).
	         *
	         * @param {number} trials
	         * @param {number} probability
	         * @returns {{}}
	         */
	
	    }, {
	        key: 'binomial',
	        value: function binomial(trials, probability) {
	            this._validator.validate('trials', trials, ['isNumber']);
	            this._validator.validate('probability', probability, ['isNumber', [0, 1]]);
	
	            var x = 0;
	            var cumulativeProbability = 0;
	            var cells = {};
	
	            do {
	                cells[x] = this.factorial(trials) / (this.factorial(x) * this.factorial(trials - x)) * (Math.pow(probability, x) * Math.pow(1 - probability, trials - x));
	                cumulativeProbability += cells[x];
	                x++;
	            } while (cumulativeProbability < 1 - this._epsilon);
	
	            return cells;
	        }
	
	        /**
	         * The [Bernoulli distribution](http://en.wikipedia.org/wiki/Bernoulli_distribution).
	         *
	         * @param {number} p
	         * @returns {Object}
	         */
	
	    }, {
	        key: 'bernoulli',
	        value: function bernoulli(p) {
	            this._validator.validate('p', p, ['isNumber', [0, 1]]);
	            return this.binomial(1, p);
	        }
	
	        /**
	         * The [Poisson Distribution](http://en.wikipedia.org/wiki/Poisson_distribution).
	         *
	         * @param {number} lambda
	         * @returns {{}}
	         */
	
	    }, {
	        key: 'poisson',
	        value: function poisson(lambda) {
	            this._validator.validate('lambda', lambda, ['strictlyPositive']);
	
	            var x = 0;
	            var cumulativeProbability = 0;
	            var cells = {};
	
	            do {
	                cells[x] = Math.pow(Math.E, -lambda) * Math.pow(lambda, x) / this.factorial(x);
	                cumulativeProbability += cells[x];
	                x++;
	            } while (cumulativeProbability < 1 - this._epsilon);
	
	            return cells;
	        }
	
	        /**
	         * The [χ2 (Chi-Squared) Goodness-of-Fit Test](http://en.wikipedia.org/wiki/Goodness_of_fit#Pearson.27s_chi-squared_test).
	         * return if data follow a specified distribution
	         *
	         * @param {Array} dataSet
	         * @param {Function} distributionType
	         * @param {number} significance
	         * @returns {boolean}
	         *
	         * @exemple
	         * chiSquaredGoodnessOfFit(dataSet, 'poisson', 0.05)); //= false
	         */
	
	    }, {
	        key: 'chiSquaredGoodnessOfFit',
	        value: function chiSquaredGoodnessOfFit(dataSet, distributionType, significance) {
	            this._validator.validate('dataSet', dataSet, ['isArray', 'length > 0']);
	            this._validator.validate('distributionType', distributionType, ['isFunction']);
	            this._validator.validate('significance', significance, ['isNumber', 'positive']);
	
	            /* Generate an array with number of ocurences for each data in dataSet. */
	            var observedFrequencies = [];
	            observedFrequencies = dataSet.reduce(function (accumulator, val) {
	                if (accumulator[val] === undefined) accumulator[val] = 0;
	                accumulator[val] += 1;
	                return accumulator;
	            }, []).filter(function (v) {
	                return v !== undefined;
	            });
	
	            /* Number of hypothesized distribution parameters estimated, expected to be supplied in the distribution test. */
	            /* Lose one degree of freedom for estimating `lambda` from the sample data. */
	            var dataSetMean = this.mean(dataSet);
	
	            /* The hypothesized distribution. Generate the hypothesized distribution. */
	            var hypothesizedDistribution = distributionType(dataSetMean);
	
	            /* Create an array holding a histogram of expected data given the */
	            /* sample size and hypothesized distribution. */
	            var expectedFrequencies = [];
	            expectedFrequencies = Object.entries(hypothesizedDistribution).reduce(function (accumulator, current, i) {
	                if (observedFrequencies[i]) accumulator[i] = current[1] * dataSet.length;
	                return accumulator;
	            }, []);
	
	            /* Concat frequencies < 3 with the previous one */
	            expectedFrequencies = Object.entries(expectedFrequencies).reduceRight(function (previous, current) {
	                if (previous[1] < 3) current[1] += previous[1];
	                return current;
	            });
	
	            /* Compute chiSquared value */
	            var chiSquared = 0;
	            chiSquared = Object.entries(observedFrequencies).reduce(function (accumulator, current, i) {
	                accumulator += Math.pow(current[1] - expectedFrequencies[i], 2) / expectedFrequencies[i];
	                return accumulator;
	            }, chiSquared);
	
	            var c = 1;
	            var degreesOfFreedom = Object.keys(observedFrequencies).length - c - 1;
	
	            return this._chiSquaredProbTable[degreesOfFreedom][significance] < chiSquared;
	        }
	
	        /**
	         * The [a one-sample t-test](https://en.wikipedia.org/wiki/Student%27s_t-test#One-sample_t-test).
	         *
	         * @param {Array} dataSet
	         * @param {number} mu
	         * @returns {number}
	         */
	
	    }, {
	        key: 'tTestOneSample',
	        value: function tTestOneSample(dataSet, mu) {
	            this._validator.validate('dataSet', dataSet, ['isArray', 'length > 0']);
	            this._validator.validate('mu', mu, ['isNumber']);
	
	            var mean = this.mean(dataSet);
	            var sd = this.stdDeviation(dataSet);
	            var sqrtSampleSize = Math.sqrt(dataSet.length);
	
	            /* t-value */
	            return (mean - mu) / (sd / sqrtSampleSize);
	        }
	
	        /**
	         * The [two sample t-test](http://en.wikipedia.org/wiki/Student's_t-test).
	         *
	         * @param {Array} dataSet1
	         * @param {Array} dataSet2
	         * @returns {number}
	         */
	
	    }, {
	        key: 'tTestTwoSample',
	        value: function tTestTwoSample(dataSet1, dataSet2) {
	            this._validator.validate('dataSet1', dataSet1, ['isArray', 'length > 0']);
	            this._validator.validate('dataSet2', dataSet2, ['isArray', 'length > 0']);
	
	            var n = dataSet1.length;
	            var m = dataSet2.length;
	            var meanX = this.mean(dataSet1);
	            var meanY = this.mean(dataSet2);
	            var sampleVarianceX = this.sampleVariance(dataSet1);
	            var sampleVarianceY = this.sampleVariance(dataSet2);
	
	            var weightedVariance = ((n - 1) * sampleVarianceX + (m - 1) * sampleVarianceY) / (n + m - 2);
	
	            /* t-value */
	            return (meanX - meanY) / Math.sqrt(weightedVariance * (1 / (n + 1) / m));
	        }
	    }, {
	        key: 'chiSquaredProbTable',
	        get: function get() {
	            return this._chiSquaredProbTable;
	        }
	    }]);
	
	    return StatisticalMethod;
	}();
	
	module.exports = StatisticalMethod;

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Validator = function () {
	    function Validator() {
	        _classCallCheck(this, Validator);
	    }
	
	    /**
	     * Valid a value with rules given, if the rules are not respected throw an error.
	     *
	     * @param {string} parameterName
	     * @param {*} value
	     * @param {Array} ruless
	     */
	
	
	    _createClass(Validator, [{
	        key: 'validate',
	        value: function validate(parameterName, value, rules) {
	            rules.map(function (r) {
	                switch (r) {
	                    case 'isArray':
	                        if (!Array.isArray(value)) throw new Error('Parameter ' + parameterName + ' must be an array');
	                        break;
	                    case 'isNumber':
	                        if (typeof value !== 'number') throw new Error('Parameter ' + parameterName + ' must be a number');
	                        break;
	                    case 'isString':
	                        if (typeof value !== 'string') throw new Error('Parameter ' + parameterName + ' must be a string');
	                        break;
	                    case 'isFunction':
	                        if (typeof value !== 'function') throw new Error('Parameter ' + parameterName + ' must be a function');
	                        break;
	                    case 'length > 0':
	                        if (value.length === 0) throw new Error('Parameter ' + parameterName + ' must have more than 0 values');
	                        break;
	                    case 'positive':
	                        if (value < 0) throw new Error('Parameter ' + parameterName + ' must be positive');
	                        break;
	                    case 'strictlyPositive':
	                        if (value <= 0) throw new Error('Parameter ' + parameterName + ' must be strictly positive');
	                        break;
	                    default:
	                        if (Array.isArray(r)) {
	                            var hasOnlyNumbers = !r.map(function (v) {
	                                return !isNaN(v);
	                            }).includes(false);
	                            if (hasOnlyNumbers) {
	                                if (r.length === 2) {
	                                    if (value < r[0] || value > r[1]) throw new Error('Parameter ' + parameterName + ' must fall between ' + r[0] + ' and ' + r[1]);
	                                }
	                            }
	                        } else {
	                            throw new Error('Method not implemented : ' + r);
	                        }
	                }
	            });
	        }
	    }]);
	
	    return Validator;
	}();
	
	module.exports = new Validator();

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";
	
	/**
	 * We use `ε`, epsilon, as a stopping criterion when we want to iterate
	 * until we're "close enough". Epsilon is a very small number: for
	 * simple statistics, that number is **0.0001**
	 *
	 * This is used in calculations like the binomialDistribution, in which
	 * the process of finding a value is [iterative](https://en.wikipedia.org/wiki/Iterative_method):
	 * it progresses until it is close enough.
	 *
	 * @type {number}
	 */
	var epsilon = 0.0001;
	
	module.exports = epsilon;

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * The [χ2 (Chi-Squared) Distribution](http://en.wikipedia.org/wiki/Chi-squared_distribution)
	 *
	 * @type {*}
	 */
	
	var chiSquaredTable = {
	    '1': {
	        '0.995': 0,
	        '0.99': 0,
	        '0.975': 0,
	        '0.95': 0,
	        '0.9': 0.02,
	        '0.5': 0.45,
	        '0.1': 2.71,
	        '0.05': 3.84,
	        '0.025': 5.02,
	        '0.01': 6.63,
	        '0.005': 7.88
	    },
	    '2': {
	        '0.995': 0.01,
	        '0.99': 0.02,
	        '0.975': 0.05,
	        '0.95': 0.1,
	        '0.9': 0.21,
	        '0.5': 1.39,
	        '0.1': 4.61,
	        '0.05': 5.99,
	        '0.025': 7.38,
	        '0.01': 9.21,
	        '0.005': 10.6
	    },
	    '3': {
	        '0.995': 0.07,
	        '0.99': 0.11,
	        '0.975': 0.22,
	        '0.95': 0.35,
	        '0.9': 0.58,
	        '0.5': 2.37,
	        '0.1': 6.25,
	        '0.05': 7.81,
	        '0.025': 9.35,
	        '0.01': 11.34,
	        '0.005': 12.84
	    },
	    '4': {
	        '0.995': 0.21,
	        '0.99': 0.3,
	        '0.975': 0.48,
	        '0.95': 0.71,
	        '0.9': 1.06,
	        '0.5': 3.36,
	        '0.1': 7.78,
	        '0.05': 9.49,
	        '0.025': 11.14,
	        '0.01': 13.28,
	        '0.005': 14.86
	    },
	    '5': {
	        '0.995': 0.41,
	        '0.99': 0.55,
	        '0.975': 0.83,
	        '0.95': 1.15,
	        '0.9': 1.61,
	        '0.5': 4.35,
	        '0.1': 9.24,
	        '0.05': 11.07,
	        '0.025': 12.83,
	        '0.01': 15.09,
	        '0.005': 16.75
	    },
	    '6': {
	        '0.995': 0.68,
	        '0.99': 0.87,
	        '0.975': 1.24,
	        '0.95': 1.64,
	        '0.9': 2.2,
	        '0.5': 5.35,
	        '0.1': 10.65,
	        '0.05': 12.59,
	        '0.025': 14.45,
	        '0.01': 16.81,
	        '0.005': 18.55
	    },
	    '7': {
	        '0.995': 0.99,
	        '0.99': 1.25,
	        '0.975': 1.69,
	        '0.95': 2.17,
	        '0.9': 2.83,
	        '0.5': 6.35,
	        '0.1': 12.02,
	        '0.05': 14.07,
	        '0.025': 16.01,
	        '0.01': 18.48,
	        '0.005': 20.28
	    },
	    '8': {
	        '0.995': 1.34,
	        '0.99': 1.65,
	        '0.975': 2.18,
	        '0.95': 2.73,
	        '0.9': 3.49,
	        '0.5': 7.34,
	        '0.1': 13.36,
	        '0.05': 15.51,
	        '0.025': 17.53,
	        '0.01': 20.09,
	        '0.005': 21.96
	    },
	    '9': {
	        '0.995': 1.73,
	        '0.99': 2.09,
	        '0.975': 2.7,
	        '0.95': 3.33,
	        '0.9': 4.17,
	        '0.5': 8.34,
	        '0.1': 14.68,
	        '0.05': 16.92,
	        '0.025': 19.02,
	        '0.01': 21.67,
	        '0.005': 23.59
	    },
	    '10': {
	        '0.995': 2.16,
	        '0.99': 2.56,
	        '0.975': 3.25,
	        '0.95': 3.94,
	        '0.9': 4.87,
	        '0.5': 9.34,
	        '0.1': 15.99,
	        '0.05': 18.31,
	        '0.025': 20.48,
	        '0.01': 23.21,
	        '0.005': 25.19
	    },
	    '11': {
	        '0.995': 2.6,
	        '0.99': 3.05,
	        '0.975': 3.82,
	        '0.95': 4.57,
	        '0.9': 5.58,
	        '0.5': 10.34,
	        '0.1': 17.28,
	        '0.05': 19.68,
	        '0.025': 21.92,
	        '0.01': 24.72,
	        '0.005': 26.76
	    },
	    '12': {
	        '0.995': 3.07,
	        '0.99': 3.57,
	        '0.975': 4.4,
	        '0.95': 5.23,
	        '0.9': 6.3,
	        '0.5': 11.34,
	        '0.1': 18.55,
	        '0.05': 21.03,
	        '0.025': 23.34,
	        '0.01': 26.22,
	        '0.005': 28.3
	    },
	    '13': {
	        '0.995': 3.57,
	        '0.99': 4.11,
	        '0.975': 5.01,
	        '0.95': 5.89,
	        '0.9': 7.04,
	        '0.5': 12.34,
	        '0.1': 19.81,
	        '0.05': 22.36,
	        '0.025': 24.74,
	        '0.01': 27.69,
	        '0.005': 29.82
	    },
	    '14': {
	        '0.995': 4.07,
	        '0.99': 4.66,
	        '0.975': 5.63,
	        '0.95': 6.57,
	        '0.9': 7.79,
	        '0.5': 13.34,
	        '0.1': 21.06,
	        '0.05': 23.68,
	        '0.025': 26.12,
	        '0.01': 29.14,
	        '0.005': 31.32
	    },
	    '15': {
	        '0.995': 4.6,
	        '0.99': 5.23,
	        '0.975': 6.27,
	        '0.95': 7.26,
	        '0.9': 8.55,
	        '0.5': 14.34,
	        '0.1': 22.31,
	        '0.05': 25,
	        '0.025': 27.49,
	        '0.01': 30.58,
	        '0.005': 32.8
	    },
	    '16': {
	        '0.995': 5.14,
	        '0.99': 5.81,
	        '0.975': 6.91,
	        '0.95': 7.96,
	        '0.9': 9.31,
	        '0.5': 15.34,
	        '0.1': 23.54,
	        '0.05': 26.3,
	        '0.025': 28.85,
	        '0.01': 32,
	        '0.005': 34.27
	    },
	    '17': {
	        '0.995': 5.7,
	        '0.99': 6.41,
	        '0.975': 7.56,
	        '0.95': 8.67,
	        '0.9': 10.09,
	        '0.5': 16.34,
	        '0.1': 24.77,
	        '0.05': 27.59,
	        '0.025': 30.19,
	        '0.01': 33.41,
	        '0.005': 35.72
	    },
	    '18': {
	        '0.995': 6.26,
	        '0.99': 7.01,
	        '0.975': 8.23,
	        '0.95': 9.39,
	        '0.9': 10.87,
	        '0.5': 17.34,
	        '0.1': 25.99,
	        '0.05': 28.87,
	        '0.025': 31.53,
	        '0.01': 34.81,
	        '0.005': 37.16
	    },
	    '19': {
	        '0.995': 6.84,
	        '0.99': 7.63,
	        '0.975': 8.91,
	        '0.95': 10.12,
	        '0.9': 11.65,
	        '0.5': 18.34,
	        '0.1': 27.2,
	        '0.05': 30.14,
	        '0.025': 32.85,
	        '0.01': 36.19,
	        '0.005': 38.58
	    },
	    '20': {
	        '0.995': 7.43,
	        '0.99': 8.26,
	        '0.975': 9.59,
	        '0.95': 10.85,
	        '0.9': 12.44,
	        '0.5': 19.34,
	        '0.1': 28.41,
	        '0.05': 31.41,
	        '0.025': 34.17,
	        '0.01': 37.57,
	        '0.005': 40
	    },
	    '21': {
	        '0.995': 8.03,
	        '0.99': 8.9,
	        '0.975': 10.28,
	        '0.95': 11.59,
	        '0.9': 13.24,
	        '0.5': 20.34,
	        '0.1': 29.62,
	        '0.05': 32.67,
	        '0.025': 35.48,
	        '0.01': 38.93,
	        '0.005': 41.4
	    },
	    '22': {
	        '0.995': 8.64,
	        '0.99': 9.54,
	        '0.975': 10.98,
	        '0.95': 12.34,
	        '0.9': 14.04,
	        '0.5': 21.34,
	        '0.1': 30.81,
	        '0.05': 33.92,
	        '0.025': 36.78,
	        '0.01': 40.29,
	        '0.005': 42.8
	    },
	    '23': {
	        '0.995': 9.26,
	        '0.99': 10.2,
	        '0.975': 11.69,
	        '0.95': 13.09,
	        '0.9': 14.85,
	        '0.5': 22.34,
	        '0.1': 32.01,
	        '0.05': 35.17,
	        '0.025': 38.08,
	        '0.01': 41.64,
	        '0.005': 44.18
	    },
	    '24': {
	        '0.995': 9.89,
	        '0.99': 10.86,
	        '0.975': 12.4,
	        '0.95': 13.85,
	        '0.9': 15.66,
	        '0.5': 23.34,
	        '0.1': 33.2,
	        '0.05': 36.42,
	        '0.025': 39.36,
	        '0.01': 42.98,
	        '0.005': 45.56
	    },
	    '25': {
	        '0.995': 10.52,
	        '0.99': 11.52,
	        '0.975': 13.12,
	        '0.95': 14.61,
	        '0.9': 16.47,
	        '0.5': 24.34,
	        '0.1': 34.28,
	        '0.05': 37.65,
	        '0.025': 40.65,
	        '0.01': 44.31,
	        '0.005': 46.93
	    },
	    '26': {
	        '0.995': 11.16,
	        '0.99': 12.2,
	        '0.975': 13.84,
	        '0.95': 15.38,
	        '0.9': 17.29,
	        '0.5': 25.34,
	        '0.1': 35.56,
	        '0.05': 38.89,
	        '0.025': 41.92,
	        '0.01': 45.64,
	        '0.005': 48.29
	    },
	    '27': {
	        '0.995': 11.81,
	        '0.99': 12.88,
	        '0.975': 14.57,
	        '0.95': 16.15,
	        '0.9': 18.11,
	        '0.5': 26.34,
	        '0.1': 36.74,
	        '0.05': 40.11,
	        '0.025': 43.19,
	        '0.01': 46.96,
	        '0.005': 49.65
	    },
	    '28': {
	        '0.995': 12.46,
	        '0.99': 13.57,
	        '0.975': 15.31,
	        '0.95': 16.93,
	        '0.9': 18.94,
	        '0.5': 27.34,
	        '0.1': 37.92,
	        '0.05': 41.34,
	        '0.025': 44.46,
	        '0.01': 48.28,
	        '0.005': 50.99
	    },
	    '29': {
	        '0.995': 13.12,
	        '0.99': 14.26,
	        '0.975': 16.05,
	        '0.95': 17.71,
	        '0.9': 19.77,
	        '0.5': 28.34,
	        '0.1': 39.09,
	        '0.05': 42.56,
	        '0.025': 45.72,
	        '0.01': 49.59,
	        '0.005': 52.34
	    },
	    '30': {
	        '0.995': 13.79,
	        '0.99': 14.95,
	        '0.975': 16.79,
	        '0.95': 18.49,
	        '0.9': 20.6,
	        '0.5': 29.34,
	        '0.1': 40.26,
	        '0.05': 43.77,
	        '0.025': 46.98,
	        '0.01': 50.89,
	        '0.005': 53.67
	    },
	    '40': {
	        '0.995': 20.71,
	        '0.99': 22.16,
	        '0.975': 24.43,
	        '0.95': 26.51,
	        '0.9': 29.05,
	        '0.5': 39.34,
	        '0.1': 51.81,
	        '0.05': 55.76,
	        '0.025': 59.34,
	        '0.01': 63.69,
	        '0.005': 66.77
	    },
	    '50': {
	        '0.995': 27.99,
	        '0.99': 29.71,
	        '0.975': 32.36,
	        '0.95': 34.76,
	        '0.9': 37.69,
	        '0.5': 49.33,
	        '0.1': 63.17,
	        '0.05': 67.5,
	        '0.025': 71.42,
	        '0.01': 76.15,
	        '0.005': 79.49
	    },
	    '60': {
	        '0.995': 35.53,
	        '0.99': 37.48,
	        '0.975': 40.48,
	        '0.95': 43.19,
	        '0.9': 46.46,
	        '0.5': 59.33,
	        '0.1': 74.4,
	        '0.05': 79.08,
	        '0.025': 83.3,
	        '0.01': 88.38,
	        '0.005': 91.95
	    },
	    '70': {
	        '0.995': 43.28,
	        '0.99': 45.44,
	        '0.975': 48.76,
	        '0.95': 51.74,
	        '0.9': 55.33,
	        '0.5': 69.33,
	        '0.1': 85.53,
	        '0.05': 90.53,
	        '0.025': 95.02,
	        '0.01': 100.42,
	        '0.005': 104.22
	    },
	    '80': {
	        '0.995': 51.17,
	        '0.99': 53.54,
	        '0.975': 57.15,
	        '0.95': 60.39,
	        '0.9': 64.28,
	        '0.5': 79.33,
	        '0.1': 96.58,
	        '0.05': 101.88,
	        '0.025': 106.63,
	        '0.01': 112.33,
	        '0.005': 116.32
	    },
	    '90': {
	        '0.995': 59.2,
	        '0.99': 61.75,
	        '0.975': 65.65,
	        '0.95': 69.13,
	        '0.9': 73.29,
	        '0.5': 89.33,
	        '0.1': 107.57,
	        '0.05': 113.14,
	        '0.025': 118.14,
	        '0.01': 124.12,
	        '0.005': 128.3
	    },
	    '100': {
	        '0.995': 67.33,
	        '0.99': 70.06,
	        '0.975': 74.22,
	        '0.95': 77.93,
	        '0.9': 82.36,
	        '0.5': 99.33,
	        '0.1': 118.5,
	        '0.05': 124.34,
	        '0.025': 129.56,
	        '0.01': 135.81,
	        '0.005': 140.17
	    }
	};
	
	module.exports = chiSquaredTable;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=statistical.js.map