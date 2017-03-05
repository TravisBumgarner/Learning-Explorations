import unittest
from grid_max import Grid


class GoodInputs(unittest.TestCase):
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

    def test_1_grid_equals_1(self):
        grid3 = Grid([
            [1, 1, 1, 1],
            [1, 1, 1, 1],
            [1, 1, 1, 1],
            [1, 1, 1, 1]
        ])
        self.assertEqual(grid3.compute_max(), 1)

    def test_horizontal_search(self):
        grid4 = Grid([
            [1, 1, 1, 1, 1],
            [1, 9, 9, 9, 9],
            [1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1]
        ])
        self.assertEqual(grid4.compute_max(), 6561)

    def test_vertical_search(self):
        grid5 = Grid([
            [1, 1, 1, 1, 1],
            [1, 1, 9, 1, 1],
            [1, 1, 9, 1, 1],
            [1, 1, 9, 1, 1],
            [1, 1, 9, 1, 1]
        ])
        self.assertEqual(grid5.compute_max(), 6561)

    def test_diagonal_down_right_search(self):
        grid6 = Grid([
            [1, 9, 1, 1, 1],
            [1, 1, 9, 1, 1],
            [1, 1, 1, 9, 1],
            [1, 1, 1, 1, 9],
            [1, 1, 1, 1, 1]
        ])
        self.assertEqual(grid6.compute_max(), 6561)

    def test_diagonal_down_left_search(self):
        grid7 = Grid([
            [1, 1, 1, 9, 1],
            [1, 1, 9, 1, 1],
            [1, 9, 1, 1, 1],
            [9, 1, 1, 1, 1],
            [1, 1, 1, 1, 1]
        ])
        self.assertEqual(grid7.compute_max(), 6561)


class BadInputs(unittest.TestCase):


    def test_grid_not_rectangular(self):
        with self.assertRaises(ValueError):
            grid1b = Grid([
                [1, 2, 3, 4, 5],
                [1, 1, 1, 1],
                [1, 1, 1, 1],
                [1, 2, 4, 5]
            ])
            grid1b.compute_max()

    def test_grid_too_small(self):
        with self.assertRaises(ValueError):
            grid2b = Grid([
                [1, 1, 1],
                [1, 1, 1],
                [1, 1, 1],
            ])
            grid2b.compute_max()

    def test_grid_contains_non_numbers(self):
        with self.assertRaises(TypeError):
            grid3b = Grid([
                [1, 1, 1, 1],
                [1, 1, 1, 1],
                [1, "A", 4, 5],
                [1, 2, 4, 5],
            ])
            grid3b.compute_max()

    def test_grid_is_not_list_of_lists(self):
        with self.assertRaises(ValueError):
            grid4b = Grid("A")
            grid4b.compute_max()