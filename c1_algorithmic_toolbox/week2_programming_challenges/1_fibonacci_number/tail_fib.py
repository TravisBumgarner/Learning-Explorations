def helper(a, b, n):
    if n < 2:
        return b
    else:
        return helper(b, a+b, n-1)
def fib_rec(n):
    return helper(0,1,n) 


fib_rec(1000)