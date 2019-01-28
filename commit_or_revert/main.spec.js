const assert = require('assert')

const main = require('./main.js')

describe('fizzbuzz', () => {
    it('should return fizz when given three', () => {
        assert.equal(main.fizzbuzz(3), "fizz")
    })
})