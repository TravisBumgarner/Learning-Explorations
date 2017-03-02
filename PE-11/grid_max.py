myGrid =[
    [1, 2, 3, 4, 100],
    [5, 6, 0, 99, 0],
    [1, 11, 1, 3, 22],
    [1, 1, 1, 1, 55]
]

class Grid:
    def __init__(self, input_grid):
        try:
            self.grid = input_grid
            self.width = len(self.grid[0])
            self.height = len(self.grid)

            self.max_val = -1
            self.local_max_val = []

        except TypeError:
            raise ValueError("The input grid needs a minimum size of 4x4 integers")

        if self.width < 4 or self.height < 4:
            raise ValueError("The input grid needs a minimum size of 4x4 integers")

        for row in self.grid:
            try:
                sum(row)
            except SyntaxError:
                raise ValueError("The input is a grid of numbers only, check row {}".format(row))

    def calculate_horizontal(self, x_start, y_start):
        max_product = -1
        current_product = 1
        for x_current in range(x_start,x_start + 4):
            current_product *= self.grid[y_start][x_current]
            if current_product > max_product:
                max_product = current_product
        return max_product

    def calculate_vertical(self, x_start, y_start):
        max_product = -1
        current_product = 1
        for y_current in range(y_start,y_start + 4):
            current_product *= self.grid[y_current][x_start]
            if current_product > max_product:
                max_product = current_product
        return max_product

    def calculate_diagonal1(self, x_start, y_start):
        max_product = -1
        current_product = 1
        for i in range(0,4):
            current_product *= self.grid[y_start + i][x_start - i]
            if current_product > max_product:
                max_product = current_product
        return max_product

    def calculate_diagonal2(self, x_start, y_start):
        max_product = -1
        current_product = 1
        for i in range(0,4):
            current_product *= self.grid[y_start + i][x_start + i]
            if current_product > max_product:
                max_product = current_product
        return max_product

    def compute_max(self):
        for y in range(0, self.height):
            for x in range(0, self.width):
                self.local_max_val = []

                if x + 3 < self.width:
                    self.local_max_val.append(self.calculate_horizontal(x, y))

                if y + 3 < self.height:
                    self.local_max_val.append(self.calculate_vertical(x, y))

                if x + 3 < self.width and y + 3 < self.height:
                    self.local_max_val.append(self.calculate_diagonal1(x, y))

                if x - 3 > 0 and y + 3 < self.height:
                    self.local_max_val.append(self.calculate_diagonal1(x, y))

                try:
                    if max(self.local_max_val) > self.max_val:
                        self.max_val = max(self.local_max_val)
                except ValueError:
                    # Continue if self.local_max_val is empty
                    continue
        return self.max_val


grid = Grid(myGrid)
print(grid.compute_max())