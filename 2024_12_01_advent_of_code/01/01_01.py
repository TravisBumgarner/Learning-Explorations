with open('01_01.txt', 'r') as file:
    data = file.readlines()

left_array = []
right_array = []
for row in data:
    [left, right] = row.split("   ")
    left_array.append(int(left))
    right_array.append(int(right))

left_array.sort()
right_array.sort()

total = 0
for i in range(len(left_array)):
    total += abs(left_array[i] - right_array[i])

print(total)