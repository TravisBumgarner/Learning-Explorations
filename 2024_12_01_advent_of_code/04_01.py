from collections import namedtuple

Point = namedtuple('Point', 'x y')

VECTORS = [
    Point(-1, -1),
    Point(-1, 0),
    Point(-1, 1),
    Point(0, -1),
    Point(0, 1),
    Point(1, -1),
    Point(1, 0),
    Point(1, 1),
]

MATCH_STRING = "XMAS"

def in_bounds(point: Point, board: list[str]):
    if point.x < 0 or point.y < 0:
        return False
    
    if point.x >= len(board[0]) or point.y >= len(board):
        return False

    return True

def find_word(start: Point, board: list[str]):
    count = 0
    for vector in VECTORS:
        found_string = ''
        point = start
        for _ in range(len(MATCH_STRING)):
            if not in_bounds(point, board):
                break

            found_string += board[point.y][point.x]
            point = Point(point.x + vector.x, point.y + vector.y)
        if found_string == MATCH_STRING:
            count += 1
    return count

if __name__ == "__main__":
    with open('./04_01.txt', 'r') as file:
        board = file.readlines()

    count = 0
    for row_index, row in enumerate(board):
        for col_index, value in enumerate(row):
            if value == MATCH_STRING[0]:
                local_count = find_word(Point(col_index, row_index), board)
                count += local_count
    print(count)
