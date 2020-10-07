import random
from collections import Counter

import numpy as np
import matplotlib.pyplot as plt

current_int = 0
counter = Counter()
flip_counter = Counter()

for i in range(0, 10000000):
    flip = random.choice([-1, 1])
    current_int += flip
    counter.update({current_int: 1})
    flip_counter.update({flip: 1})

print(flip_counter)
x = []
y = []

for key in sorted(counter.keys()):
    x.append(key)
    y.append(counter[key])

plt.bar(x, y)
plt.show()
