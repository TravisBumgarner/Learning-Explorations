import re
from typing import Tuple, List
import random


def roll(num_dice: int = 1, sides: int = 20) -> Tuple[List[int], int]:
    rolls = sorted(
        [random.choice(range(1, sides + 1)) for _ in range(num_dice)], reverse=True
    )
    return (rolls, sum(rolls))


def parse_dice_string(dice_string: str) -> Tuple[int, int]:
    # extract digits from dice-roll strings like "2D6" with regex witchcraft
    hit = re.search(r"(\d*)[dD](\d+)", dice_string)
    if not hit:
        raise ValueError("bad string")

    count, sides = hit.groups()
    count_int = int(count or 1)  # regex hits on "" for 1st digit, munge to 1
    sides_int = int(sides)
    return (count_int, sides_int)


def roll_from_string(dice_string: str) -> Tuple[List[int], int, str]:
    count, sides = parse_dice_string(dice_string)
    rolls, total = roll(num_dice=count, sides=sides)
    return (rolls, total, f"{count}D{sides}")