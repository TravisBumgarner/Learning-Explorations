def pal_per(input_string):
    input_string = input_string.lower()
    char_dict = {}
    for char in input_string:
        if char not in char_dict and char != " ":
            char_dict[char] = 1
        elif char in char_dict:
            char_dict[char] += 1

    odd_count = 0
    palindrome = True
    for value in char_dict.values():
        if value % 2 != 0:
            odd_count += 1
            if odd_count > 1:
                palindrome = False
                break
    return palindrome


data = [
    ('Tact Coa', True),
    ('jhsabckuj ahjsbckj', True),
    ('Able was I ere I saw Elba', True),
    ('So patient a nurse to nurse a patient so', False),
    ('Random Words', False),
    ('Not a Palindrome', False),
    ('no x in nixon', True),
    ('azAZ', True)]

for test in data:
    print(pal_per(test[0]) == test[1])
