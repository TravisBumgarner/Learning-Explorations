#python3

# Takeaways - 

def mpp(length, user_inputs):
    length = int(length)
    inputs = [int(x) for x in user_inputs.split(" ")]

    if length < 2:
        raise(IndexError)

    max_vals = [float("-inf"), float("-inf")]

    for number in inputs:
        print(max_vals)
        if number > max_vals[0]:
            max_vals.insert(0, number)
            max_vals.pop()
            
        elif number > max_vals[1]:
            max_vals.insert(1,number)
            max_vals.pop()
        
    return max_vals[0] * max_vals[1]

    
if __name__ == "__main__":
    length = input()
    numbers = input()
    print(mpp(length, numbers))
