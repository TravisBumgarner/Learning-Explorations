def merge(arr1, arr2):
    output = []

    i1 = 0
    i2 = 0
    while True:
        if i1 == len(arr1) or i2 == len(arr2):
            output.extend([*arr1[i1:], *arr2[i2:]])
            break
        if arr1[i1] <= arr2[i2]:
            output.append(arr1[i1])
            i1 += 1
        else:
            output.append(arr2[i2])
            i2 += 1
    
    return output

def merge_sort(arr):
    if len(arr) == 1:
        return arr

    mid_point = len(arr) // 2

    return merge(
        merge_sort(arr[0:mid_point]),
        merge_sort(arr[mid_point:])
    )

print(merge_sort([5,4,3,2,1]), [1,2,3,4,5], '\n', sep='\n')
print(merge_sort([5,4,2,3,2,1,1,1]), [1,1,1,2,2,3,4,5], '\n', sep='\n')
print(merge_sort([1,1,1]), [1,1,1], '\n', sep='\n')
print(merge_sort([1]), [1], '\n', sep='\n')
print(merge_sort([5,4,3,2,1]), [1,2,3,4,5], '\n', sep='\n')