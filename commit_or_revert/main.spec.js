const assert = require('assert')

const main = require('./main.js')

describe('sum', () => {
    it('should return 3 when given 1 and 2', () => {
        assert.equal(main.sum(1,2), 3)
    })
})