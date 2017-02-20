"""
Remove dups from a linked list1
1) with a buffer
2) without a buffer
"""
import random

class Node(object):
    def __init__(self, data = None, next_node = None):
        self.data = data
        self.next_node = next_node

    def get_data(self):
        return self.data

    def set_data(self,data):
        self.data = data

    def get_next(self):
        return self.next_node

    def set_next(self,new_next):
        self.next_node = new_next

class Linked_List(object):
    def __init__(self, head = None):
        self.head = Node(head)

    def add_item(self, item):
        new_node = Node(item)
        new_node.set_next(self.head)
        self.head = new_node

    def remove_item(self,data):
        current = self.head
        previous = None
        found = False
        while current and found is False:
            if current.get_data() == data:
                found = True
            else:
                previous = current
                current = current.get_next()
        if current is None:
            raise ValueError("Data not in list")
        if previous is None:
            self.head = current.get_next()
        else:
            previous.set_next(current.get_next())

    def print_ll(self):
        current = self.head
        while current.next_node is not None:
            print(current.get_data(), " ",end="")
            current = current.get_next()
        print("\n")

    def remove_dups_with_buffer(self):
        dup_set = set()
        current = self.head
        while current.next_node is not None:
            if current.get_data() not in dup_set:
                dup_set.add(current.get_data())
            else:
                self.remove_item(current.get_data())

            current = current.get_next()

    def remove_dups_inline(self):
        pointer1 = self.head
        pointer2 = pointer1.get_next()
        pointer2_prev = pointer1

        while pointer1.next_node is not None:
            while pointer2.next_node is not None:
                if pointer1.get_data() == pointer2.get_data():
                    pointer2_prev.set_next(pointer2.get_next())
                    print("Removing {}".format(pointer2.get_data()))
                    pointer2 = pointer2_prev
                else:
                    pointer2_prev = pointer2
                    pointer2 = pointer2.get_next()

            pointer1 = pointer1.get_next()
            pointer2 = pointer1.get_next()
            pointer2_prev = pointer1
        

ll = Linked_List(0)
for i in [random.randint(0,9) for i in range(0,10)]:
    ll.add_item(i)

print("Before:")
ll.print_ll()
ll.remove_dups_inline()
print("\n\nAfter:")
ll.print_ll()
    
