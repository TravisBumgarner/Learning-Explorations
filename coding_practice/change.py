import math

def permutate(arr): 
    if len(arr) <= 1: 
        return [arr] 

    permutations = []

    for i in range(len(arr)):
        sub_permutations = permutate([*arr[0:i], *arr[i+1:]])
        for sub_permutation in sub_permutations:
            permutations.append([arr[i], *sub_permutation])
    return permutations




def make_change(cents):
    returned_coins = math.inf
    to_permutate = [value for value in [1, 2, 5, 10, 25, 50, 100, 200] if cents >= value]
    print(to_permutate)
    for permutation in permutate(to_permutate):
        permutation_returned_coins = 0
        permutation_cents = cents
        for coin in permutation:
            while permutation_cents >= coin:
                permutation_cents -= coin
                permutation_returned_coins += 1
        if permutation_returned_coins < returned_coins and permutation_cents == 0:
            returned_coins = permutation_returned_coins
    return returned_coins

# Tests

assert make_change(200) ==  1