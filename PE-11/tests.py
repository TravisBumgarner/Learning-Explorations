import unittest
from grid_max import Grid


class GoodInputs(unittest.TestCase):
    grid_1 = [
        [1, 1, 1, 1],
        [1, 1, 1, 1],
        [1, 1, 1, 1],
        [1, 1, 1, 1]
    ]
    grid_6562_horizontal = [
        [1, 1, 1, 1, 1],
        [1, 9, 9, 9, 9],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1]
    ]
    grid_6562_vertical = [
        [1, 1, 1, 1, 1],
        [1, 1, 9, 1, 1],
        [1, 1, 9, 1, 1],
        [1, 1, 9, 1, 1],
        [1, 1, 9, 1, 1]
    ]
    grid_6562_diagonal_down_right = [
        [1, 9, 1, 1, 1],
        [1, 1, 9, 1, 1],
        [1, 1, 1, 9, 1],
        [1, 1, 1, 1, 9],
        [1, 1, 1, 1, 1]
    ]
    grid_6562_diagonal_down_left = [
        [1, 1, 1, 9, 1],
        [1, 1, 9, 1, 1],
        [1, 9, 1, 1, 1],
        [9, 1, 1, 1, 1],
        [1, 1, 1, 1, 1]
    ]


    def test_normal_grid_search_works(self):
        grid = Grid([
            [1, 2, 3, 4],
            [5, 6, 7, 8],
            [5, 4, 3, 2],
            [1, 1, 1, 1]
        ])
        self.assertEqual(grid.compute_max(), 1680)

    def test_0_grid_equals_0(self):
        grid2 = Grid([
            [1, 2, 3, 0],
            [2, 0, 5, 3],
            [5, 2, 0, 0],
            [0, 0, 3, 2]
        ])
        self.assertEqual(grid2.compute_max(), 0)

    """

    def test_1_grid_equals_1(self):
        self.assertEqual(grid_max(self.grid_1), 1)

    def test_horizontal_search(self):
        self.assertEqual(grid_max(self.grid_6562_horizontal), 6562)

    def test_vertical_search(self):
        self.assertEqual(grid_max(self.grid_6562_vertical), 6562)

    def test_diagonal_down_right_search(self):
        self.assertEqual(grid_max(self.grid_6562_diagonal_down_right), 6562)

    def test_diagonal_down_left_search(self):
        self.assertEqual(grid_max(self.grid_6562_diagonal_down_left), 6562)

class BadInputs(unittest.TestCase):
    grid_not_rectangular = [
        [1, 2, 3, 4, 5],
        [1, 1, 1, 1],
        [1, 1, 1, 1],
        [1, 2, 4, 5]
    ]
    grid_too_small = [
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1],
    ]
    grid_contains_non_numbers = [
        [1, 1, 1, 1],
        [1, 1, 1, 1],
        [1, "A", 4, 5],
        [1, 2, 4, 5],
    ]
    all_around_bad_input1 = "a"
    all_around_bad_input2 = ["a", 5, 5]

    def test_grid_not_rectangular(self):
        with self.assertRaises("ValueError"):
            grid_max(self.grid_not_rectangular)

    def test_grid_too_small(self):
        # Checks if the function on two lines below raises a ValueError
        with self.assertRaises("ValueError"):
            grid_max(self.grid_too_small)

    def test_grid_contains_non_numbers(self):
        with self.assertRaises("ValueError"):
            grid_max(self.grid_contains_non_numbers)

    def test_all_around_bad_input(self):
        with self.assertRaises("ValueError"):
            grid_max(self.all_around_bad_input1)
        with self.assertRaises("ValueError"):
            grid_max(self.all_around_bad_input2)
"""