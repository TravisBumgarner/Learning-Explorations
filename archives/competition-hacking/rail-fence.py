def encrypt_rail_fence(input_str, height):
    y = 0
    increment_by = 1
    output = [['.'] * len(input_str) for _ in range(height)]
    for x in range (0, len(input_str)):
        output[y][x] = input_str[x]
        y += increment_by
        if y + 1 == height:
            increment_by = -1
        elif y - 1 == -1:
            increment_by = + 1
    
    for row in output:
        print(row)

    encryption = ""

    for row in output:
        for cell in row:
            if cell != '.':
                encryption += cell
    return encryption

encryption = encrypt_rail_fence('123456', 3)

print(encryption)


def decrypt_rail_fence(input_str, height):
    output = [['.'] * len(input_str) for _ in range(height)]