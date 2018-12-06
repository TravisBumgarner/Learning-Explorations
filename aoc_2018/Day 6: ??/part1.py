import re


def process_regex(input):
    pattern = r"(\d),\s(\d)"
    matches = re.match(pattern, input)
    return matches.groups()


def process_file(filename, single_line):
    with open(filename) as file:
        if(single_line == False):
            data = file.read().split('\n')
        else:
            data = file.read()
        return data


def main():
    grid_width = 0
    grid_height = 0

    SHIFT_ALL_THE_THE_THINGS_BY = 20

    input = process_file(filename='./input.txt', single_line=False)
    coordinates = []
    # print(input)
    for elem in input:
        x, y = process_regex(elem)
        # print(x, y)
        x = int(x)
        y = int(y)
        coordinates.append((x, y))
        if x > grid_width:
            grid_width = x
        if y > grid_height:
            grid_height = y
    print(grid_width, grid_height)
    grid = [[{'value': ' ', 'is_occupied': False, 'is_new': False}
             for y in range(grid_height + 1 + SHIFT_ALL_THE_THE_THINGS_BY)] for x in range(grid_width + 1 + SHIFT_ALL_THE_THE_THINGS_BY)]
    letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    id = 0
    print(len(grid), len(grid[0]))
    for coord in coordinates:
        x, y = coord
        grid[x][y]['value'] = letters[id]
        grid[x][y]['is_occupied'] = True
        grid[x][y]['is_new'] = False
        id += 1

    for j in range(grid_width):
        for i in range(grid_height):
            print(grid[i][j]['value'], end=" ")
        print('\n')
    print('--------------------')

    # Populate grid with original coordinates
    for _ in range(0, 10):
        for j in range(grid_width):
            for i in range(grid_height):
                if grid[i][j]['is_occupied'] and not grid[i][j]['is_new']:
                    # print(grid[x][y])
                    # go left
                    i_left = i - 1
                    j_left = j
                    if i_left >= 0:
                        if not grid[i_left][j_left]['is_occupied']:
                            grid[i_left][j_left]['value'] = grid[i][j]['value']
                            grid[i_left][j_left]['is_occupied'] = True
                            grid[i_left][j_left]['is_new'] = True
                        elif grid[i_left][j_left]['is_new'] and grid[i_left][j_left]['value'] != grid[i][j]['value']:
                            grid[i_left][j_left]['value'] = '.'
                    # go right
                    i_right = i + 1
                    j_right = j
                    if i_right < grid_width:
                        if not grid[i_right][j_right]['is_occupied']:
                            grid[i_right][j_right]['value'] = grid[i][j]['value']
                            grid[i_right][j_right]['is_occupied'] = True
                            grid[i_right][j_right]['is_new'] = True
                        elif grid[i_right][j_right]['is_new'] and grid[i_right][j_right]['value'] != grid[i][j]['value']:
                            grid[i_right][j_right]['value'] = '.'
                    # go down
                    i_down = i
                    j_down = j - 1
                    if j_down >= 0:
                        if not grid[i_down][j_down]['is_occupied']:
                            grid[i_down][j_down]['value'] = grid[i][j]['value']
                            grid[i_down][j_down]['is_occupied'] = True
                            grid[i_down][j_down]['is_new'] = True
                        elif grid[i_down][j_down]['is_new'] and grid[i_down][j_down]['value'] != grid[i][j]['value']:
                            grid[i_down][j_down]['value'] = '.'
                    # go down
                    i_up = i
                    j_up = j + 1
                    if j_up < grid_width:
                        if not grid[i_up][j_up]['is_occupied']:
                            grid[i_up][j_up]['value'] = grid[i][j]['value']
                            grid[i_up][j_up]['is_occupied'] = True
                            grid[i_up][j_up]['is_new'] = True
                        elif grid[i_up][j_up]['is_new'] and grid[i_up][j_up]['value'] != grid[i][j]['value']:
                            grid[i_up][j_up]['value'] = '.'

        # Reset the is_new after each run.
        for j in range(grid_width):
            for i in range(grid_height):
                if grid[i][j]['is_new']:
                    grid[i][j]['is_new'] = False

        # for j in range(grid_width):
        #     for i in range(grid_height):
        #         print(grid[i][j]['value'], end=" ")
        #     print('\n')
        # print('--------------------')


if __name__ == "__main__":
    main()
