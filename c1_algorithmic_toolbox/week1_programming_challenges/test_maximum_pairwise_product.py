import unittest
from .maximum_pairwise_product import mpp

class TestPairwiseProduct(unittest.TestCase):
    def test_invalid_input_fails(self):
        with self.assertRaises(ValueError):
            length = 5
            numbers = "1 2 3 a 5"
            result = mpp(length, numbers)

    def test_unique_numbers_are_used(self):
        length = 5
        numbers = "1 2 3 4 5"
        self.assertEqual(mpp(length, numbers),20)

        length = 5
        numbers = "1 2 3 5 5"
        self.assertEqual(mpp(length, numbers),25)

    def test_one_or_no_inputs_fails(self):
        with self.assertRaises(IndexError):
            length = 1
            numbers = "1"
            result = mpp(length, numbers)
