import string



coded_message = 'rgnoDVD{O0NU_WQ3_G1G3O3T3_A1AH3S_e481bf5f}'

key = 'CYLAB'
print('hi')
def decode(coded_message, key):
    ALPHABET = list(string.ascii_lowercase)
    key_vals = [ALPHABET.index(k.lower()) for k in list(key)]
    output = ''
    index = 0
    for char in coded_message:
        if char.lower() not in ALPHABET:
            output += char.lower()
        else:
            output += ALPHABET[ALPHABET.index(char.lower()) - key_vals[index % len(key_vals)]]
            index += 1
    print(output)

decode(coded_message, key)