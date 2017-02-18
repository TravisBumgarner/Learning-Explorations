from linked_lists import Node, LinkedList
import random
my_ll = LinkedList()
for i in range(0,10):
    my_ll.insert(i)


while my_ll.get_nth(0).get_data():
    print(my_ll.pop())

