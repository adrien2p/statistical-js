'use strict';

class Validator {
    constructor() {}

    /**
     * Valid a value with rules given, if the rules are not respected throw an error.
     *
     * @param {string} parameterName
     * @param {*} value
     * @param {Array} ruless
     */
    validate(parameterName, value, rules) {
        rules.map(r => {
            switch (r) {
                case 'isArray':
                    if (!Array.isArray(value)) throw new Error(`Parameter ${parameterName} must be an array`);
                    break;
                case 'isNumber':
                    if (typeof value !== 'number') throw new Error(`Parameter ${parameterName} must be a number`);
                    break;
                case 'isString':
                    if (typeof value !== 'string') throw new Error(`Parameter ${parameterName} must be a string`);
                    break;
                case 'isFunction':
                    if (typeof value !== 'function') throw new Error(`Parameter ${parameterName} must be a function`);
                    break;
                case 'length > 0':
                    if (value.length === 0) throw new Error(`Parameter ${parameterName} must have more than 0 values`);
                    break;
                case 'positive':
                    if (value < 0) throw new Error(`Parameter ${parameterName} must be positive`);
                    break;
                case 'strictlyPositive':
                    if (value <= 0) throw new Error(`Parameter ${parameterName} must be strictly positive`);
                    break;
                default:
                    if (Array.isArray(r)) {
                        const hasOnlyNumbers = !(r.map(v => !isNaN(v)).includes(false));
                        if (hasOnlyNumbers) {
                            if (r.length === 2) {
                                if (value < r[0] || value > r[1]) throw new Error(`Parameter ${parameterName} must fall between ${r[0]} and ${r[1]}`);
                            }
                        }
                    } else {
                        throw new Error('Method not implemented : ' + r);
                    }
            }
        });
    }
}

module.exports = new Validator();
