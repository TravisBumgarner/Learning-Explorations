from typing import List
from collections import namedtuple

Point = namedtuple("Point", ['x', 'y'])  # x: int, y: int
BoardType = List[List[str]]

with open('./06_01.txt') as file:
    board: BoardType = []
    for row in file.readlines():
        board.append(list(row.strip()))


def has_left_the_map(position, board: BoardType):
    if position.x < 0 or position.y < 0:
        return True
    
    if position.x >= len(board[0]) or position.y >= len(board):
        return True
    
    return False

def find_blockages(arr: list[str]):
    locations = []
    for index, char in enumerate(arr):
        if char == '#':
            locations.append(index)
    return locations


def build_row_graph_items(previous_row_index: int, previous_row: list[int], current_row: list[int]):
    local_graph = dict()
    for previous_column_index in previous_row:
        for current_column_index in current_row:
            if previous_column_index < current_column_index:
                p1 = Point(previous_column_index, previous_row_index)
                p2 = Point(current_column_index, previous_row_index + 1)
                local_graph[p1] = p2
                local_graph[p2] = p1
    return local_graph

def walk_rows(board: BoardType, graph: dict):
    previous_row = None
    for row_index, row in enumerate(board):
        current_row = find_blockages(row)
        if previous_row:
            local_graph = build_row_graph_items(
                previous_row_index=row_index - 1, 
                previous_row=previous_row,
                current_row=current_row
            )
            graph.update(local_graph)
        previous_row = current_row 
        


if __name__ == "__main__": 
    graph = dict()
    walk_rows(board, graph)
    print(graph)
