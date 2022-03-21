import sys

padding = sys.argv[1]
pointer = sys.argv[2].replace('0x', '')

output = []

for i in range(0,len(pointer), 2):
    output.insert(0, pointer[i:i+2])
    function_pointer = "\\x" + "\\x".join(output)
print(padding + function_pointer)