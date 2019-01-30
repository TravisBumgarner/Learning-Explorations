//An emirp (prime spelled backwards) is a prime number that results in a different prime when its decimal digits are reversed. For example both 13 and 31 are emirps.
// Print all the emirp numbers from 1 to 1000 inclusive, each on their own line.


// Attempt 1: 197
y = n => ![...Array(n).keys()].slice(2).map(i => !(n%i)).includes(true) && ![0,1].includes(n)
for(i=10;i<1001;i++){
  	x=+(i+'').split('').reverse().join('')
    y(x) && y(i) && i!=x  && print(i)
}

// Attempt 1: Minified 173
y=n=>![...Array(n).keys()].slice(2).map(i=>!(n%i)).includes(true)&&![0,1].includes(n);for(i=10;i<1001;i++){x=+(i+'').split('').reverse().join('');y(x)&&y(i)&&i!=x&&print(i)}

// Attempt 2: 153

y=n=>{for(z=2;z<n;z++)if(!(n%z))return 0;return 1}
for(i=10;i<1001;i++){
  	x=+(i+'').split('').reverse().join('')
    y(x) && y(i) && i!=x && print(i)
}


// Attempt 2 Minified 139:

y=n=>{for(z=2;z<n;z++)if(!(n%z))return 0;return 1};for(i=10;i<1001;i++){x=+(i+'').split('').reverse().join('');y(x)&&y(i)&&i!=x&&print(i)}

// Attempt 3:

primes=[]
for(i=10;i<1001;i++){
    a = 1
    for(j=2;j<i;j++){
        if(!(i%j)) a=0
    }
    a && primes.push(i)
}

for(k=10;k<1001;k++){
  	reversed=+(k+'').split('').reverse().join('')
    primes.includes(k) && primes.includes(reversed) && reversed!=k && print(k)
}

// Attempt 3 Minified and bad :( 181:

b=[];for(i=10;i<1001;i++){a=1;for(j=2;j<i;j++){if(!(i%j))a=0}a&&b.push(i)};for(k=10;k<1001;k++){c=+(k+'').split('').reverse().join('');b.includes(k)&&b.includes(c)&&c!=k&&print(k)}