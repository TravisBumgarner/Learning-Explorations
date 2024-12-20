def is_row_valid(row):
    is_increasing = row[1] > row[0]

    result = [row[i + 1] - row[i] for i in range(len(row) - 1)]

    for value in result:
        if is_increasing and value < 0:
            return False
        if not is_increasing and value > 0:
            return False
        if abs(value) < 1 or abs(value) > 3:
            return False
    return True



with open('02_01.txt', 'r') as file:
    data = file.readlines()

valid_reports = 0
for row in data:
    row = [int(x) for x in row.split()]
    if is_row_valid(row):
        valid_reports += 1

print(valid_reports)