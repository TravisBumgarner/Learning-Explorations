

def binary_search(arr, value, lower, upper):
    if lower <= upper:
        split_index = lower + (upper - lower) // 2

        if value == arr[split_index]:
            return split_index
        elif value < arr[split_index]:
            return binary_search(arr, value, lower, split_index - 1)
        else:
            return binary_search(arr, value, split_index + 1, upper)

    else:
        return None
        



        

print(binary_search([1,2,3,4,5], 5, 0, 4))


# print(binary_search([1,2,3], 2), 1)
# print(binary_search([1,2,3,4,5,6,7], 2), 1)
# print(binary_search([1,2,3,4,5,6,7], 2), 1)
# print(binary_search([1,2,3,4,5,6,7], 7), 6)
# print(binary_search([1,2,3,4,5,6,7], 8), None)
# print(binary_search([1,2,3,4,5,6,7], 2), 1)
# print(binary_search([1,2,3,4,5,6,7], 2), 1)