class Node:
    def __init__(self,word_end = False):
        self.word_end = word_end
        self.children = {}

    def word_end(self):
        return self.word_end

class Tree:
    def __init__(self):
        self.root = {}

    def add_word(self,word):
        if len(word) == 1:
            self.root[word] = Node(word_end = True)
        if len(word) == 2:
            self.root[word[0]] = Node(word_end = False)
            self.root[word[0]].children = word[1] 
                    
            

tree = Tree()
tree.add_word("a")
tree.add_word("ab")
print(tree.root["ab"].word_end)
            
            


test_dict = ["a","cat","car","cart","dog","apple","i"]
word_tree = {}
#gen_tree(test_dict,word_tree)
