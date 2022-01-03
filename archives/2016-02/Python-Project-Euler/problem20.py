#Find 100!

def fac(n):
    if n == 1:
        return 1
    else:
        return n*fac(n-1)

facSum = 0
for each in str(fac(100)):
    facSum += int(each)
print(facSum)
    
