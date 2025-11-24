# Simple visualization of a small node network using matplotlib
# This code draws nodes in a circle and connects them with lines (edges).
# It uses only built-in Python and matplotlib (no networkx).
# Copy-paste and run in a local Python environment (Jupyter, script, or REPL).
# When run, it will display a single plot of the network.

import matplotlib.pyplot as plt
import math

# Minimal Node class (same as you used)
class Node:
    def __init__(self, value):
        self.value = value
        self.neighbors = []

# Create nodes
nodes = [Node(i) for i in range(1, 9)]  # 8 nodes with values 1..8

# Connect nodes (make a small-world-ish pattern)
# local ring connections
n = len(nodes)
for i in range(n):
    nodes[i].neighbors.append(nodes[(i+1) % n])  # connect to next (ring)
    nodes[(i+1) % n].neighbors.append(nodes[i])

# add a few random long-range links (manual here)
nodes[0].neighbors.append(nodes[4])
nodes[4].neighbors.append(nodes[0])
nodes[2].neighbors.append(nodes[6])
nodes[6].neighbors.append(nodes[2])

# Prepare drawing positions on a circle
angles = [2*math.pi*i/n for i in range(n)]
positions = {nodes[i]: (math.cos(angles[i]), math.sin(angles[i])) for i in range(n)}

# Matplotlib drawing
fig, ax = plt.subplots(figsize=(6,6))
ax.set_aspect('equal')
ax.axis('off')

# draw edges (avoid drawing duplicate edges twice)
drawn = set()
for i, node in enumerate(nodes):
    x1, y1 = positions[node]
    for neigh in node.neighbors:
        # find indices for consistent ordering
        j = nodes.index(neigh)
        edge = tuple(sorted((i, j)))
        if edge in drawn:
            continue
        drawn.add(edge)
        x2, y2 = positions[neigh]
        ax.plot([x1, x2], [y1, y2])  # draw line for edge

# draw nodes
for i, node in enumerate(nodes):
    x, y = positions[node]
    ax.scatter([x], [y], s=150)
    ax.text(x, y, str(node.value), fontsize=12, ha='center', va='center', weight='bold')

ax.set_title("Simple Node Network (ring + long links)")
plt.show()

# Also print adjacency list to console for clarity
print("Adjacency list:")
for node in nodes:
    neigh_vals = [n.value for n in node.neighbors]
    print(f"Node {node.value}: {neigh_vals}")
