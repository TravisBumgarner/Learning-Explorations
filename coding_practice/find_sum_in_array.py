# Find sum in array

# Assumptions
# arr: []ints 
# -inf < arr[i] <inf
# Not always found
# More than one?

# Code
def find_sum_in_array(arr, value):
    numbers_to_pair = set([])

    for number in arr:
        if number in numbers_to_pair:
            return True
        else:
            numbers_to_pair.add(value - number)
    return False

# Tests
assert find_sum_in_array([1,1,3], 2) == True
assert find_sum_in_array([2], 2) == False
assert find_sum_in_array([-2, 5, 1], -1) == True
assert find_sum_in_array([2, 2], 4) == True