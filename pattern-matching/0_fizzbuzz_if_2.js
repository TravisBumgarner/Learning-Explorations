const fizzy_javascript = (n) => {
    if (n % 15 == 0) console.log('FizzBuzz')
    else if (n % 3 == 0) console.log('Fizz')
    else if (n % 5 == 0) console.log('Buzz')
    else console.log(n)
}

let fizzy_fsharp num =     
   match num % 3, num % 5 with      
      | 0,0 -> "fizzbuzz"
      | 0,_ -> "fizz"
      | _,0 -> "buzz"
      | _,_ -> num.ToString()


const fizzy_javascript_pattern_matching_stage0 = (n) => {
    match(n) {
        when (n % 15 == 0) console.log('FizzBuzz')
        when (n % 3 == 0) console.log('Fizz')
        when (n % 5 == 0) console.log('Buzz')
        else console.log(n)
    }
}


fizzy(1)
fizzy(3)
fizzy(5)
fizzy(15)
