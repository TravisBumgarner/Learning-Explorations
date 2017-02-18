class Stack(object):
    #last in first out
    def __init__(self,limit = 50):
        self.limit = limit
        self.stk = []

    def is_empty(self):
        return len(self.stk) <= 0

    def push(self,data):
        #push == append
        if len(self.stk) < self.limit:
            self.stk.append(data)
        else:
            print("Stack Overflow")
            return None

    def pop(self):
        if len(self.stk) > 0:
            pop_value = self.stk[-1]
            del self.stk[-1]
            return pop_value
        else:
            print("Stack underflow")
            return None

    #My addition
    def print(self):
        print(self.stk)

    #My addition
    def top_val(self):
        if not self.is_empty():
            return self.stk[-1]
        else:
            print("Stack underflow")
            return None


#Practice Problem
#Check if expressions are ballanced
# (A+B) => True
# ((A+b) => False

test_string = [
    "(A+B",
    "((A+B)*(A+D))"
]

def balanced(test_string):
    pairs = {
        "(":")",
        "{":"}",
        "[":"]",
        "<":">"
    }
    open_chars = pairs.keys()
    closing_chars = pairs.values()

    char_stack = Stack()

    for char in test_string:
        if char in open_chars:
            char_stack.push(char)

        elif char in closing_chars:
            top_char = char_stack.top_val()
            if(pairs[top_char] == char):
                char_stack.pop()

    char_stack.print()
    if char_stack.is_empty(): print("Match")
    else: print("Mismatch")



