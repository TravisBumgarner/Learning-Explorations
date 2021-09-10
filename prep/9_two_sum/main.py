def naive_case(nums, target):
    for i_index, i in enumerate(nums):
        for j_index, j in enumerate(nums):
            if i_index == j_index:
                continue
            
            if i + j == target:
                return [i_index, j_index]

            
            
def better_case(nums, target):
    lookup_table = {}
    
    for index, a in enumerate(nums):
        b = target - a
        if a in lookup_table:
            return [index, lookup_table[a]]
        else:
            lookup_table[b] = index
            