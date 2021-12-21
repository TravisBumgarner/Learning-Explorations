const fizzy = (n) => {
    if (n % 15 == 0) {
        console.log('FizzBuzz')
    } else if (n % 3 == 0) {
        console.log('Fizz')
    } else if (n % 5 == 0) {
        console.log('Buzz')
    } else {
        console.log(n)
    }
}

fizzy(1)
fizzy(3)
fizzy(5)
fizzy(15)
