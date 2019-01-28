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
    ;[2,4,7,8,9, 99].forEach(value => {
        it(`should return ${value} when not divisible by 3, 5, or 15`, () => {
            return assert.equal(main.fizzbuzz(14), "14") 
        })
    })
})

describe('fib', () => {
    [
        [0,0],
        [1,1],
        [2,1],
        [3,2],
        [4,3],
        [5,5],
        [6,8],
        [7,13],
        [8,21],
        [9,34]
    ].forEach(([input, output]) => {
        it(`should return ${output} when given ${input}`, () => {
            assert.equal(main.fib(input), output)
        })
    }) 

})