from collections import namedtuple

Point = namedtuple('Point', 'x y')

def add_points(p1: Point, p2: Point):
    return Point(p1.x + p2.x, p1.y + p2.y)

def in_bounds(point: Point, board: list[str]):
    if point.x < 0 or point.y < 0:
        return False
    
    if point.x >= len(board[0]) or point.y >= len(board):
        return False

    return True

def find_x(start: Point, board: list[str]):
    TARGET_SET = set(['M', 'S'])

    left_diag = [
        add_points(start, Point(-1, -1)), 
        add_points(start, Point(1, 1))
    ]
    left_set = set([board[point.y][point.x] for point in left_diag if in_bounds(point, board)])

    right_diag = [
        add_points(start, Point(1, -1)), 
        add_points(start, Point(-1, 1))
    ]
    right_set = set([board[point.y][point.x] for point in right_diag if in_bounds(point,board)])

    return TARGET_SET == left_set == right_set

if __name__ == "__main__":
    with open('./04_01.txt', 'r') as file:
        board = file.readlines()

    count = 0
    for row_index, row in enumerate(board):
        for col_index, value in enumerate(row):
            if value == 'A':
                found = find_x(Point(col_index, row_index), board)
                if found:
                    count += 1
    
    print(count)
