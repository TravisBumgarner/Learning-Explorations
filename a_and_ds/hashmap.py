class HashMap:
    def __init__(self):
        self.size = 10
        self.map = [None] * self.size

    def _get_hash(self, key):
        sum = 0
        for char in key:
            sum += ord(char)
        return sum % self.size
    
    def add(self, key, value):
        key_hash = self._get_hash(key)

        if self.map[key_hash] is None:
            self.map[key_hash] = [(key, value)]
        else:
            already_exists = False
            for index, (existing_key, existing_value) in enumerate(self.map[key_hash]):
                if key == existing_key:
                    already_exists = True
                    self.map[key_hash][index] = (key, value)
            
            if not already_exists:
                self.map[key_hash].append((key, value))
    
    def get(self, key):
        key_hash = self._get_hash(key)
        if self.map[key_hash] is None:
            return None
        else:
            for existing_key, _ in self.map[key_hash]:
                if existing_key == key:
                    return value
            return None

    def delete(self, key):
        key_hash = self._get_hash(key)
        if self.map[key_hash] is None:
            return None
        else:
            self.map[key_hash] = [(existing_key, existing_value) for (existing_key, existing_value) in self.map[key_hash] if key != existing_key]

    def print_map(self):
        for key_hash_entries in self.map:
            if key_hash_entries is not None:
                for key, value in key_hash_entries:
                    print(key, value)

mydict = HashMap()
mydict.add('a', 5)
mydict.add('b', 5)
mydict.add('c', 5)
mydict.add('add', 5)
mydict.add('dad', 6)
mydict.print_map()
print('\n')
mydict.delete('dad')
mydict.print_map()