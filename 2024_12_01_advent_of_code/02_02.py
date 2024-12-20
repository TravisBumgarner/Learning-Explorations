def check_row_validity(row):
    result = [row[i + 1] - row[i] for i in range(len(row) - 1)]

    acceptable_negative_count = len([x for x in result if x < 0 and abs(x) <= 3])
    acceptable_positive_count = len([x for x in result if x > 0 and abs(x) <= 3])

    return acceptable_negative_count == len(result) or acceptable_positive_count == len(result)

def is_any_subarray_valid(row: list[int]) -> bool:
    for i in range(len(row)):
        sub_array = row.copy()
        sub_array.pop(i)
        if check_row_validity(sub_array):
            return True
    return False

def is_full_array_valid(row):
   if check_row_validity(row):
       return True
   return False


with open('02_01.txt', 'r') as file:
    data = file.readlines()
 
valid_reports = 0
for row in data:
    row = [int(x) for x in row.split()]
    if is_full_array_valid(row):
        valid_reports += 1
    elif is_any_subarray_valid(row):
        valid_reports += 1

print(valid_reports)
# Rate limit ahhhh. Guess of 442 is too low. 496 is my next guess but need to wait.