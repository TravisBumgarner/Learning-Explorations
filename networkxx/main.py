import networkx as nx
import matplotlib.pyplot as plt

G = nx.Graph()
G.add_node(1)
nx.draw(G, with_labels=True, font_weight='bold')
plt.show()