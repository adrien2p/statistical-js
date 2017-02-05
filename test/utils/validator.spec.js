'use strict';

const assert = require('chai').assert;
const Validator = require('../../src/utils/validator');

describe('Validator', () => {
    let validator;
    before(() => validator = new Validator());
    
    it('should throw if rules check is array and is not', () => {
        let res = null;

        try {
            validator.validate('array', '', ['isArray']);
        } catch (e) {
            res = e.message;
        }

        assert.notEqual(res, null);
        assert.equal(res, 'Parameter array must be an array');
    });

    it('should throw if rules check is number and is not', () => {
        let res = null;

        try {
            validator.validate('number', '', ['isNumber']);
        } catch (e) {
            res = e.message;
        }

        assert.notEqual(res, null);
        assert.equal(res, 'Parameter number must be a number');
    });

    it('should throw if rules check is string and is not', () => {
        let res = null;

        try {
            validator.validate('string', 0, ['isString']);
        } catch (e) {
            res = e.message;
        }

        assert.notEqual(res, null);
        assert.equal(res, 'Parameter string must be a string');
    });

    it('should throw if rules check is function and is not', () => {
        let res = null;

        try {
            validator.validate('function', '', ['isFunction']);
        } catch (e) {
            res = e.message;
        }

        assert.notEqual(res, null);
        assert.equal(res, 'Parameter function must be a function');
    });


    it('should throw if rules check array has length > 0 and havn\'t', () => {
        let res = null;

        try {
            validator.validate('array', [], ['length > 0']);
        } catch (e) {
            res = e.message;
        }

        assert.notEqual(res, null);
        assert.equal(res, 'Parameter array must have more than 0 values');
    });

    it('should throw if rules check value is >= 0 but is not', () => {
        let res = null;

        try {
            validator.validate('value', -1, ['positive']);
        } catch (e) {
            res = e.message;
        }

        assert.notEqual(res, null);
        assert.equal(res, 'Parameter value must be positive');
    });

    it('should throw if rules check value is > 0 but is not', () => {
        let res = null;

        try {
            validator.validate('value', 0, ['strictlyPositive']);
        } catch (e) {
            res = e.message;
        }

        assert.notEqual(res, null);
        assert.equal(res, 'Parameter value must be strictly positive');
    });

    it('should throw if rules check value fall between two numbers, but is not', () => {
        let res = null;

        try {
            validator.validate('value', 3, [[4, 10]]);
        } catch (e) {
            res = e.message;
        }

        assert.notEqual(res, null);
        assert.equal(res, 'Parameter value must fall between 4 and 10');
    });
});