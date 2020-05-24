import random

def swap_indices(arr, index_1, index_2):
    arr[index_1], arr[index_2] = arr[index_2], arr[index_1]

def quicksort(arr):
    if len(arr) <= 1:
        return arr

    if len(arr) == 2:
        if arr[0] > arr[1]:
            swap_indices(arr, 0, 1)
        return arr 

    last_index = len(arr) - 1

    pivot_index = 0
    
    left_index = 1
    right_index = last_index

    while left_index < right_index:
        swap_left = arr[pivot_index] < arr[left_index]
        swap_right = arr[pivot_index] > arr[right_index]
        
        if swap_left and swap_right:
            swap_indices(arr, right_index, left_index)
            left_index += 1
            right_index -= 1
        elif swap_left:
            right_index -= 1
        elif swap_right:
            left_index += 1
        else:
            left_index += 1
            right_index -= 1

        left_index = left_index + 1 if left_index == pivot_index else left_index
        right_index = right_index - 1 if right_index == pivot_index else right_index
    left_sub_array = arr[1:left_index + 1]
    right_sub_array = arr[left_index + 1:]

    return_val = [
        *quicksort(left_sub_array),
        arr[pivot_index],
        *quicksort(right_sub_array)
    ]
    return return_val

print(quicksort([5,4,3,2,1]), [1,2,3,4,5])
print(quicksort([1,2,3,4,5]), [1,2,3,4,5])
print(quicksort([4,3,2,1,5,6]), [1,2,3,4,5,6])
print(quicksort([2,2,3,3,1,1]), [1,1,2,2,3,3])





