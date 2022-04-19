encrypted_message = 'heTfl g as iicpCTo{7F4NRP051N5_16_35P3X51N3_VCDE4CE4}7'


decoded_message = ''

print(len(encrypted_message))

for i in range(0, len(encrypted_message), 3):
    decoded_message += encrypted_message[i + 2]
    decoded_message += encrypted_message[i + 0]
    decoded_message += encrypted_message[i + 1]
    print(decoded_message)