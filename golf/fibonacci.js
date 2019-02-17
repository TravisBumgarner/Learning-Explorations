// Attempt 1
function fibonacci(num) {
    if (num <= 1) return num;
  
    return fibonacci(num - 1) + fibonacci(num - 2);
  }

for(i=0;i<31;i++){
    print(fibonacci(i))
}

// Attempt 1 min 54
f=n=>n<2?n:(f(n-1)+f(n-2));for(i=0;++i<31;)print(f(i))
