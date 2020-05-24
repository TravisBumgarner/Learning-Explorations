def fizz_buzz(number):
  output = ''

  if number % 3 == 0:
    output += 'fizz'

  if number % 5 == 0:
    output += 'buzz'

  if len(output) == 0:
    output = str(number)

  return output

[print(fizz_buzz(i)) for i in range(101)]