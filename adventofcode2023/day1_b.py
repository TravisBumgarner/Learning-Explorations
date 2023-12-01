# this isn't my solution but I know I'm going to give up if I have to come back to this problem and it's not calculating correctl.y.
# wont submit it

lines = open('in.txt').read().splitlines()

def left(row: str):
    return min(((row+x).find(x), conv(x)) for x in nums)[1]

def right(row: str):
    return max((row.rfind(x), conv(x)) for x in nums)[1]

def conv(x):
    return str(nums.index(x) + 1) if len(x) > 1 else x

nums = '123456789'
print('p1', sum(int(left(line) + right(line)) for line in lines))

nums = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'] + list('0123456789')
print('p2', sum(int(left(line) + right(line)) for line in lines))
