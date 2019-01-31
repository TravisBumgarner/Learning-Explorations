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