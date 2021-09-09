"""
Problem:
- Calculate edit distance from bad to good password given the following rules. Return 0 if no edits need to be made. 

Rules
- 6 char min, 20 char max, 
- one lowercase letter, at least one uppercase letter, and at least one digit.
- can't contain three repeating characters in a row

Operations:
- Insert
- Delete
- Replace


Constraints:
1 <= password.length <= 50
password consists of letters, digits, dot '.' or exclamation mark '!'.

Thoughts
- Need some way to decide which operation is best
- Inserting characters is probably the easiest
    - Could just do something where you pluck a random character from a set that isn't the previous character and append
"""

import string

LOWER_ALPHABET_SET = set([char for char in string.ascii_lowercase])
UPPER_ALPHABET_SET = set([char for char in string.ascii_uppercase])
DIGITS_SET = set([char for char in string.digits])


def validate_is_non_repeating(password):
    counter = 1
    previous_char = ""
    for char in password:
        if char == previous_char:
            counter += 1
            if counter == 3:
                return False
        else:
            previous_char = char
            counter = 1
    return True


def validate_upper_lower_and_digit(password):
    password_chars = set([char for char in password])
    return [
        len(UPPER_ALPHABET_SET.intersection(password_chars)) > 0,
        len(LOWER_ALPHABET_SET.intersection(password_chars)) > 0,
        len(DIGITS_SET.intersection(password_chars)) > 0
    ]


def validate_minimum_and_maximum_length(password):
    return [
        len(password) >= 6,
        len(password) <= 20,
    ]


def get_edit_distance(password):
    edit_distance = 0

    while True:
        has_upper, has_lower, has_digit = validate_upper_lower_and_digit(password)
        meets_maximum, meets_minimum = validate_minimum_and_maximum_length(password)
        is_non_repeating = validate_is_non_repeating(password)

        if all([has_upper, has_lower, has_digit, meets_maximum, meets_minimum, is_non_repeating]):
            return edit_distance
    




'''
abcde -> abcdef
aaa -> aaba -> aabba -> aabbac 

If too short
    - won't delete
    - will add characters to breakup any repetitions
If too long
    - Won't add
    - will remove characters to breakup any repetitions
'''