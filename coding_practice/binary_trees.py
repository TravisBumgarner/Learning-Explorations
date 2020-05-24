import math

class Tree:
    def __init__(self, head):
        self.items = [head,]

    def add(self, item):
        self.items.append(item)

    def get_left_child_index(self, index):
        child_index = index * 2 + 1
        print('left', index, child_index)
        return child_index if child_index < len(self.items) else None

    def get_right_child_index(self, index):
        child_index = index * 2 + 2
        print('right', index, child_index)
        return child_index if child_index < len(self.items) else None

    def get_parent_index(self, index):
        return math.floor((index - 1) / 2)

    def delete(self, index):
        last_index = len(self.items) - 1
        self.items[index], self.items[last_index] = self.items[last_index], self.items[index]
        self.items.pop()

    def visualize(self):
        # Looks decent up to 3 rows. Beyond that, gets a little wonky
        row = 0
        max_rows = math.ceil(math.log(len(self.items), 2))
        max_index_this_row = 0
        start_index = 0
        unit_of_spacing = len(str(max(self.items))) + 2

        items_output = ''

        for index, item in enumerate(self.items):
            items_output += " " * unit_of_spacing * (max_rows - row) + str(item)
            
            if index == max_index_this_row or index == len(self.items) - 1:
                row += 1
                max_index_this_row += 2 ** row
                print(items_output)
                items_output = ''
            
tree = Tree(0)
tree.add(5)
tree.add(2)
tree.add(4)
tree.add(3)
print('left', tree.get_left_child_index(1))
print('right', tree.get_right_chilxd_index(1))
print('parent', tree.get_parent_index(1))
# tree.add(5)
# tree.add(6)
# tree.add(7)
# tree.add(8)
tree.visualize()