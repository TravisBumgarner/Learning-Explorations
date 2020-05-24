from .case_insensitive_compare import case_insensitive_compare

def test_stuff():
    assert(case_insensitive_compare('abc', 'abc') == True)
    assert(case_insensitive_compare('abc', 'ABC') == True)
    assert(case_insensitive_compare('abC', 'abc') == True)
    assert(case_insensitive_compare('123', '123') == True)
    assert(case_insensitive_compare('###!', '###!') == True)
    assert(case_insensitive_compare('', '') == True)
    assert(case_insensitive_compare('abc', 'aabc') == True)
    assert(case_insensitive_compare('abc', 'aaabc') == False)
    assert(case_insensitive_compare('ac', 'abc') == True)
    assert(case_insensitive_compare('abcec', 'abc') == False)
    assert(case_insensitive_compare('abcec', 'abc', 2) == True)