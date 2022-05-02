def fizz_buzz(i):
    output = ''
    if i % 3 == 0:
        output += 'fizz'
    if i % 5 == 0:
        output += 'buzz'
    if len(output) == 0:
        output = i
    return i

for i in range (0, 20):
    print(fizz_buzz(i))