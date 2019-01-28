const assert = require('assert')

const main = require('./main.js')

describe('fizzbuzz', () => {
    it('should return fizz when given three', () => {
        assert.equal(main.fizzbuzz(3), "fizz")
    })
    it('should return buzz when given five', () => {
        assert.equal(main.fizzbuzz(5), "buzz")
    })
})