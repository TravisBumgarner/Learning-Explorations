import re

with open('03_01.txt', 'r') as file:
    input_data = file.read()
 
# Find all mul instructions
# find opening and closing parens. 
# validate what's in the parens
# calculate. 

mul_instructions = re.findall(r'mul\(\d+(?:,\d+)*\)', input_data)


multi_arrays = [instruction.replace("mul(", "").replace(")", "").split(",") for instruction in mul_instructions]

total = 0
for multi_array in multi_arrays:
    product = 1
    for value in multi_array:
        product *= int(value)
    total += product
print(total)