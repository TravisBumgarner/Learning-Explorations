import random

class Board:
    def __init__(self):
        self.board = self.generate()   

    def generate(self):
        board = []
        for i in range(0,4):
            board.append([])
            for j in range(0,4):
                random_char = chr(random.randint(97,122))
                #chr(97)  => a chr(122) => z
                board[i].append(random_char)
        return board

    def print_board(self):
        print(self.board)






class Solver:
    def __init__(self):
        print("working")

    def gen_tree(self,word_list):
        
            

        
        
if __name__ == "__main__":
    #new = Board()
    #new.print_board()

    solver = Solver()
    test_dict = ["cat","car","cart","dog","apple"]
    solver.gen_tree(test_dict)
