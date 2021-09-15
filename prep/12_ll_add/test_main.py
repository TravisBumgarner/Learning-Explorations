from main import naive_solution



test_cases = [
    [[1,1,1], [], [1,1,1]],
    [[2,4,3], [5,6,4], [7,0,8]],
    [[9,9,9,9,9,9,9], [9,9,9,9], [8,9,9,9,0,0,0,1]]
]

for a, b, expected_output in test_cases:
    actual_output = naive_solution(a, b)
    assert actual_output == expected_output, 'Inputs: {a}, {b} Expected: {expected_output} Actual {actual_output}'