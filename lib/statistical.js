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

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var interceptor = __webpack_require__(1);
	var cacheManager = __webpack_require__(2);
	var StatisticalBase = __webpack_require__(3);
	var StatisticalDistribution = __webpack_require__(4);
	
	var Statistical = function () {
	    function Statistical() {
	        _classCallCheck(this, Statistical);
	
	        this._settings = {
	            cache: {
	                enabled: true,
	                rootElementCount: 10,
	                subElementCount: 30
	            }
	        };
	        this._base = interceptor.cacheBefore(new StatisticalBase(), cacheManager, []);
	        this._distribution = interceptor.cacheBefore(new StatisticalDistribution(), cacheManager, []);
	    }
	
	    /**
	     * Return _base object to provide basic statistics methods
	     *
	     * @returns {*}
	     */
	
	
	    _createClass(Statistical, [{
	        key: 'base',
	        get: function get() {
	            return this._base;
	        }
	
	        /**
	         * Return _distribution object to provide distribution statistics methods
	         *
	         * @returns {*}
	         */
	
	    }, {
	        key: 'distribution',
	        get: function get() {
	            return this._distribution;
	        }
	
	        /**
	         * Return settings used in statistical class.
	         *
	         * @returns {*}
	         */
	
	    }, {
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
	            if (Number.isNaN(options.cache.rootElementCount)) throw new Error('rootElementCount must be a number (Statistical:settings');
	            if (Number.isNaN(options.cache.subElementCount)) throw new Error('subElementCount must be a number (Statistical:settings');
	
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
	}();
	
	module.exports = new Statistical();

/***/ },
/* 1 */
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
	     * @param {Array} propertyExcluded
	     */
	
	
	    _createClass(Interceptor, [{
	        key: 'cacheBefore',
	        value: function cacheBefore(object, cacheManager) {
	            return new Proxy(object, {
	                get: function get(target, propKey) {
	                    if (propKey in target) {
	                        return function () {
	                            var res = void 0;
	                            if (!cacheManager.settings.enabled) {
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
/* 2 */
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
	     * Return CacheManager settings
	     *
	     * @returns {{maxLength: number}|*}
	     */
	
	
	    _createClass(CacheManager, [{
	        key: 'update',
	
	
	        /**
	         * Update the cache saved with new results
	         *
	         * @param method
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
	         * Find an existing dataSet in the cache and return it
	         *
	         * @param {String} method
	         * @param {Array} dataSet
	         * @returns {Object}
	         * @private
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
	         * Update existing settings to manage cache
	         *
	         * @param {*} options
	         */
	        set: function set(options) {
	            if (!options) throw new Error('Missing parameter options (CacheManager:settings');
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
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var StatisticalBase = function () {
	    function StatisticalBase() {
	        _classCallCheck(this, StatisticalBase);
	
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
	        this._epsilon = 0.0001;
	    }
	
	    /**
	     * Return the smallest value of the dataSet.
	     *
	     * @param {Array} dataSet
	     * @returns {number}
	     */
	
	
	    _createClass(StatisticalBase, [{
	        key: 'min',
	        value: function min(dataSet) {
	            if (!dataSet) throw new Error('Missing parameter dataSet (Statistical.base:min).');
	            if (!Array.isArray(dataSet)) throw new Error('dataSet must be an array (Statistical.base:min).');
	
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
	            if (!dataSet) throw new Error('Missing parameter dataSet (Statistical.base:max).');
	            if (!Array.isArray(dataSet)) throw new Error('dataSet must be an array (Statistical.base:max).');
	
	            return dataSet.sort(function (a, b) {
	                return a + b;
	            })[0];
	        }
	
	        /**
	         * Take array and return sum of each elements.
	         *
	         * @param dataSet
	         * @returns {*}
	         */
	
	    }, {
	        key: 'sum',
	        value: function sum(dataSet) {
	            return dataSet.reduce(function (res, val) {
	                if (Number.isNaN(val)) throw new Error('dataSet must contain only numbers (Statistical.base:sum).');
	                return res + val;
	            }, 0);
	        }
	
	        /**
	         * Compute median for dataSet, the central value.
	         *
	         * @param {Array} dataSet
	         * @returns {number}
	         */
	
	    }, {
	        key: 'median',
	        value: function median(dataSet) {
	            if (!dataSet) throw new Error('Missing parameter dataSet (Statistical.base:median).');
	            if (!Array.isArray(dataSet)) throw new Error('dataSet must be an array (Statistical.base:median).');
	
	            var middle = Math.floor(dataSet.length / 2);
	            var isEven = dataSet.length % 2 === 0;
	
	            dataSet = dataSet.sort(function (a, b) {
	                return a - b;
	            });
	
	            return isEven ? (dataSet[middle - 1] + dataSet[middle]) / 2 : dataSet[middle];
	        }
	
	        /**
	         * Get the value wit the miximum occurence.
	         *
	         * @param {Array} dataSet
	         * @returns {*}
	         */
	
	    }, {
	        key: 'mode',
	        value: function mode(dataSet) {
	            if (!dataSet) throw new Error('Missing parameter dataSet (Statistical.base:mode).');
	            if (!Array.isArray(dataSet)) throw new Error('dataSet must be an array (Statistical.base:mode).');
	
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
	         * Compute mean for dataSet.
	         *
	         * @param {Array} dataSet
	         * @returns {number}
	         */
	
	    }, {
	        key: 'mean',
	        value: function mean(dataSet) {
	            if (!dataSet) throw new Error('Missing parameter dataSet (Statistical.base:mean).');
	            if (!Array.isArray(dataSet)) throw new Error('dataSet must be an array (Statistical.base:mean).');
	
	            return this.sum(dataSet) / dataSet.length;
	        }
	
	        /**
	         * Compute variance for dataSet.
	         *
	         * @param {Array} dataSet
	         * @returns {number}
	         */
	
	    }, {
	        key: 'variance',
	        value: function variance(dataSet) {
	            if (!dataSet) throw new Error('Missing parameter dataSet (Statistical.base:variance).');
	            if (!Array.isArray(dataSet)) throw new Error('dataSet must be an array (Statistical.base:variance).');
	
	            var avg = this.mean(dataSet);
	            var n = dataSet.length;
	
	            return this.sum(dataSet.map(function (value) {
	                return Math.pow(value - avg, 2);
	            })) / n;
	        }
	
	        /**
	         * Compute standard deviation for dataSet.
	         *
	         * @param {Array} dataSet
	         * @returns {number}
	         */
	
	    }, {
	        key: 'stdDeviation',
	        value: function stdDeviation(dataSet) {
	            if (!dataSet) throw new Error('Missing parameter dataSet (Statistical.base:stdDeviation).');
	            if (!Array.isArray(dataSet)) throw new Error('dataSet must be an array (Statistical.base:stdDeviation).');
	
	            return Math.sqrt(this.variance(dataSet));
	        }
	
	        /**
	         * Provided the quantile asked by the index given, if no index given, return all quantile of the dataSet.
	         *
	         * @param {Array} dataSet
	         * @param {number} index
	         * @returns {Array}
	         */
	
	    }, {
	        key: 'quantile',
	        value: function quantile(dataSet) {
	            var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
	
	            if (!dataSet) throw new Error('Missing parameter dataSet (Statistical.base:quantile).');
	            if (index && (Number.isNaN(index) || index < 0 || index > 4)) throw new Error('index must be a number and between 1 - 4 (Statistical.base:quantile).');
	
	            dataSet = dataSet.sort(function (a, b) {
	                return a - b;
	            });
	            return !index ? [1, 2, 3, 4].map(function (i) {
	                return dataSet[Math.ceil(dataSet.length * (i / 4)) - 1];
	            }) : dataSet[Math.ceil(dataSet.length * (index / 4) - 1)];
	        }
	
	        /**
	         * Provided the percentile asked by the index given, if no index given, return all percentile of the dataSet.
	         *
	         * @param {Array} dataSet
	         * @param {number} index
	         * @returns {Array}
	         */
	
	    }, {
	        key: 'percentile',
	        value: function percentile(dataSet) {
	            var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
	
	            if (!dataSet) throw new Error('Missing parameter dataSet (Statistical.base:percentile).');
	            if (index && (Number.isNaN(index) || index < 0 || index > 100)) throw new Error('index must be a number and between 1 - 100 (Statistical.base:percentile)');
	
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
	         * Return the entire result of descriptives statistics above
	         *
	         * @param {Array} dataSet
	         * @returns {{min: number, max: number, sum: *, median: number, mode: *, mean: number, variance: number, stdDeviation: number, quantile: Array}}
	         */
	
	    }, {
	        key: 'summary',
	        value: function summary(dataSet) {
	            if (!dataSet) throw new Error('Missing parameter dataSet (Statistical.base:summary).');
	            if (!Array.isArray(dataSet)) throw new Error('dataSet must be an array (Statistical.base:summary).');
	
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
	         * Return factorial of n (each number multiply the previous)
	         *
	         * @param {number} n
	         * @returns {number}
	         */
	
	    }, {
	        key: 'factorial',
	        value: function factorial(n) {
	            if (Number.isNaN(n)) throw new Error('Missing parameter n and must be a number (Statistical.base:factorial).');
	            if (n < 0) throw new Error('n must be positive');
	
	            var factorialResult = 1;
	            for (var i = 2; i <= n; i++) {
	                factorialResult *= i;
	            }
	
	            return factorialResult;
	        }
	    }]);
	
	    return StatisticalBase;
	}();
	
	module.exports = StatisticalBase;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var StatisticalBase = __webpack_require__(3);
	
	var StatisticalDistribution = function (_StatisticalBase) {
	    _inherits(StatisticalDistribution, _StatisticalBase);
	
	    function StatisticalDistribution() {
	        _classCallCheck(this, StatisticalDistribution);
	
	        return _possibleConstructorReturn(this, (StatisticalDistribution.__proto__ || Object.getPrototypeOf(StatisticalDistribution)).call(this));
	    }
	
	    /**
	     * The [Binomial Distribution](http://en.wikipedia.org/wiki/Binomial_distribution)
	     *
	     * @param {number} trials number of trials to simulate
	     * @param {number} probability
	     * @returns {Object} output
	     */
	
	
	    _createClass(StatisticalDistribution, [{
	        key: 'binomial',
	        value: function binomial(trials, probability) {
	            if (!trials) throw new Error('Missing parameter trials (Statistical.distribution:binomial).');
	            if (!probability) throw new Error('Missing parameter probability (Statistical.distribution:binomial).');
	            if (probability < 0 || probability > 1 || trials <= 1) {
	                throw new Error('probability must fall between 0 - 1 and trials gretter than 1');
	            }
	
	            var x = 0;
	            var cells = {};
	            var cumulativeProbability = 0;
	
	            do {
	                cells[x] = this.factorial(trials) / (this.factorial(x) * this.factorial(trials - x)) * (Math.pow(probability, x) * Math.pow(1 - probability, trials - x));
	                cumulativeProbability += cells[x];
	                x++;
	            } while (cumulativeProbability < 1 - this._epsilon);
	
	            return cells;
	        }
	    }]);
	
	    return StatisticalDistribution;
	}(StatisticalBase);
	
	module.exports = StatisticalDistribution;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=statistical.js.map