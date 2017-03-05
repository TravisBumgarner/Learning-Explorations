import unittest

from phonebook import Phonebook

class PhonebookTest(unittest.TestCase):
    def setUp(self):
        self.phonebook = Phonebook()

    def tearDown(self):
        #Memory manager typically takes care of tearDown
        pass
    
    def test_lookup_entry_by_name(self):
        self.phonebook.add("Bob", "12345")
        #Next line ensures the function returns 12345 for Bob
        self.assertEqual("12345",self.phonebook.lookup("Bob"))

    def test_missing_entry_raises_KeyError(self):
        #The "missing" lookup should return a key error
        with self.assertRaises(KeyError):
            self.phonebook.lookup("missing")
        
    def test_empty_phonebook_is_consistent(self):
        self.assertTrue(self.phonebook.is_consistent())


    def test_phonebook_with_normal_entries_is_consistent(self):
        self.phonebook.add("Bob","12345")
        self.phonebook.add("Mary", "012345")
        self.assertTrue(self.phonebook.is_consistent())

    def test_phonebook_with_duplicate_entries_is_consistent(self):
        self.phonebook.add("Bob","12345")
        self.phonebook.add("Mary", "12345")
        self.assertTrue(self.phonebook.is_consistent())

    def test_phonebook_with_numbers_that_prefix_one_another_is_inconsistent(self):
        self.phonebook.add("Bob","12345")
        self.phonebook.add("Mary", "123")
        self.assertTrue(self.phonebook.is_consistent())
