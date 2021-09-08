from main import find_median_sorted_arrays

find_median_sorted_arrays_tests = [
    [[1], [], 1],
    [[], [1], 1],
    [[1], [2, 3], 2],
    [[1,2], [1], 1.0],
    [[1,2,3], [1,2], 2],
    [[1,2,3], [], 2],
    [[1], [2,3,4], 2.5],
    [[0,0], [0,0], 0]
]

for [input_a, input_b, expected_output] in find_median_sorted_arrays_tests:
    actual_output = find_median_sorted_arrays(input_a, input_b)
    assert actual_output  == expected_output, f"Failed on {input_a} and {input_b}, got {actual_output}, expected {expected_output}"
