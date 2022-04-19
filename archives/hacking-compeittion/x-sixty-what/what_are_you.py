import sys

pointer = sys.argv[1].replace('0x', '')

output = ''

for i in range(0,len(pointer), 2):
    output += chr(int('0x' + pointer[i:i+2], 16))

print(output)


