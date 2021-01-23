
// Reduce

x.reduce((accumulator, currentValue) => {
    // do things
    return accumulator
}, {})

// Sort

/*
    compareFunction(a, b) returns
        < 0 -> a comes before b
        = 0 -> no change
        > 0 -> b comes before a
*/

// Set

const y = new Set([1,2,3])
y.has(2) // true
y.delete(2)
y.add(2)
 
