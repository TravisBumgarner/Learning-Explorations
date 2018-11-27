# Uses python3

from datetime import datetime

# Solution Provided
def calc_fib(n, which_side='root'):
    print(n, which_side)
    if (n <= 1):
        return n

    return calc_fib(n - 1, 'left') + calc_fib(n - 2, 'right')

# Semi Optimization
def calc_fib_semi_optimized(n, previous_calculations={0:0, 1:1}):
    existing_calculation = previous_calculations.get(n, None)
    if (existing_calculation is not None):
        return existing_calculation

    else:
        new_calculation = calc_fib_semi_optimized(n - 1, previous_calculations) + calc_fib_semi_optimized(n - 2, previous_calculations)
        previous_calculations[n] = new_calculation
        return new_calculation

if __name__ == "__main__":
    n = int(input())

    start = datetime.now()
    print(calc_fib_semi_optimized(n))
    end = datetime.now()
    print(end-start)

    start = datetime.now()
    print(calc_fib(n))
    end = datetime.now()
    print(end-start)

