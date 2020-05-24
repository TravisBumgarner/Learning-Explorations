class Set:
    def __init__(self):
        self.size = 64
        self.map = [None] * 64

    def _get_hash(self, key):
        sum = 0
        for char in key:
            sum += ord(char)
        return sum % self.size

    def add(self, key):
        key_hash = self._get_hash(key)

        if self.map[key_hash] is None:
            self.map[key_hash] = [key]
        else:
            if key not in self.map[key_hash]:
                self.map[key_hash].append(key)

    def exists(self, key):
        key_hash = self._get_hash(key)
        if self.map[key_hash] is None:
            return None
        else:
            return key in self.map[key_hash]

    def delete(self, key):
        key_hash = self._get_hash(key)
        if self.map[key_hash] is None:
            return None
        else:
            self.map[key_hash] = [existing_key for existing_key in self.map[key_hash] if key != existing_key]


    def print_map(self):
        for key_hash_entries in self.map:
            if key_hash_entries is not None:
                for key in key_hash_entries:
                    print(key)

myset = Set()
myset.add('a')
myset.add('b')
myset.add('c')
myset.add('add')
myset.add('dad')
myset.print_map()
print('\n')
myset.delete('dad')
myset.print_map()