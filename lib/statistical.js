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
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _hook = __webpack_require__(2);
	
	var _hook2 = _interopRequireDefault(_hook);
	
	var _cacheManager = __webpack_require__(3);
	
	var _cacheManager2 = _interopRequireDefault(_cacheManager);
	
	var _validator = __webpack_require__(4);
	
	var _validator2 = _interopRequireDefault(_validator);
	
	var _statistical = __webpack_require__(5);
	
	var _statistical2 = _interopRequireDefault(_statistical);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Statistical = function () {
	    function Statistical() {
	        _classCallCheck(this, Statistical);
	
	        this._validator = new _validator2.default();
	        this._settings = {
	            cache: {
	                enabled: true,
	                rootElementCount: 10,
	                subElementCount: 30
	            }
	        };
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
	            this._settings = {
	                cache: {
	                    enabled: options.cache.enabled,
	                    rootElementCount: options.cache.rootElementCount || this._settings.cache.rootElementCount,
	                    subElementCount: options.cache.subElementCount || this._settings.cache.subElementCount
	                }
	            };
	            _cacheManager2.default.settings = this._settings.cache;
	        }
	    }, {
	        key: 'methods',
	        get: function get() {
	            return _hook2.default.cache(new _statistical2.default(), _cacheManager2.default);
	        }
	    }]);
	
	    return Statistical;
	}();
	
	var statistical = new Statistical();
	exports.default = statistical;
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Hook = function () {
	    function Hook() {
	        _classCallCheck(this, Hook);
	    }
	
	    /**
	     * Create a proxy to wrap a class method and intercept each call.
	     *
	     * @param {object} target
	     * @param {object} cacheManager
	     */
	
	
	    _createClass(Hook, [{
	        key: 'cache',
	        value: function cache(target, cacheManager) {
	            return new Proxy(target, {
	                get: function get(target, property) {
	                    if (property in target && typeof target[property] === 'function') {
	                        return function () {
	                            var res = void 0;
	                            if (cacheManager.settings.enabled) {
	                                var cache = cacheManager.find(property, arguments.length <= 0 ? undefined : arguments[0]);
	                                if (cache) return cache.result;
	
	                                res = target[property].apply(target, arguments);
	                                cacheManager.update(property, { dataSet: arguments.length <= 0 ? undefined : arguments[0], result: res });
	                            } else {
	                                res = target[property].apply(target, arguments);
	                            }
	
	                            return res;
	                        };
	                    } else {
	                        return Reflect.get(target, property);
	                    }
	                }
	            });
	        }
	    }]);
	
	    return Hook;
	}();
	
	var hook = new Hook();
	exports.default = hook;
	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _validator = __webpack_require__(4);
	
	var _validator2 = _interopRequireDefault(_validator);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var CacheManager = function () {
	    function CacheManager() {
	        _classCallCheck(this, CacheManager);
	
	        this._validator = new _validator2.default();
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
	            this._settings = {
	                enabled: options.enabled,
	                rootElementCount: options.rootElementCount || this._settings.rootElementCount,
	                subElementCount: options.subElementCount || this._settings.subElementCount
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
	
	var cacheManager = new CacheManager();
	exports.default = cacheManager;
	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
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
	            if (typeof value === 'undefined') throw new Error('Missing parameter ' + parameterName);
	
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
	                    case 'length =':
	                        if (value[0].length !== value[1].length) throw new Error('Parameter ' + parameterName + ' must have the same number of values');
	                        break;
	                    default:
	                        if (Array.isArray(r)) {
	                            var hasOnlyNumbers = !r.map(function (v) {
	                                return typeof v === 'number';
	                            }).includes(false);
	                            if (hasOnlyNumbers) {
	                                if (r.length === 2) {
	                                    if (value < r[0] || value > r[1]) throw new Error('Parameter ' + parameterName + ' must fall between ' + r[0] + ' and ' + r[1]);
	                                }
	                            }
	                        } else {
	                            throw new Error('Rule not implemented : ' + r);
	                        }
	                }
	            });
	        }
	    }]);
	
	    return Validator;
	}();
	
	exports.default = Validator;
	module.exports = exports['default'];

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _validator = __webpack_require__(4);
	
	var _validator2 = _interopRequireDefault(_validator);
	
	var _epsilon = __webpack_require__(6);
	
	var _epsilon2 = _interopRequireDefault(_epsilon);
	
	var _chiSquaredTable = __webpack_require__(7);
	
	var _chiSquaredTable2 = _interopRequireDefault(_chiSquaredTable);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var StatisticalMethod = function () {
	    function StatisticalMethod() {
	        _classCallCheck(this, StatisticalMethod);
	
	        this._validator = new _validator2.default();
	        this._chiSquaredProbTable = _chiSquaredTable2.default;
	        this._epsilon = _epsilon2.default;
	    }
	
	    /**
	     * Return table of chi squared prob.
	     *
	     * @returns {*}
	     */
	
	
	    _createClass(StatisticalMethod, [{
	        key: 'min',
	
	
	        /**
	         * Return the smallest value of the sample.
	         *
	         * @param {Array} sample
	         * @returns {Number}
	         */
	        value: function min(sample) {
	            this._validator.validate('sample', sample, ['isArray', 'length > 0']);
	            return sample.sort(function (a, b) {
	                return a - b;
	            })[0];
	        }
	
	        /**
	         * Return the biggest value of the sample.
	         *
	         * @param {Array} sample
	         * @returns {Number}
	         */
	
	    }, {
	        key: 'max',
	        value: function max(sample) {
	            this._validator.validate('sample', sample, ['isArray', 'length > 0']);
	            return sample.sort(function (a, b) {
	                return a + b;
	            })[0];
	        }
	
	        /**
	         * The [Sum](https://en.wikipedia.org/wiki/Sum).
	         *
	         * @param sample
	         * @returns {*}
	         */
	
	    }, {
	        key: 'sum',
	        value: function sum(sample) {
	            this._validator.validate('sample', sample, ['isArray', 'length > 0']);
	            return sample.reduce(function (accumulator, current) {
	                return accumulator + current;
	            }, 0);
	        }
	
	        /**
	         * The [Median](https://en.wikipedia.org/wiki/Median).
	         *
	         * @param {Array} sample
	         * @returns {Number}
	         */
	
	    }, {
	        key: 'median',
	        value: function median(sample) {
	            this._validator.validate('sample', sample, ['isArray', 'length > 0']);
	
	            var middle = Math.floor(sample.length / 2);
	            var isEven = sample.length % 2 === 0;
	
	            sample = sample.sort(function (a, b) {
	                return a - b;
	            });
	
	            return isEven ? (sample[middle - 1] + sample[middle]) / 2 : sample[middle];
	        }
	
	        /**
	         * The [Mode](https://en.wikipedia.org/wiki/Mode).
	         *
	         * @param {Array} sample
	         * @returns {*}
	         */
	
	    }, {
	        key: 'mode',
	        value: function mode(sample) {
	            this._validator.validate('sample', sample, ['isArray', 'length > 0']);
	
	            var counter = {};
	            var mode = [];
	            var max = 0;
	
	            sample.map(function (value, index) {
	                if (!(sample[index] in counter)) counter[sample[index]] = 0;
	
	                counter[sample[index]]++;
	
	                if (counter[sample[index]] === max) mode.push(sample[index]);
	                if (counter[sample[index]] > max) {
	                    max = counter[sample[index]];
	                    mode = [sample[index]];
	                }
	            });
	
	            return mode.length > 1 ? mode : mode[0];
	        }
	
	        /**
	         * The [Mean](https://en.wikipedia.org/wiki/Mean).
	         *
	         * @param {Array} sample
	         * @returns {Number}
	         */
	
	    }, {
	        key: 'mean',
	        value: function mean(sample) {
	            this._validator.validate('sample', sample, ['isArray', 'length > 0']);
	
	            return this.sum(sample) / sample.length;
	        }
	
	        /**
	         * The [Variance](https://en.wikipedia.org/wiki/Variance).
	         *
	         * @param {Array} sample
	         * @returns {Number}
	         */
	
	    }, {
	        key: 'variance',
	        value: function variance(sample) {
	            this._validator.validate('sample', sample, ['isArray', 'length > 0']);
	
	            var avg = this.mean(sample);
	            var n = sample.length;
	
	            return this.sum(sample.map(function (value) {
	                return Math.pow(value - avg, 2);
	            })) / n;
	        }
	
	        /**
	         * The [Standard Deviation](https://en.wikipedia.org/wiki/Standard_deviation).
	         *
	         * @param {Array} sample
	         * @returns {Number}
	         */
	
	    }, {
	        key: 'stdDeviation',
	        value: function stdDeviation(sample) {
	            this._validator.validate('sample', sample, ['isArray', 'length > 0']);
	            return Math.sqrt(this.variance(sample));
	        }
	
	        /**
	         * The [Quantile](http://en.wikipedia.org/wiki/Quantile).
	         *
	         * @param {Array} sample
	         * @param {Number} index
	         * @returns {Array}
	         */
	
	    }, {
	        key: 'quantile',
	        value: function quantile(sample, index) {
	            this._validator.validate('sample', sample, ['isArray', 'length > 0']);
	            this._validator.validate('index', index, ['isNumber', [0, 1]]);
	
	            var sortedSample = sample.sort(function (a, b) {
	                return a - b;
	            });
	
	            return sortedSample[Math.ceil(sample.length * index - 1)];
	        }
	
	        /**
	         * The [Percentile](https://en.wikipedia.org/wiki/Percentile).
	         *
	         * @param {Array} sample
	         * @param {Number} index
	         * @returns {Array}
	         */
	
	    }, {
	        key: 'percentile',
	        value: function percentile(sample, index) {
	            this._validator.validate('sample', sample, ['isArray', 'length > 0']);
	            this._validator.validate('index', index, ['isNumber', [0, 100]]);
	
	            var sortedSample = sample.sort(function (a, b) {
	                return a - b;
	            });
	            return sortedSample[Math.ceil(index / 100 * sample.length)];
	        }
	
	        /**
	         * Return the entire result of descriptives statistics above.
	         *
	         * @param {Array} sample
	         * @returns {{min: number, max: number, sum: *, median: number, mode: *, mean: number, variance: number, stdDeviation: number, quantile: Array}}
	         */
	
	    }, {
	        key: 'summary',
	        value: function summary(sample) {
	            this._validator.validate('sample', sample, ['isArray', 'length > 0']);
	
	            return {
	                min: this.min(sample),
	                max: this.max(sample),
	                sum: this.sum(sample),
	                median: this.median(sample),
	                mode: this.mode(sample),
	                mean: this.mean(sample),
	                variance: this.variance(sample),
	                stdDeviation: this.stdDeviation(sample),
	                quantile: {
	                    q1: this.quantile(sample, 0.25),
	                    q3: this.quantile(sample, 0.75)
	                }
	            };
	        }
	
	        /**
	         * The [Factorial](https://en.wikipedia.org/wiki/Factorial).
	         *
	         * @param {Number} n
	         * @returns {Number}
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
	         * @param {Array} sample
	         * @returns {Number}
	         */
	
	    }, {
	        key: 'geometricMean',
	        value: function geometricMean(sample) {
	            this._validator.validate('sample', sample, ['isArray', 'length > 0']);
	            return Math.pow(sample.reduce(function (accumulator, current) {
	                return accumulator * current;
	            }, 1), 1 / sample.length);
	        }
	
	        /**
	         * The [Harmonic Mean](https://en.wikipedia.org/wiki/Harmonic_mean).
	         *
	         * @param {Array} sample
	         * @returns {Number}
	         */
	
	    }, {
	        key: 'harmonicMean',
	        value: function harmonicMean(sample) {
	            this._validator.validate('sample', sample, ['isArray', 'length > 0']);
	            return sample.length / sample.reduce(function (accumulator, current) {
	                return accumulator + 1 / current;
	            }, 0);
	        }
	
	        /**
	         * The [Interquartile range](http://en.wikipedia.org/wiki/Interquartile_range)
	         *
	         * @param sample
	         * @returns {Number}
	         */
	
	    }, {
	        key: 'interQuartileRange',
	        value: function interQuartileRange(sample) {
	            this._validator.validate('sample', sample, ['isArray', 'length > 0']);
	            return this.quantile(sample, 0.75) - this.quantile(sample, 0.25);
	        }
	
	        /**
	         * The [Variance](https://en.wikipedia.org/wiki/Harmonic_mean).
	         * The [Biais](https://fr.wikipedia.org/wiki/Estimateur_(statistique)#Biais).
	         *
	         * Non biased variance
	         *
	         * @param {Array} sample
	         * @returns {Number}
	         */
	
	    }, {
	        key: 'sampleVariance',
	        value: function sampleVariance(sample) {
	            this._validator.validate('sample', sample, ['isArray', 'length > 0']);
	
	            var avg = this.mean(sample);
	            var n = sample.length - 1;
	
	            return this.sum(sample.map(function (value) {
	                return Math.pow(value - avg, 2);
	            })) / n;
	        }
	
	        /**
	         * The [Standard Deviation](https://en.wikipedia.org/wiki/Standard_deviation).
	         * The [Biais](https://fr.wikipedia.org/wiki/Estimateur_(statistique)#Biais).
	         *
	         * Non biased std deviation
	         *
	         * @param {Array} sample
	         * @returns {Number}
	         */
	
	    }, {
	        key: 'sampleStdDeviation',
	        value: function sampleStdDeviation(sample) {
	            this._validator.validate('sample', sample, ['isArray', 'length > 0']);
	            return Math.sqrt(this.sampleVariance(sample));
	        }
	
	        /**
	         * The [Sample covariance](https://en.wikipedia.org/wiki/Sample_mean_and_sampleCovariance) of two datasets:
	         *
	         * @param {Array} sample1
	         * @param {Array} sample2
	         * @returns {number}
	         */
	
	    }, {
	        key: 'covariance',
	        value: function covariance(sample1, sample2) {
	            this._validator.validate('sample1', sample1, ['isArray', 'length > 0']);
	            this._validator.validate('sample2', sample2, ['isArray', 'length > 0']);
	            this._validator.validate('sample1 and sample2', [sample1, sample2], ['length =']);
	
	            var meanX = this.mean(sample1);
	            var meanY = this.mean(sample2);
	
	            var numerator = sample1.reduce(function (accumulator, current, i) {
	                accumulator += (current - meanX) * (sample2[i] - meanY);
	                return accumulator;
	            }, 0);
	
	            var besselsCorrection = sample1.length - 1;
	
	            return numerator / besselsCorrection;
	        }
	
	        /**
	         * The [Binomial Distribution](http://en.wikipedia.org/wiki/Binomial_distribution).
	         *
	         * @param {Number} trials
	         * @param {Number} probability
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
	         * @param {Number} p
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
	         * @param {Number} lambda
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
	         * @param {Array} sample
	         * @param {Function} distributionType
	         * @param {Number} significance
	         * @returns {boolean}
	         *
	         * @exemple
	         * chiSquaredGoodnessOfFit(sample, 'poisson', 0.05)); //= false
	         */
	
	    }, {
	        key: 'chiSquaredGoodnessOfFit',
	        value: function chiSquaredGoodnessOfFit(sample, distributionType, significance) {
	            this._validator.validate('sample', sample, ['isArray', 'length > 0']);
	            this._validator.validate('distributionType', distributionType, ['isFunction']);
	            this._validator.validate('significance', significance, ['isNumber', 'positive']);
	
	            /* Generate an array with number of ocurences for each data in sample. */
	            var observedFrequencies = [];
	            observedFrequencies = sample.reduce(function (accumulator, val) {
	                if (accumulator[val] === undefined) accumulator[val] = 0;
	                accumulator[val] += 1;
	                return accumulator;
	            }, []).filter(function (v) {
	                return v !== undefined;
	            });
	
	            /* Number of hypothesized distribution parameters estimated, expected to be supplied in the distribution test. */
	            /* Lose one degree of freedom for estimating `lambda` from the sample data. */
	            var sampleMean = this.mean(sample);
	
	            /* The hypothesized distribution. Generate the hypothesized distribution. */
	            var hypothesizedDistribution = distributionType(sampleMean);
	
	            /* Create an array holding a histogram of expected data given the */
	            /* sample size and hypothesized distribution. */
	            var expectedFrequencies = [];
	            expectedFrequencies = Object.entries(hypothesizedDistribution).reduce(function (accumulator, current, i) {
	                if (observedFrequencies[i]) accumulator[i] = current[1] * sample.length;
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
	         * @param {Array} sample
	         * @param {Number} mu
	         * @returns {Number}
	         */
	
	    }, {
	        key: 'tTestOneSample',
	        value: function tTestOneSample(sample, mu) {
	            this._validator.validate('sample', sample, ['isArray', 'length > 0']);
	            this._validator.validate('mu', mu, ['isNumber']);
	
	            var mean = this.mean(sample);
	            var sd = this.stdDeviation(sample);
	            var sqrtSampleSize = Math.sqrt(sample.length);
	
	            /* t-value */
	            return (mean - mu) / (sd / sqrtSampleSize);
	        }
	
	        /**
	         * The [two sample t-test](http://en.wikipedia.org/wiki/Student's_t-test).
	         *
	         * @param {Array} sample1
	         * @param {Array} sample2
	         * @returns {Number}
	         */
	
	    }, {
	        key: 'tTestTwoSample',
	        value: function tTestTwoSample(sample1, sample2) {
	            this._validator.validate('sample1', sample1, ['isArray', 'length > 0']);
	            this._validator.validate('sample2', sample2, ['isArray', 'length > 0']);
	
	            var n = sample1.length;
	            var m = sample2.length;
	            var meanX = this.mean(sample1);
	            var meanY = this.mean(sample2);
	            var sampleVarianceX = this.sampleVariance(sample1);
	            var sampleVarianceY = this.sampleVariance(sample2);
	
	            var weightedVariance = ((n - 1) * sampleVarianceX + (m - 1) * sampleVarianceY) / (n + m - 2);
	
	            /* t-value */
	            return (meanX - meanY) / Math.sqrt(weightedVariance * (1 / (n + 1) / m));
	        }
	
	        /**
	         * [Simple linear regression](http://en.wikipedia.org/wiki/Simple_linear_regression)
	         *
	         * @param {Array<Array<Number>>} data
	         * @returns {*}
	         */
	
	    }, {
	        key: 'linearRegression',
	        value: function linearRegression(data) {
	            this._validator.validate('data', data, ['isArray']);
	
	            var dataLength = data.length;
	
	            /* 1 element, the result will be a slope to 0 and an intersect ot the second coordinate elements */
	            if (dataLength === 1) return { slope: slope, intersect: data[0][1] };
	
	            /* Compute all sum, and finally the slope and intersect */
	            var sumX = 0,
	                sumY = 0,
	                sumXX = 0,
	                sumXY = 0;
	
	            data.forEach(function (element) {
	                sumX += element[0];
	                sumY += element[1];
	
	                sumXX += Math.pow(element[0], 2);
	                sumXY += element[0] * element[1];
	            });
	
	            var slope = (dataLength * sumXY - sumX * sumY) / (dataLength * sumXX - sumX * sumX);
	            var intersect = sumY / dataLength - slope * sumX / dataLength;
	
	            // Return both values as an object.
	            return { slope: slope, intersect: intersect };
	        }
	    }, {
	        key: 'chiSquaredProbTable',
	        get: function get() {
	            return this._chiSquaredProbTable;
	        }
	    }]);
	
	    return StatisticalMethod;
	}();
	
	exports.default = StatisticalMethod;
	module.exports = exports['default'];

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
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
	exports.default = epsilon;
	module.exports = exports['default'];

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * The [χ2 (Chi-Squared) Distribution](http://en.wikipedia.org/wiki/Chi-squared_distribution)
	 *
	 * @type {*}
	 */
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
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
	
	exports.default = chiSquaredTable;
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;
//# sourceMappingURL=statistical.js.map