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
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Statistical = function () {
	    function Statistical() {
	        _classCallCheck(this, Statistical);
	    }
	
	    /**
	     * Take array and return sum of each elements
	     *
	     * @param {Array} set
	     * @returns {*}
	     */
	
	
	    _createClass(Statistical, [{
	        key: 'sum',
	        value: function sum(set) {
	            return set.reduce(function (a, b) {
	                if (Number.isNaN(a) || Number.isNaN(b)) throw new Error('Set of data must contain only numbers');
	                return a + b;
	            }, 0);
	        }
	
	        /**
	         * Compute average for each set of data provided in the object parameter
	         *
	         * @param {object} sets
	         * @returns {*}
	         */
	
	    }, {
	        key: 'average',
	        value: function average(sets) {
	            var _this = this;
	
	            if (!sets) throw new Error('Missing parameter sets (average)');
	
	            var avg = [];
	            Object.values(sets).forEach(function (set) {
	                if (!Array.isArray(set)) throw new Error('Set of data must be an array');
	                avg.push(_this.sum(set) / set.length);
	            });
	
	            if (avg.length === 1) return avg[0];
	            return avg;
	        }
	
	        /**
	         * Compute variance for each set of data provided in the object parameter
	         *
	         * @param {object} sets
	         * @returns {*}
	         */
	
	    }, {
	        key: 'variance',
	        value: function variance(sets) {
	            var _this2 = this;
	
	            if (!sets) throw new Error('Missing parameter sets (variance)');
	
	            var avg = Object.keys(sets).length > 1 ? this.average(sets) : [this.average(sets)];
	            var n = Object.values(sets).map(function (set) {
	                return set.length;
	            });
	            var v = [];
	
	            Object.values(sets).forEach(function (set, i) {
	                if (!Array.isArray(set)) throw new Error('Set of data must be an array');
	                v.push(_this2.sum(set.map(function (value) {
	                    return Math.pow(value - avg[i], 2);
	                })) / n[i]);
	            });
	
	            if (v.length === 1) return v[0];
	            return v;
	        }
	    }]);
	
	    return Statistical;
	}();
	
	exports.default = Statistical;
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;
//# sourceMappingURL=statistical.js.map