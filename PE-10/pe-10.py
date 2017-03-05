def find_primes_sum(n):
    #primes_list = [2] # By skipping 2, we can make an int_list that only contains odd numbers
    primes_sum = 2
    int_set = {i for i in range(3,n+1,2)}
    i = 3
    while(len(int_set) > 0):
        #print(int_set)
        if i in int_set:
            #primes_list.append(i)
            primes_sum += i
            multiplier = 1
            int_set.discard(i * multiplier)
            while i * multiplier < n:
                int_set.discard(i * multiplier)
                multiplier += 1
        i += 1

    return primes_sum

print(find_primes_sum(2000000))


