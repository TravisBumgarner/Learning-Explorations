const assert = require('assert')

const main = require('./main.js')

describe('fizzbuzz', () => {
    it('should return fizz when given three', () => {
        assert.equal(main.fizzbuzz(3), "fizz")
    })
    it('should return buzz when given five', () => {
        assert.equal(main.fizzbuzz(5), "buzz")
    })
    it('should return buzz when given fifteen', () => {
        assert.equal(main.fizzbuzz(15), "fizzbuzz")
    })
    it('should return the number when not divisible by 3, 5, or 15', () => {
        assert.equal(main.fizzbuzz(14), "14")
    })
})