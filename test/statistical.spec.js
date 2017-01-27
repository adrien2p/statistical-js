const assert = require('chai').assert;
const statistical = require('../src/statistical');

describe('Statistical', function () {
    describe('should compute sum', () => {
        it('of an array of numbers', () => {
            const res = statistical.sum([1, 2, 3]);

            assert.equal(res, 6);
        });
    });

    describe('should compute average', () => {
        it('of an array of numbers', () => {
            const data = {set1: [1, 2, 3]};
            const res = statistical.average(data);

            assert.equal(res, 2);
        });

        it('of multiple array of numbers', () => {
            const data = {
                set1: [1, 2, 3],
                set2: [1, 3, 5],
            };
            const res = statistical.average(data);

            assert.equal(Array.isArray(res), true);
            assert.sameMembers(res, [2, 3]);
        });
    });

    describe('should compute variance', () => {
        it('of an array of numbers', () => {
            const data = {set1: [1, 2, 3]};
            /* Trunc result and keep two decimals without rounded to keep period */
            const res = Math.trunc(statistical.variance(data) * 100) / 100;

            assert.equal(res, 0.66);
        });

        it('of multiple array of numbers', () => {
            const data = {
                set1: [1, 2, 3],
                set2: [1, 3, 5]
            };
            /* Trunc result and keep two decimals without rounded to keep period */
            const res = statistical.variance(data).map(v => Math.trunc(v * 100) / 100);

            assert.equal(Array.isArray(res), true);
            assert.sameMembers(res.map(v => Math.trunc(v * 100) / 100), [0.66, 2.66]);
        });
    });

    describe('should compute standard deviation', () => {
        it('of an array of numbers', () => {
            const data = {set1: [1, 2, 3]};
            /* Trunc result and keep two decimals without rounded to keep period */
            const res = Math.trunc(statistical.stdDeviation(data) * 100) / 100;

            assert.equal(res, 0.81);
        });

        it('of multiple array of numbers', () => {
            const data = {
                set1: [1, 2, 3],
                set2: [1, 3, 5]
            };
            /* Trunc result and keep two decimals without rounded to keep period */
            const res = statistical.stdDeviation(data).map(v => Math.trunc(v * 100) / 100);

            assert.equal(Array.isArray(res), true);
            assert.sameMembers(res.map(v => Math.trunc(v * 100) / 100), [0.81, 1.63]);
        });
    });
});