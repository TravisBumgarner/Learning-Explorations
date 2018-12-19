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


def search_nodes_by_value(node, value):
    decendent_values = node.get_decendent_values()
    children_values = node.get_children_values()

    print(node.value)
    print(f"    children:{children_values}")
    print(f"    decendents:{decendent_values}\n")

    if(not children_values):
        print(f"No children for {node.value}")
        return None

    elif(value not in decendent_values):
        print(f"{value} doesn't exist in the subtree of {node.value}")
        return None

    elif(value in children_values):
        return node.get_child_by_value(value)

    else:
        for child_node in node.children_nodes:
            return search_nodes_by_value(child_node, value)


def build_tree(raw_instructions):
    root_node = Node()
    for instruction in raw_instructions:
        start_value, end_value = get_letter_pairs(instruction)
        print(f"Given {start_value} and {end_value}")

        # Initial Setup Condition On First Pass
        if not root_node.has_children():
            root_node.value = start_value
            root_node.add_child(Node(value=end_value))

        # Self Explaining
        elif start_value == root_node.value:
            root_node.add_child(Node(value=end_value))

        # Look through the rest of the tree to add a value
        else:
            node_with_start_value = search_nodes_by_value(root_node, start_value)

            if(not node_with_start_value):
                print("Something went wrong.")
            else:
                node_with_start_value.add_child(Node(value=end_value))
    return root_node


def make_instructions(tree):
    pass


def main():
    raw_instructions = process_file("./input.txt")
    root_node = build_tree(raw_instructions)

    available_nodes = []
    output = root_node.value

    if(root_node.has_children()):
        available_nodes += root_node.children_nodes
        available_nodes = sorted(available_nodes, reverse=True, key=lambda x: x.value)
        node_to_append = available_nodes.pop()
        output += node_to_append.value

    for node in root_node.children_nodes:
        if(node.has_children()):
            available_nodes += node.children_nodes
            available_nodes = sorted(available_nodes, reverse=True, key=lambda x: x.value)
            node_to_append = available_nodes.pop()
            output += node_to_append.value

            for n in node.children_nodes:
                if(n.has_children()):
                    available_nodes += n.children_nodes
                    available_nodes = sorted(available_nodes, reverse=True, key=lambda x: x.value)
                    node_to_append = available_nodes.pop()
                    output += node_to_append.value

    print(output)


if __name__ == "__main__":
    main()
