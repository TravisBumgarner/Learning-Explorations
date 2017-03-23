from grid_max import Grid
import pytest

# Skip test: @pytest.mark.skip(reason="no way of currently testing this")
# Fixtures: Use @pytest.fixture before a function to let pytest know the function cam be used as a fixture
"""
@pytest.fixture
def phonebook():
    return Phonebook()

def test_phonebook_lookup(phonebook):
    # Do something
"""

"""
    Good Tests Here
"""

def test_normal_grid_search_works():
    grid = Grid([
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [5, 4, 3, 2],
        [1, 1, 1, 1]
    ])
    assert 1680 == grid.compute_max()


def test_0_grid_equals_0():
    grid2 = Grid([
        [1, 2, 3, 0],
        [2, 0, 5, 3],
        [5, 2, 0, 0],
        [0, 0, 3, 2]
    ])
    assert 0 == grid2.compute_max()

def test_1_grid_equals_1():
    grid3 = Grid([
        [1, 1, 1, 1],
        [1, 1, 1, 1],
        [1, 1, 1, 1],
        [1, 1, 1, 1]
    ])
    assert 1 == grid3.compute_max()

def test_horizontal_search():
    grid4 = Grid([
        [1, 1, 1, 1, 1],
        [1, 9, 9, 9, 9],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1]
    ])
    assert 6561 == grid4.compute_max()

def test_vertical_search():
    grid5 = Grid([
        [1, 1, 1, 1, 1],
        [1, 1, 9, 1, 1],
        [1, 1, 9, 1, 1],
        [1, 1, 9, 1, 1],
        [1, 1, 9, 1, 1]
    ])
    assert 6561 == grid5.compute_max()

def test_diagonal_down_right_search():
    grid6 = Grid([
        [1, 9, 1, 1, 1],
        [1, 1, 9, 1, 1],
        [1, 1, 1, 9, 1],
        [1, 1, 1, 1, 9],
        [1, 1, 1, 1, 1]
    ])
    assert 6561 ==  grid6.compute_max()


def test_diagonal_down_left_search():
    grid7 = Grid([
        [1, 1, 1, 9, 1],
        [1, 1, 9, 1, 1],
        [1, 9, 1, 1, 1],
        [9, 1, 1, 1, 1],
        [1, 1, 1, 1, 1]
    ])
    assert 6561 == grid7.compute_max()


"""
    Bad Tests Here
"""


def test_grid_not_rectangular():
    with pytest.raises(ValueError):
        grid1b = Grid([
            [1, 2, 3, 4, 5],
            [1, 1, 1, 1],
            [1, 1, 1, 1],
            [1, 2, 4, 5]
        ])
        grid1b.compute_max()


def test_grid_too_small():
    with pytest.raises(ValueError):
        grid2b = Grid([
            [1, 1, 1],
            [1, 1, 1],
            [1, 1, 1],
        ])
        grid2b.compute_max()


def test_grid_contains_non_numbers():
    with pytest.raises(TypeError):
        grid3b = Grid([
            [1, 1, 1, 1],
            [1, 1, 1, 1],
            [1, "A", 4, 5],
            [1, 2, 4, 5],
        ])
        grid3b.compute_max()


def test_grid_is_not_list_of_lists():
    with pytest.raises(ValueError):
        grid4b = Grid("A")
        grid4b.compute_max()