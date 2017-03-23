import time

gridSize = [20,20]

def recPath(gridSize):
    if gridSize == [0,0]: return 1
    paths = 0
    if gridSize[0] > 0:
        paths += recPath([gridSize[0] - 1, gridSize[1]])
    if gridSize[1] > 1:
        paths += recPath([gridSize[0], gridSize[1] - 1])

    return paths

print(recPath(gridSize))