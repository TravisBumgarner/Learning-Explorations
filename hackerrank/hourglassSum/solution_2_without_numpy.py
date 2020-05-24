arr = [
    [-1, -1, 0, -9, -2, -2],
    [-2, -1, -6, -8, -2, -5],
    [-1, -1, -1, -2, -3, -4],
    [-1, -9, -2, -4, -4, -5],
    [-7, -3, -3, -2, -9, -9],
    [-1, -3, -1, -2, -4, -5]
]

def get_window(arr, start_x, start_y):
    window = []
    for y in range(start_y, start_y + 3):
        row = []
        for x in range(start_x, start_x + 3):
            row.append(arr[y][x])
        window.append(row)
    return window
    

def get_hourglass_sum(window):
    hourglass = [
        [1, 1, 1],
        [0, 1, 0],
        [1, 1, 1]
    ]
    sum = 0
    for y in range(len(window)):
        for x in range(len(window[0])):
            sum += window[y][x] * hourglass[y][x]
    return sum

def hourglassSum(arr):
    max_sum = float("-inf")

    for y in range(0, len(arr) - 2):
        for x in range(0, len(arr[0]) - 2):
            window = get_window(arr, x, y)
            window_sum = get_hourglass_sum(window)
            if window_sum > max_sum:
                max_sum = window_sum
    return max_sum

print(hourglassSum(arr))
