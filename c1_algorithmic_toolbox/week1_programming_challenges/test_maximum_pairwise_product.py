import unittest
from maximum_pairwise_product import mpp

class TestPairwiseProduct(unittest.TestCase):
    def test_invalid_input_fails(self):
        with self.assertRaises(ValueError):
            length = 5
            numbers = "1 2 3 a 5"
            result = mpp(length, numbers)

    # Input must numbers separated by single spaces
    def test_both_inputs_exist(self):
    # Both numbers forming product must exist in input
        length = 5
        numbers = "1 2 3 4 5"
        self.assertEqual(mpp(length, numbers),20)

        length = 5
        numbers = "1 2 3 5 5"
        self.assertEqual(mpp(length, numbers),25)
        