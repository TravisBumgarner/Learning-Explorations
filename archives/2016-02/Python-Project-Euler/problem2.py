array = [1,2]
def genFib(array):
    array.append(array[-1] + array[-2])
    return array
while array[-1] < 4000000:
    genFib(array)
sum = 0
for each in array:
    if each % 2 ==0:
        sum += each
print(sum)
