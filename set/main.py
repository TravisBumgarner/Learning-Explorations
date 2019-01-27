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

BOARD_SIZE = 12
CARDS_PER_ROW = 3
CARD_WIDTH = 9


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
        symbols = '[' + ' '.join([self.shape] * self.quantity).center(CARD_WIDTH) + ']'
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
            if cards_in_row_counter % CARDS_PER_ROW == 0 and cards_in_row_counter != BOARD_SIZE:
                output += '\n'
        return output

    def populate_board(self, deck):
        board = []
        for _ in range(BOARD_SIZE):
            board.append(deck.next_card())
        return board

    def get_card_by_index(self, index):
        SHIFT_BY_ONE = 1
        index -= SHIFT_BY_ONE

        return self.board[index]

    def replace_card_at_index(self, card, index):
        SHIFT_BY_ONE = 1
        index -= SHIFT_BY_ONE
        self.board[index] = card

    def remove_card_at_index(self, index):
        SHIFT_BY_ONE = 1
        index -= SHIFT_BY_ONE
        self.board[index] = None

    def has_cards(self):
        return len(self.board) > 0


def is_set(potential_set):
    shapes = set()
    quantities = set()
    colors = set()
    # shadings = set()

    for card in potential_set:
        if card is None:
            return False  # Can't match on empty card

        shapes.add(card.shape)
        quantities.add(card.quantity)
        colors.add(card.color)
        # shadings.add(card.shading)

    if len(shapes) == 2 or len(quantities) == 2 or len(colors) == 2:  # or len(shadings) == 2
        return False

    return True


def get_card_indices_from_player():
    raw_input = input('Enter 3 numbers, separated by commas of next moves: ')
    print('\n')

    if len(raw_input) == 0:
        return []

    card_indices = [int(card_index.strip()) for card_index in raw_input.split(',')]
    return card_indices


def is_valid_input(card_indices):
    if len(card_indices) != 3:
        return False

    for index in card_indices:
        if type(index) != int or index < 1 or index > 12:
            return False

    return True


def main():
    deck = Deck()
    board = Board(deck)

    while deck.has_cards() or board.has_cards():
        print(board)
        print(str(deck.remaining_cards()) + " remaining cards in deck\n")

        card_indices = get_card_indices_from_player()

        if not is_valid_input(card_indices):
            print("Input is invalid. A valid input is '1,5,7'\n")
            continue

        potential_set = [board.get_card_by_index(card_index) for card_index in card_indices]

        if is_set(potential_set):
            print('Set!\n')
            for card_index in card_indices:
                if deck.has_cards():
                    new_card = deck.next_card()
                    board.replace_card_at_index(new_card, card_index)
                else:
                    board.remove_card_at_index(card_index)

        else:
            print('Whoops, that doesn\'t look like a set.\n')


if __name__ == "__main__":
    main()
