from .find_pair_that_sum import find_pairs_that_sum

def test_answer():
    assert find_pairs_that_sum([1,2,2], 4) == True
    assert find_pairs_that_sum([1,1], 2) == True
    assert find_pairs_that_sum([1,1,3], 4) == True
    assert find_pairs_that_sum([1,1,5], 4) == False
    assert find_pairs_that_sum([-1,1,5], 0) == True