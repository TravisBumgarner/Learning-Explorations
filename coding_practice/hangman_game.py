class Letter:
    def __init__(self, letter):
        self.value = letter
        self.was_guessed = False
    
    def does_match(self, guess):
        return self.value == guess

    def reveal(self):
        self.was_guessed = True
            
    def __str__(self):
        return self.value if self.was_guessed else '*'

class Hangman:
    def __init__(self):
        phrase = self.setup_game()

        self.phrase = [Letter(letter) for letter in phrase]
        self.unguessed_letters = len(phrase)
        self.remaining_guesses = 10
        self.guesses = set([])
        self.print_progress()

    def setup_game(self):
        has_phrase = False
        
        while not has_phrase:
            phrase = input("What word shall we play with: ").lower()
            has_phrase = phrase.isalpha() and len(phrase) > 0
        print('\n' * 20)
        return phrase

    def is_gameover(self):
        is_playing = self.remaining_guesses > 0 and self.unguessed_letters > 0

        if not is_playing:
            has_won = self.unguessed_letters == 0
            print("Yay" if has_won else "Womp")
            return True

        return False

    def take_turn(self):
        guess = input("Guess a letter: ").lower()

        if len(guess) != 1 or not guess.isalpha():
            print("Please enter a single alpha character.")
            return

        if guess in self.guesses:
            print("You've already guessed this character.")
            return

        self.guesses.add(guess)
        self.remaining_guesses -= 1

        for letter in self.phrase:
            if letter.does_match(guess):
                letter.reveal()
                self.unguessed_letters -= 1
            
        self.print_progress()

    def print_progress(self):
        user_progress = "".join([str(letter) for letter in self.phrase])

        print("\n" * 20)
        print(f"Current Progress: {user_progress}")
        print(f"Guesses Remaining: {str(self.remaining_guesses)}")

def main():
    hangman = Hangman()
    while not hangman.is_gameover():
        hangman.take_turn()
        
        












if __name__ == "__main__":
    main()