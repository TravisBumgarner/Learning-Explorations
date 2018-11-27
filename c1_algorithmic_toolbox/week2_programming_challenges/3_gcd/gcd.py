# Uses python3
import sys
# from datetime import datetime


# def gcd_naive(a, b):
#     current_gcd = 1
#     for d in range(2, min(a, b) + 1):
#         if a % d == 0 and b % d == 0:
#             if d > current_gcd:
#                 print(current_gcd)
#                 current_gcd = d

#     return current_gcd


def gcd_optimized(a, b):
    min_val, max_val = sorted([a, b])

    if max_val % min_val == 0:
        return min_val

    else:
        for i in range(round(min_val/2), 0, -1):
            if max_val % i == 0 and min_val % i == 0:
                return i


def gcd_optimized_2(a, b):
    gcd = 1
    min_val, max_val = sorted([a, b])

    # There is a special case where if the min_val is going to be the answer and it'd be fastest to check for that first.
    # For example:
    # [10,20] => gcd is 10.
    if max_val % min_val == 0:
        gcd = min_val

     # Two observations went into this else statement.
    else:
        # 1. Given the special condition above is already accounted for, no other divisor will be greater than n / 2
        # 10 => 1,2,5,10 (excluding 10; 1 2 and 5 are less than or equal to 10/2 )
        # 100 => 1,2,4,5,10,25,50,100
        max_iterable_val = round(min_val/2)
        i = 1
        # 2. While iterating towards max_iterable_val, each time a divisor is found, the other divisor sets the new max for remaining divisors.
        # For example, for 100,
        # We start with a max_iterable_val of 100/2, or 50.
        # For 2, 2*50 is 100 so the max remains 50.
        # For 4, 4*25 is 100 so the new max is 25.
        # For 5, 5*20 is 100 so the new max is 20.
        # for 10, 10*10 is 100, so the new max is 10.
        # And we're done.
        while i < max_iterable_val:
            if max_val % i == 0 and min_val % i == 0:
                gcd = i
                max_iterable_val = min_val // i
                if max_val % max_iterable_val == 0 and min_val % max_iterable_val == 0:
                    gcd = max_iterable_val
                    break
            i += 1

    return gcd


if __name__ == "__main__":
    input = sys.stdin.read()
    a, b = map(int, input.split())

    # start = datetime.now()
    # print(gcd_optimized(a, b))
    # end = datetime.now()
    # print(end - start)

    # start = datetime.now()
    print(gcd_optimized_2(a, b))
    # end = datetime.now()
    # print(end - start)
