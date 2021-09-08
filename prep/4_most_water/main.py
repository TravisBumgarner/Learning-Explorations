"""
Problem:
- Plot points from an array where for item i, x_i is the index, and y_i is the array value
- Draw a rectangle in this chart such that the area is maximized

Thoughts:
Brute force worse O(n^2) and done by comparing every entry to every entry
"""

def brute_force(inputs):
    max_area = 0
    for i_index, i in enumerate(inputs):
        for j_index, j in enumerate(inputs[i:]):
            if i_index == j_index:
                continue
            
            width = abs(j_index - i_index)
            height = min(i, j)

            area = width * height

            if area > max_area:
                max_area = area
    return max_area
        
"""
Better than brute_force

Thoughts
- rectangles could be wide and short or tall and skinny or wide and tall

"""