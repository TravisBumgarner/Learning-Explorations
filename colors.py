def make_neighbors(arr, row, col):
    output = []
    inside_top = row  > 0
    inside_bottom = row + 1< len(arr)
    inside_left = col > 0
    inside_right = col + 1< len(arr[0])

    if inside_top:
        output.append((row - 1, col))
    if inside_bottom:
        output.append((row + 1, col))
    if inside_left:
        output.append((row, col - 1))
    if inside_right:
        output.append((row, col + 1))
    return output
    
    return [
        (row-1, col-1),
        (row-1, col+1),
        (row+1, col-1),
        (row+1, col+1)
    ]

def find_matching_neighbors(arr, start_row, start_col):
    checked_neighbors = set([])
    matched_neighbors = set([])
    value_to_match = arr[start_row][start_col]

    neighbors_to_check = set(make_neighbors(arr, start_row, start_col))

    while len(neighbors_to_check) > 0:
        row, col = neighbors_to_check.pop()
        checked_neighbors.add((row,col))
        if arr[row][col] == value_to_match:
            matched_neighbors.add((row,col))
            potential_neighbors_to_check = set(make_neighbors(arr,row,col))
            neighbors_to_check.update(potential_neighbors_to_check - checked_neighbors)
    
    return matched_neighbors


def find_max_color_and_count(arr):
    max_color = None
    max_count = -1

    seen_points = set([])
    for row, row_values in enumerate(arr):
        for col, cell_value in enumerate(row_values):            
            if (row, col) in seen_points:
                continue   
            seen_points.add((row,col))    
            
            matched_neighbors = find_matching_neighbors(arr, row, col)
            
            seen_points.update(matched_neighbors)
            
            if len(matched_neighbors) > max_count:
                max_color = arr[row][col]
                max_count = len(matched_neighbors)
    
    return (max_color, max_count)


x = [
    [1,2,3,1,2,3],
    [3,3,3,3,3,1],
    [2,1,2,2,3,3],
]


print(find_max_color_and_count(x), 3, 8)