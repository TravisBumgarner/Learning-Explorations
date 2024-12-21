# This is not the best way to be learning python right now.
# Problem currently struggles from the fact that the graph is overriding beacuse A->B will be overwritten by A->C
# Also, the graph is going to think A-> B -> C if they're all along a row are conencted, this is incorrect. 

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
    previous_blockages = []
    for row_index, row in enumerate(board):
        current_blockages = find_blockages(row)
        if len(previous_blockages) > 0 and len(current_blockages) > 0:
            local_graph = build_row_graph_items(
                previous_row_index=row_index - 1, 
                previous_row=previous_blockages,
                current_row=current_blockages
            )
            graph.update(local_graph)
        previous_blockages = current_blockages 


def build_column_graph_items(previous_column_index: int, previous_column: list[int], current_column: list[int]):
    local_graph = dict()
    for previous_row_index in previous_column:
        for current_row_index in current_column:
            if previous_row_index > current_row_index:
                p1 = Point(previous_column_index, previous_row_index)
                p2 = Point(previous_column_index + 1, current_row_index)
                local_graph[p1] = p2
                local_graph[p2] = p1
    return local_graph

def walk_columns(board: BoardType, graph: dict):
    previous_blockages = []
    for column_index in range(len(board[0])):
        column = [row[column_index] for row in board]
        current_blockages = find_blockages(column)
        if len(previous_blockages) > 0 and len(current_blockages) > 0:
            local_graph = build_column_graph_items(
                previous_column_index = column_index - 1,
                previous_column=previous_blockages,
                current_column=current_blockages
            )
            graph.update(local_graph)
        previous_blockages = current_blockages


if __name__ == "__main__": 
    graph = []
    walk_rows(board, graph)
    walk_columns(board, graph)
