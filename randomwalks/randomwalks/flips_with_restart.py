import random
from collections import Counter

import numpy as np
import matplotlib.pyplot as plt

current_int = 0
counter = Counter()

for i in range(0, 100000):
    flip = random.choice([-1, -1, 0, 1, 1])
    if flip == 0:
        current_int = 0
    else:
        current_int += flip
    counter.update({current_int: 1})

x = []
y = []
for key in sorted(counter.keys()):
    x.append(key)
    y.append(counter[key])

plt.bar(x, y)
plt.show()
