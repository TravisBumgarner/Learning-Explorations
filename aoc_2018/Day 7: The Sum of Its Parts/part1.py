import re


class Node:
    def __init__(self, value=None):
        self.value = value
        self.children_nodes = []

    def add_child(self, node):
        self.children_nodes.append(node)

    def get_child_by_value(self, value):
        for node in self.children_nodes:
            if node.value == value:
                return node
        else:
            return None

    def remove_child_by_value(self, value):
        node = self.get_child_by_value(value)
        if node:
            self.children_nodes.remove(node)
            return node
        else:
            return None

    def has_children(self):
        return len(self.children_nodes) > 0

    def get_children_values(self):
        return [node.value for node in self.children_nodes]

    def get_decendent_values(self, decendent_values=set([])):
        if not self.children_nodes:
            return None
        else:
            for node in self.children_nodes:
                decendent_values.add(node.value)
                node.get_decendent_values(decendent_values)
        return set(decendent_values)


def process_file(filename):
    with open(filename) as f:
        data = f.read().split('\n')
    return data


def get_letter_pairs(input):
    pattern = r"Step (\w) must be finished before step (\w) can begin."
    matches = re.match(pattern, input)
    return matches.groups()


def main():
    root_node = Node()
    raw_instructions = process_file("./input.txt")
    for instruction in raw_instructions:
        start_value, end_value = get_letter_pairs(instruction)
        print(f"Given {start_value} and {end_value}")

        # Initial Setup Condition On First Pass
        if not root_node.has_children():
            root_node.value = start_value
            root_node.add_child(Node(value=end_value))

        

        elif start_value == root_node.value:
            root_node.add_child(Node(value=end_value))

        elif start_value in root_node.get_children_values():
            node = root_node.get_child_by_value(start_value)
            node.add_child(Node(value=end_value))

    print(f"{root_node.value} has decendents {root_node.get_decendent_values()}")
    for node in root_node.children_nodes:
        print(f"{node.value} has children {node.get_children_values()}")


if __name__ == "__main__":
    main()
