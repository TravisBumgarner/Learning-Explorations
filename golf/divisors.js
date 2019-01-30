// A number is a divisor of another number if it can divide into it with no remainder.

// Print the positive divisors of each number from 1 to 100 inclusive, on their own line, 
// with each divisor separated by a space.

// Attempt 1: 205 Char
let i=1
while(i <= 100){
    let matches = []
    for(let j = 1; j <= i; j++){
        if (i % j === 0) {
            matches.push(j)
        }
    }
    print(matches.join(' '))
    matches = []
    i++
}

// Attempt 2: 150 Char

Array.from({length:100},(v,k)=>k+1).map(n=> {
    Array.from({length:n},(v,k)=>k+1).map(d=> {
        if(!(n % d)){write(d + ' ')}
    })
  print()
})

// Attempt 2 Minified: 123 Char

Array.from({length:100},(v,k)=>k+1).map(n=>{Array.from({length:n},(v,k)=>k+1).map(d=>{if(!(n%d)){write(d+' ')}});print()})

