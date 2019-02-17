// Attempt 1: 200
o = ""
for(i=1;i<101;i++){
    o=""
    if(i % 3 === 0) {
        o+="Fizz"
    }
    if(i % 5 === 0){
        o+="Buzz"
    }
    if(!o.length){
        print(i)
    } else {
        print(o)
    }
}

// Attempt 1 Min: 106
o="";for(i=1;i<101;i++){o="";if(i%3==0)o+="Fizz";if(i%5==0)o+="Buzz";if(!o.length)print(i);else{print(o)}}

// Attempt 2: 139
for(i=1;i<101;i++){
    o=""
    if(i % 3 == 0) {
        o+="Fizz"
    }
    if(i % 5 == 0){
        o+="Buzz"
    }
    print(o?o:i) 
}

// Attempt 2 Min: 77
for(i=1;i<101;i++){o="";if(i%3==0)o+="Fizz";if(i%5==0)o+="Buzz";print(o?o:i)}

// Attempt 3: 92
for(i=1;i<101;i++){
    o="";
    o+=i%3?'':'Fizz';
    o+=i%5?'':'Buzz';
    print(o?o:i)
}

// Attempt 3 min: 71`
for(i=1;i<101;i++){o="";o+=i%3?'':'Fizz';o+=i%5?'':'Buzz';print(o?o:i)}

// Attempt 4
for(i=1;i<101;i++){
    print(`${i%3?'':'Fizz'}${i%5?'':'Buzz'}`||i)
}

// Attempt 4 Min: 62
for(i=1;i<101;i++)print(`${i%3?'':'Fizz'}${i%5?'':'Buzz'}`||i)

// Attempt 5: 57
for(i=1;i<101;i++)print((i%3?'':'Fizz')+(i%5?'':'Buzz')||i)

// Attempt 6: 
for(i=1;i<101;)print((++i%3?'':'Fizz')+(i%5?'':'Buzz')||i)

(i%3?'':'Fizz')

// I Cheated, :shrug:
for(i=0;++i<101;)print((i%3?'':'Fizz')+(i%5?'':'Buzz')||i)

x=(a,b,c)=>a%b?'':c;for(i=0;++i<101;)print(x(i,3,'Fizz')+x(i,5,'Buzz')||i)
x=(b,c)=>i%b?'':c;for(i=0;++i<101;)print(x(3,'Fizz')+x(5,'Buzz')||i) // lool what a monstrosity
x=(b,c)=>i%b?'':c+'zz';for(i=0;++i<101;)print(x(3,'Fi')+x(5,'Bu')||i) // lool what a monstrosity
x=(b,c)=>i%b?'':c+'zz';for(i=0;++i<101;)print(x(3,'Fi')+x(5,'Bu')||i) // lool what a monstrosity
x=c+'zz';

for(let i=1;i<=100;i++)console.log({0:i,[i%3]:'Fizz',[i%5]:'Buzz',[i%15]:'Fizzbuzz'}[0])

for(i=0;++i<101;)print(''+[i%3?'':'Fizz',i%5?'':'Buzz']||i) //wrong but interesting

