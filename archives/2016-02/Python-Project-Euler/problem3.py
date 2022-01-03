def findLargestPrime(num):
    factors = []
    dividedBy = 2
    while((num>1) and (dividedBy <= num)):
        if num % dividedBy == 0:
            num = num//dividedBy
            #if dividedBy not in factors:
            factors.append(dividedBy)
            print(dividedBy)
            dividedBy = 2
        else:
            dividedBy += 1
    print(factors)
    print(max(factors))
findLargestPrime(600851475143)
