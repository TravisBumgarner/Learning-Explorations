# Open the file in read mode
with open('day1_a.txt', 'r') as file:
    # Read all lines from the file into a list
    file_contents = [line.strip() for line in file.readlines()]

total = 0
for index, line in enumerate(file_contents):
    numeric_list = [item for item in line if item.isdigit()]
    numeric_value = int(numeric_list[0] + numeric_list[-1])
    total += numeric_value
print(total)