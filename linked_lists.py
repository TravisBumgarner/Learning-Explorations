"""
Resource: https://www.codefellows.org/blog/implementing-a-singly-linked-list-in-python/

"""

class Node(object):
    def __init__(self, data=None, next_node=None):
        self.data = data
        self.next_node = next_node

    def get_data(self):
        return self.data

    def set_data(self,data):
        self.data = data

    def get_next(self):
        return self.next_node

    def set_next(self, new_next):
        self.next_node = new_next


class LinkedList(object):
    def __init__(self, head=None):
        self.head = head

    #Insert has O(1) because a node is always inserted at the head
    def insert(self, data):
        new_node = Node(data)
        new_node.set_next(self.head)
        self.head = new_node

    #Size has O(n) because it must vist every node
    def size(self):
        current = self.head
        count = 0
        while current:
            count += 1
            current = current.get_next()
        return count

    #Search is O(n) worst case because it searches every element
    def search(self, data):
        current = self.head
        found = False
        while current and found is False:
            """
            You use == when comparing values and is when comparing identities.
            When comparing ints (or immutable types in general), you pretty much
            always want the former. There's an optimization that allows small
            integers to be compared with is, but don't rely on it
            For boolean values, you shouldn't be doing comparisons at all.
            """

            if current.get_data() == data:
                found = True
            else:
                current = current.get_next()
        if current is None:
            raise ValueError("Data not in list")
        return current

    #Delete, like search is O(n)
    def delete(self, data):
        current = self.head
        previous = None
        found = False
        while current and found is False:
            #Something that is "true" makes an if statement succeed; something
            # that's "false" makes it fail. "false" values include False, None,
            # 0 and [] (an empty list).
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

    #Practice Problem by me
    #Create function to get the nth item
    def get_nth(self,nth):
        current = self.head
        current_index = 0

        while current and current_index != nth:
            current = current.get_next()
            current_index += 1

        if current is None:
            raise ValueError("nth item is larger than the list")

        return current

        """
        Test:
        my_ll = LinkedList()
        for i in range(0,10):
            my_ll.insert(i)

        print(my_ll.get_nth(1))

        Insert adds at the head which causes this my_ll.get_nth(1) to return 8
        instead of 1 which I originally expected
        """

    #Practice Problem by me
    #Delete Entire List
    def delete_list(self):
        current = self.head
        next = current.get_next()
        while next:
            next = current.get_next()
            current.set_data(None)
            current.set_next(None)
            #"None" refers exactly to the intended functionality - it is nothing,
            #and has no behaviouri
            current = next

    # Practice Problem by me
    # Add pop functionality
    def pop(self):
        pop_it = self.head
        self.head = pop_it.get_next()
        return(pop_it.get_data())




