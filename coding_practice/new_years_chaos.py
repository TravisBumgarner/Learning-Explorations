def minimumBribes(q):
    bribes = {}
    swaps_found = True
    
    while swaps_found:
        swaps_found = False
        j = 0
        while j < len(q) - 1:
            briber = q[j]
            bribee = q[j + 1]
            if briber > bribee:
                q[j], q[j + 1] = bribee, briber
                bribes[briber] = bribes.get(briber, 0) + 1
                swaps_found = True
            j += 1
    bribe_values = bribes.values() if len(bribes.values()) > 0 else [0]
    return sum(bribe_values) if max(bribe_values) < 3 else "Too Chaotic"

# print(minimumBribes([1,3,2])



def minimumBribes2(q):

    bribes = [value - index - 1 for index, value in enumerate(q) if value - index - 1 > 0]
    print(sum(bribes) if max(bribes) < 3 else "Too chaotic")


minimumBribes2([1, 2, 5, 3, 7, 8, 6, 4])

[1, 2, 5, 3, 7, 8, 6, 4]
