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

// Attempt 3: 131 Char
f=n=>Array.from({length:n},(v,k)=>k+1);f(100).map(n=> {
    f(n).map(d=> {
        if(!(n % d)){write(d + ' ')}
    })
  print()
})

// Attempt 3 Minified: 105
f=n=>Array.from({length:n},(v,k)=>k+1);f(100).map(n=> {f(n).map(d=>{if(!(n%d)){write(d+' ')}});print()})

// Attempt 4: 78
for(n=1;n<=100;n++){
    for(d=1;d<=n;d++){!(n%d)&&write(d+" ")}
    print()
}

// Attempt 4 Minified: 67
for(n=1;n<=100;n++){for(d=1;d<=n;d++){!(n%d)&&write(d+" ")}print()}
for(n=1;n<=100;n++){for(d=1;d<=n;d++){n%d||write(d+" ")}print()}
for(n=1;n<=100;n++){for(d=1;d<=n;d++)n%d||write(d+" ");print()}
for(n=1;n<101;n++){for(d=1;d<=n;d++)n%d||write(d+" ");print()}

