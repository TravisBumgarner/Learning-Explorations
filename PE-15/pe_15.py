class Tree:
    def __init__(self, x, y, left = None, right = None):
        self.x = x
        self.y = y
        self.left = left
        self.right = right

    def navigate(self):
        print((self.x, self.y))
        if self.left != None:
            self.left.navigate()
        if self.right != None:
            self.right.navigate()

class Latice:
    def __init__(self, tree_levels):
        self.counter = 0
        self.tree = Tree(0,0)
        self.tree_levels = tree_levels

    def build_tree(self, current_tree):
        if(current_tree.x < self.tree_levels):
            current_tree.left = Tree(current_tree.x + 1, current_tree.y)
            if current_tree.left.x == self.tree_levels and current_tree.left.y == self.tree_levels:
                self.counter += 1

        if(current_tree.y < self.tree_levels):
            current_tree.right = Tree(current_tree.x, current_tree.y +1)
            if current_tree.right.x == self.tree_levels and current_tree.right.y == self.tree_levels:
                self.counter += 1

        if current_tree.x < self.tree_levels:
            self.build_tree(current_tree.left)

        if current_tree.y < self.tree_levels:
            self.build_tree(current_tree.right)
        return self.counter

import datetime

start = datetime.datetime.now()
latice = Latice(20)
print(latice.build_tree(latice.tree))
print(datetime.datetime.now() - start)
