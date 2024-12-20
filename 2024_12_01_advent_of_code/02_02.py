def is_row_valid(row):
    is_valid = True
    result = [row[i + 1] - row[i] for i in range(len(row) - 1)]

    acceptable_negative_count = len([x for x in result if x < 0 and abs(x) <= 3])
    acceptable_positive_count = len([x for x in result if x > 0 and abs(x) <= 3])

    max_acceptable_count = max(acceptable_negative_count, acceptable_positive_count)

    if len(result) - max_acceptable_count > 1:
        is_valid = False

    return is_valid



with open('02_01.txt', 'r') as file:
    data = file.readlines()
 
valid_reports = 0
for row in data:
    row = [int(x) for x in row.split()]
    if is_row_valid(row):
        valid_reports += 1

print(valid_reports)
# Rate limit ahhhh. Guess of 442 is too low. 496 is my next guess but need to wait.