from collections import namedtuple

Point = namedtuple("Point", ['x', 'y'])

board: list[list[str]] = []
with open('./06_01.txt') as file:
    for row in file.readlines():
        board.append(list(row.strip()))

# Todo ensure these are setup correctly.
DIRECTION_VECTORS = [
    Point(0, -1), # up
    Point(1, 0), # right
    Point(0, 1), # Down
    Point(-1, 0), # Left
]

def add_vectors(p1: Point, p2: Point):
    return Point(p1.x + p2.x, p1.y + p2.y)

def get_guard_start(board: list[list[str]]):
    for row_index, row in enumerate(board):
        for col_index, char in enumerate(row):
            print('c', char)
            if char == '^':
                return Point(col_index, row_index)

def can_move(position, board):
    return has_left_the_map(position, board) or board[position.y][position.x] != '#' 

def has_visited(position, board):
    return board[position.y][position.x] == '^'

def has_left_the_map(position, board):
    if position.x < 0 or position.y < 0:
        return True
    
    if position.x >= len(board[0]) or position.y >= len(board):
        return True
    
    return False


def rotate(current_direction):
    return (current_direction + 1) % len(DIRECTION_VECTORS)

if __name__ == "__main__":
    movements = 1 # Count starting position
    current_direction = 0
    current_position = get_guard_start(board)

    while True:
        potential_next_position = add_vectors(current_position, DIRECTION_VECTORS[current_direction])
        while not can_move(potential_next_position, board):
            current_direction = rotate(current_direction)
            potential_next_position = add_vectors(current_position, DIRECTION_VECTORS[current_direction])

        current_position = potential_next_position

        if has_left_the_map(current_position, board):
            break

        if not has_visited(current_position, board):
            board[current_position.y][current_position.x] = "^"
            movements += 1

    print(movements)
