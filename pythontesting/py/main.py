import os

from database import MyDatabase

if __name__ == "__main__":
    db = MyDatabase('sqlite', os.path.abspath('../db.sqlite'))
    db.print_all_data('users')
