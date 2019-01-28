const fizzbuzz = (value) => {
    let output = ""
    if(value % 3 === 0) {
        output += "fizz"
    }
    if(value % 5 === 0){
        output += "buzz"
    }
    return output
}

module.exports = { fizzbuzz }