import random


class Location:
    def __init__(self, x, y):
        """x and y are floats"""
        self.x = x
        self.y = y

    def move(self, delta_x, delta_y):  # Move might be a poor name for a method
        """delta_x and delta_y are floats"""
        return Location(self.x + delta_x, self.y + delta_y)

    def get_x(self):
        return self.x

    def get_y(self):
        return self.y

    def distance_from(self, other):
        x_dist = self.x - other.get_x()
        y_dist = self.y - other.get_y()
        return (x_dist**2 + y_dist**2)**0.5

    def __str__(self):
        return f"<{self.x}, {self.y}>"


class Drunk(object):
    def __init__(self, name='Gary'):
        self.name = name

    def __str__(self):
        return self.name


class UsualDrunk(Drunk):
    def take_step(self):
        step_choices = [(0, 1), (0, -1), (1, 0), (-1, 0)]
        return random.choice(step_choices)


class NewEnglandDrunk(Drunk):
    def take_step(self):
        step_choices = [(0, 1.1), (0, -0.9), (1, 0), (-1, 0)]
        return random.choice(step_choices)


class Field:
    def __init__(self):
        self.drunks = {}

    def add_drunk(self, drunk, location):
        if drunk in self.drunks:
            raise ValueError("Drunk already in field")
        else:
            self.drunks[drunk] = location

    def get_location(self, drunk):
        if drunk not in self.drunks:
            raise ValueError("Drunk not in field")
        return self.drunks[drunk]

    def move_drunk(self, drunk):
        if drunk not in self.drunks:
            raise ValueError("Drunk not in field")

        x_dist, y_dist = drunk.take_step()
        self.drunks[drunk] = self.drunks[drunk].move(x_dist, y_dist)


def walk(field, drunk, num_steps):
    start = field.get_location(drunk)
    for _step in range(num_steps):
        field.move_drunk(drunk)
    return start.distance_from(field.get_location(drunk))


def simulate_walks(num_steps, num_trials, drunk_class):
    Homer = drunk_class()
    origin = Location(0, 0)
    distances = []
    for t in range(num_trials):
        field = Field()
        field.add_drunk(Homer, origin)
        distances.append(round(walk(field, Homer, num_steps), 1))
    return distances


def drunk_test(walk_lengths, num_trials, drunk_class):
    for num_steps in walk_lengths:
        distances = simulate_walks(num_steps, num_trials, drunk_class)
        print(drunk_class.__name__, 'random walk of', num_steps, 'steps')
        print(' Mean =', round(sum(distances) / len(distances), 4))
        print(' Max =', max(distances))
        print(' Min =', min(distances))


drunk_test((0, 1, 2, 10000), 100, UsualDrunk)