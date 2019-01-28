const fizzbuzz = (value) => {
    let output = ""
    if(value % 3 === 0) {
        output += "fizz"
    }
    if(value % 5 === 0){
        output += "buzz"
    }
    if(!output.length){
        output += value
    }
    return output
}

const fib = (value) => {
    if (value === 0 || value === 1){
        return value
    }
    return value
}

module.exports = { fizzbuzz, fib }