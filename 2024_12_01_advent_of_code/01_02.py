with open('01_01.txt', 'r') as file:
    data = file.readlines()

left_array = []
right_dict = {}
for row in data:
    [left, right] = row.split("   ")
    left_array.append(int(left))

    if int(right) in right_dict:
        right_dict[int(right)] += 1
    else:
        right_dict[int(right)] = 1

total = 0
for number in left_array:
    if number in right_dict:
        total += right_dict[number] * number

print(total)
