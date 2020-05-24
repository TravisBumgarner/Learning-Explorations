from .new_years_chaos import minimumBribes

def test():
    assert(minimumBribes([1,2,3]) == 0)
    assert(minimumBribes([1,3,2]) == 1)
    assert(minimumBribes([3,1,2]) == 2)
    assert(minimumBribes([4,1,2,3]) == "Too Chaotic")

