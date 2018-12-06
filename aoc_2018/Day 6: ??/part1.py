# THIS
# CODE
# IS
# BAD
# :shrug:

import re


def process_regex(input):
    print(input)
    pattern = r"(\d+),\s(\d+)"
    matches = re.match(pattern, input)
    # print(matches.groups())
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


    input = process_file(filename='./input.txt', single_line=False)
    non_infinite_letters = []
    coordinates = []
    # print(input)
    for elem in input:
        x, y = process_regex(elem)
        # print(x, y)
        x = int(x)
        y = int(y)
        coordinates.append((x, y))
        if x > grid_width:
            grid_width = x + 2
        if y > grid_height:
            grid_height = y + 2
        
    print(grid_width, grid_height)
    grid = [[{'value': ' ', 'is_occupied': False, 'is_new': False}
             for y in range(grid_height + 1 )] for x in range(grid_width + 1 )]
    letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    id = 0
    # print(len(grid), len(grid[0]))
    for coord in coordinates:
        x, y = coord
        grid[x][y]['value'] = letters[id]
        non_infinite_letters.append(letters[id])
        grid[x][y]['is_occupied'] = True
        grid[x][y]['is_new'] = False
        id += 1

    # for j in range(grid_width):
    #     for i in range(grid_height):
    #         print(grid[i][j]['value'], end=" ")
    #     print('\n')
    # print('--------------------')

    # Populate grid with original coordinates
    for _ in range(0, 100):
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

    # scan border
    # print(non_infinite_letters)
    for i in range(grid_width):
        l1 = grid[i][0]['value']
        l2 = grid[i][grid_width-1]['value']
        if l1 in non_infinite_letters:
            non_infinite_letters.remove(l1)
        if l2 in non_infinite_letters:
            non_infinite_letters.remove(l2)
    for j in range(grid_height):
        l1 = grid[i][0]['value']
        l2 = grid[i][grid_height-1]['value']
        if l1 in non_infinite_letters:
            non_infinite_letters.remove(l1)
        if l2 in non_infinite_letters:
            non_infinite_letters.remove(l2)
    # print(non_infinite_letters)

    output = dict(zip(non_infinite_letters, [0 for i in range(len(non_infinite_letters))]))
    for j in range(grid_width - 1):
        for i in range(grid_height - 1):
            if(grid[i][j]['value'] in non_infinite_letters):
                output[grid[i][j]['value']] += 1
    #     print('\n')
    # print('--------------------')
    print(output)
    print(max(output.values()))
if __name__ == "__main__":
    main()
