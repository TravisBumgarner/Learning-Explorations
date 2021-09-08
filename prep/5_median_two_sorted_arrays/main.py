# https://wiki.python.org/moin/TimeComplexity Big O of lists

from collections import deque

def find_median_sorted_arrays(a,b):
    max_length = 2 if (len(a) + len(b)) % 2 == 0 else 1
    median_queue = deque(maxlen=max_length)

    a_index = 0
    b_index = 0
    mid_point = (len(a) + len(b)) // 2

    while (a_index + b_index) <= mid_point:
        a_value = None
        b_value = None

        if a_index < len(a):
            a_value = a[a_index]

        if b_index < len(b):
            b_value = b[b_index]

        if a_value is not None and b_value is not None:
            if a_value < b_value or a_value == b_value:
                a_index += 1
                median_queue.append(a_value)
            elif a_value > b_value:
                b_index += 1
                median_queue.append(b_value)
        elif a_value is not None:
            a_index += 1
            median_queue.append(a_value)
        elif b_value is not None:
            b_index += 1
            median_queue.append(b_value)
        else:
            raise LookupError("This case is impossible.")
    return sum(median_queue) / len(median_queue)
               








