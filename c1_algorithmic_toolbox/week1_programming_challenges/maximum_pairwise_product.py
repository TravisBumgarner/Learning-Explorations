#python3

import time
import random

from .utilities.timeit import timeit

@timeit
def mpp(length, user_inputs):
    length = int(length)
    inputs = [int(x) for x in user_inputs.split(" ")]

    if length < 2:
        raise(IndexError)

    max_vals = [float("-inf"), float("-inf")]

    for number in inputs:
        if number > max_vals[0]:
            max_vals.insert(0, number)
            max_vals.pop()
            
        elif number > max_vals[1]:
            max_vals.insert(1,number)
            max_vals.pop()
        
    return max_vals[0] * max_vals[1]

@timeit
def mpp_sorted(length, user_inputs):
    length = int(length)
    inputs = [int(x) for x in user_inputs.split(" ")]

    if length < 2:
        raise(IndexError)

    sorted_inputs = sorted(inputs, reverse=True)

    return sorted_inputs[0] * sorted_inputs[1]


if __name__ == "__main__":
    # length = input()
    # numbers = input()
    for i in range(1,10):
        test_count = 10**i
        numbers = str(sorted([int(random.random() * test_count) for i in range(0, test_count)], reverse=True)).replace(',','').replace('[', '').replace(']', '')
        length = len(numbers)

        print('test_count is {} - reverse sorted'.format(test_count))        

        mpp(length, numbers)

        mpp_sorted(length, numbers)
