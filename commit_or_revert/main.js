const fizzbuzz = (value) => {
    let output = ""
    if(value === 3) {
        output += "fizz"
    } else if(value === 5){
        output += "buzz"
    }
    return output
}

module.exports = { fizzbuzz }