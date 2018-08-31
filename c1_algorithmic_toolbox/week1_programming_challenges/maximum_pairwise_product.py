#python3

def mpp(length, numbers):
    length = int(length)
    numbers = [int(x) for x in numbers.split(" ")]

    if length < 2:
        raise(IndexError)

    m = [float("-inf"), float("-inf")]

    for n in numbers:
        if n > m[0]:
            m[1] = m[0]
            m[0] = n
        
        elif n > m[1]:
            m[1] = n

    return m[0] * m[1]

    
if __name__ == "__main__":
    length = input()
    numbers = input()
    print(mpp(length, numbers))
