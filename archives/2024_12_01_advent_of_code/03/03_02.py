import re

def clean_input(input_data):
    DONT = "don't()"
    DO =  "do()"    

    currently_ignoring = False
    remainder = input_data
    filtered_data = "" 

    while True:
        next_dont = remainder.find(DONT) 
        next_do = remainder.find(DO)

        next_dont = next_dont if next_dont != -1 else float('inf')
        next_do = next_do if next_do != -1 else float('inf')

        if next_dont == float('inf') and next_do == float('inf'):
            print('returning')
            if not currently_ignoring:
                filtered_data += remainder
            break

        splitter = DO if next_do < next_dont else DONT

        [left, right] = remainder.split(splitter, 1)

        if not currently_ignoring:
            filtered_data += left
        
        remainder = right
        currently_ignoring = splitter == DONT

    return filtered_data


def multiply(input_data):
    mul_instructions = re.findall(r'mul\(\d+(?:,\d+)*\)', input_data)

    multi_arrays = [instruction.replace("mul(", "").replace(")", "").split(",") for instruction in mul_instructions]

    total = 0
    for multi_array in multi_arrays:
        product = 1
        for value in multi_array:
            product *= int(value)
        total += product
    print(total)


if __name__ == "__main__":
    with open('03_01.txt', 'r') as file:
        input_data = file.read()

    parsed_data = clean_input(input_data)
    multiply(parsed_data)

