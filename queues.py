class Queue(object):
    def __init__(self,limit = 5):
        self.queue = []
        self.limit = limit
        self.front = None
        self.rear = None
        self.size = 0

    def is_empty(self):
        return self.size <= 0

    def en_queue(self,item):
        if self.size < self.limit:
            self.queue.append()
        else:
            print "Queue overflow!"
            return

        if self.front is None:
            self.front = self.rear = 0
        else:
            self.rear = self.size
        self.size += 1

    def de_queue(self):
        if self.size > 0:
            self.queue.pop()

    #Pick up here and finish defining a queue



