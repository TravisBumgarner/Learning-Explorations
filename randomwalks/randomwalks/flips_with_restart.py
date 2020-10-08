import random
from collections import Counter

import numpy as np
import matplotlib.pyplot as plt

current_int = 0
counter = Counter()

for i in range(0, n):
    flip = random.choice([-1, -1, 0, 1, 1])
    if flip == 0:
        current_int = 0
    else:
        current_int += flip

x = []
y = []
for key in sorted(counter.keys()):
    x.append(key)
    y.append(counter[key])

plt.bar(x, y)
plt.show()
