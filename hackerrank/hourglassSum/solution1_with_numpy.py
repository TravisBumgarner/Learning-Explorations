import numpy as np

hourglass = np.array([
    [1, 1, 1],
    [0, 1, 0],
    [1, 1, 1]
])

arr = np.array([
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1 ,1]
])

max_total = 0
for i in range(1, len(arr) - 1):
    for j in range(1, len(arr[0]) - 1):
        window = arr[i-1:i+2,j-1:j+2]
        window_total = sum(sum(window * hourglass))
        if window_total > max_total:
            max_total = window_total
print(total)