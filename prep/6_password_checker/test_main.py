from main import get_edit_distance, validate_is_non_repeating, validate_minimum_and_maximum_length, validate_upper_lower_and_digit

validate_is_non_repeating_tests = [
    ['abc123', True],
    ['aaa', False],
    ['aa', True],
    ['aaaa', False]
]

for [input_password, expected_output] in validate_is_non_repeating_tests:
    actual_output = validate_is_non_repeating(input_password)
    assert actual_output == expected_output, f"Failed on {input_password}, got {actual_output}, expected {expected_output}"
 
validate_minimum_and_maximum_length_tests = [
    ['a' * 3, [False, True]],
    ['a' * 6, [True, True]],
    ['a' * 10, [True, True]],
    ['a' * 20, [True, True]],
    ['a' * 21, [True, False]],
]

for [input_password, expected_output] in validate_minimum_and_maximum_length_tests:
    actual_output = validate_minimum_and_maximum_length(input_password)
    assert actual_output == expected_output, f"Failed on {input_password}, got {actual_output}, expected {expected_output}"
 

validate_upper_lower_and_digit_tests = [
    ['', [False, False, False]],
    ['a', [False, True, False]],
    ['1', [False, False, True]],
    ['A', [True, False, False]],
    ['abc123', [False, True, True]],
    ['Abc123', [True, True, True]],
]

for [input_password, expected_output] in validate_upper_lower_and_digit_tests:
    actual_output = validate_upper_lower_and_digit(input_password)
    assert actual_output == expected_output, f"Failed on {input_password}, got {actual_output}, expected {expected_output}"


edit_distance_test_cases = [
    ['Abc123', 0],
    ['abcde', 0]
]

for [input_password, expected_output] in edit_distance_test_cases:
    actual_output = get_edit_distance(input_password)
    assert actual_output == expected_output, f"Failed on {input_password}, got {actual_output}, expected {expected_output}"
 