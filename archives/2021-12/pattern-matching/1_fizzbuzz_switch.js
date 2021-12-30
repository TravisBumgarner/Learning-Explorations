const fizzy = (n) => {
    switch (true) {
        case n % 5 === 0 && n % 3 === 0:
            console.log('FizzBuzz')
            break
        case n % 3 === 0:
            console.log('Fizz')
            break
        case n % 5 === 0:
            console.log('Buzz')
            break
        default:
            console.log(n)
            break
    }
}

fizzy(1)
fizzy(3)
fizzy(5)
fizzy(15)
