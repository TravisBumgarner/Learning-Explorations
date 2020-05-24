def find_pairs_that_sum(arr, sum):
    start_index = 0
    end_index = len(arr) - 1

    while end_index - start_index >= 1 and end_index > start_index:
        elements_sum = arr[start_index] + arr[end_index]
        if elements_sum == sum:
            return True
        
        if elements_sum > sum:
            end_index -= 1
        else:
            start_index += 1

    return False