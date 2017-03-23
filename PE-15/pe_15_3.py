grid_size = [20,20]
def calculate_routes(grid_size):
    grid_dict = {1:2}
    grid_area = grid_size[0] * grid_size[1]
    if grid_area in grid_dict:
        return grid_dict[grid_area]

