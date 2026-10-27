# Winning Is Impossible -- the page's contract.
#
# The front end plays whatever `key` answers, and the laws bind only
# Moves: so `key` must answer a Maybe<Move>, and the checker holds
# main.bend to it on every submit. The laws' own terms pin start, replay
# and is_won; LAWS.drawn pins map_h and grid; the page reads the rest.
# The AI never sees this file: a rejection quotes it.

import Base
import ./main.bend as Game

def key(k: U32) -> Maybe<Game.Move>:
  Game.key(k)
