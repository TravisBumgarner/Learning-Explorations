import random

# Todo
# 1. Add way to add more than 12 cards
# 3. Add way to handle end of game

SHAPES = ["<>", "()", "$$"]
QUANTITIES = [1, 2, 3]
# Colors and Shadings are in ANSI
RED = '124'
GREEN = '71'
PURPLE = '92'
COLORS = [RED, GREEN, PURPLE]
LIGHT = '245'
MEDIUM = '250'
DARK = '255'
# SHADINGS = [LIGHT, MEDIUM, DARK]

STARTING_BOARD_SIZE = 12
CARDS_PER_ROW = 3
CARD_WIDTH = 10


class Card(object):
    def __init__(self, shape, quantity, color):  # shading
        self.shape = shape
        self.quantity = quantity
        self.color = color
        # self.shading = shading

    # def __str__(self):
    #     return self.shape[0].upper() + '-' + self.quantity + '-' + self.color[0].upper() + '-' + self.shading[0].upper()

    def __str__(self):
        foreground = f'\033[38;5;{self.color}m'
        background = ''  # f'\033[48;5;{self.shading}m'
        symbols = '[' + '  '.join([self.shape] * self.quantity).center(CARD_WIDTH) + ']'
        reset = '\u001b[0m'

        return foreground + background + symbols + reset


class Deck(object):
    def __init__(self):
        self.cards = self.__make_cards()
        self.__shuffle()

    def __make_cards(self):
        cards = []
        for shape in SHAPES:
            for quantity in QUANTITIES:
                for color in COLORS:
                    card = Card(shape=shape, quantity=quantity, color=color)
                    cards.append(card)
                    # for shading in SHADINGS:
                    #    card = Card(shape=shape, quantity=quantity, color=color, shading=shading)
                    #    cards.append(card)
        return cards

    def __shuffle(self):
        random.shuffle(self.cards)

    def print(self):
        for card in self.cards:
            print(card)

    def has_cards(self):
        return len(self.cards) > 0

    def remaining_cards(self):
        return len(self.cards)

    def next_card(self):
        return self.cards.pop()


class Board(object):
    def __init__(self, deck):
        self.board = self.populate_board(deck)

    def __str__(self):
        output = ''
        cards_in_row_counter = 0
        for card in self.board:
            if card is not None:
                output += str(card)
            else:
                output += '[' + ' ' * (CARD_WIDTH) + ']'
            cards_in_row_counter += 1
            if cards_in_row_counter % CARDS_PER_ROW == 0:  # and cards_in_row_counter != BOARD_SIZE:
                output += '\n'
        return output

    def populate_board(self, deck):
        board = []
        for _ in range(STARTING_BOARD_SIZE):
            board.append(deck.next_card())
        return board

    def get_card_by_index(self, index):
        return self.board[index]

    def size(self):
        return len(self.board)

    def replace_card_at_index(self, card, index):
        self.board[index] = card

    def remove_cards(self, indices_to_remove):
        modified_board = []

        for index, card in enumerate(self.board):
            if index not in indices_to_remove:
                modified_board.append(card)
        self.board = modified_board

    def has_cards(self):
        return len(self.board) > 0

    def add_card(self, card):
        self.board.append(card)


def is_set(potential_set):
    shapes = set()
    quantities = set()
    colors = set()
    # shadings = set()

    for card in potential_set:
        shapes.add(card.shape)
        quantities.add(card.quantity)
        colors.add(card.color)
        # shadings.add(card.shading)

    if len(shapes) == 2 or len(quantities) == 2 or len(colors) == 2:  # or len(shadings) == 2
        return False

    return True


def get_user_input():
    raw_input = input('Enter 3 numbers, separated by commas of next moves: ')
    print('\n')
    return raw_input


def get_card_indices(raw_input):
    SHIFT_BY_ONE = 1

    if len(raw_input) == 0:
        return []

    try:
        return [int(card_index.strip()) - SHIFT_BY_ONE for card_index in raw_input.split(',')]
    except ValueError:
        return []


def is_valid_input(card_indices, current_board_size):
    if len(card_indices) != 3:
        return False

    for index in card_indices:
        if type(index) != int or index < 0 or index > current_board_size:
            return False

    return True


def main():
    deck = Deck()
    board = Board(deck)
    sets_found = 0

    while deck.has_cards() or board.has_cards():
        print(board)
        print(str(deck.remaining_cards()) + " remaining cards in deck\n")

        raw_input = get_user_input()

        if raw_input == "more":
            for _ in range(3):
                card = deck.next_card()
                board.add_card(card)
            continue

        if raw_input == "end":
            break

        card_indices = get_card_indices(raw_input)
        if not is_valid_input(card_indices, board.size()):
            print("Input is invalid. A valid input is '1,5,7'\n")
            continue

        potential_set = [board.get_card_by_index(card_index) for card_index in card_indices]

        if is_set(potential_set):
            print('Set!\n')
            sets_found += 1
            if deck.has_cards() and board.size() < STARTING_BOARD_SIZE:
                for card_index in card_indices:
                    new_card = deck.next_card()
                    board.replace_card_at_index(new_card, card_index)
            else:
                board.remove_cards(card_indices)

        else:
            print('Whoops, that doesn\'t look like a set.\n')

    print(f'Your score was {sets_found}')


if __name__ == "__main__":
    main()
