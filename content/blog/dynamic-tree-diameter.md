---
title: "Solving the Dynamic Tree Diameter Problem: An Elegant Approach using Euler Tours and Segment Trees"
excerpt: "A practical breakdown of maintaining tree diameter under edge-weight updates using Euler Tour flattening and Segment Tree with lazy propagation, with full C++ implementation."
date: "2026-04-05"
category: "Tutorial"
tags: ["Tree","Segment Tree","Euler Tour","LCA","Codeforces","Advanced"]
published: true
---
Calculating the diameter of a tree—the longest path between any two nodes—is a classic algorithmic problem, easily solved in linear time using two Depth First Searches (DFS). But what happens when the tree is **dynamic**? If edge weights are constantly updated, recalculating the diameter from scratch every time is too slow.

To solve this efficiently, we must move away from standard graph traversals and combine two powerful concepts: **Tree Flattening (Euler Tour)** and **Segment Trees with Lazy Propagation**. 

Here is a step-by-step breakdown of how this approach works.

---

## 1. The Mathematical Foundation

First, we need a mathematical way to express the distance between any two nodes, $u$ and $v$. If we arbitrarily root the tree and track the depth of every node (the distance from the root), the distance between $u$ and $v$ is:

$$
dist(u, v) = depth[u] + depth[v] - 2 \cdot depth[LCA(u, v)]
$$

*(Where LCA is the Lowest Common Ancestor of the two nodes).*

The diameter of the tree is simply the maximum possible value of this formula across all possible pairs of nodes. To find this efficiently, we need a way to quickly identify maximum depths and minimum LCA depths.

---

## 2. Flattening the Tree (Euler Tour)

Trees are non-linear, making bulk updates difficult. We can flatten the tree into a 1D array using an Euler Tour. 

As we perform a DFS, we record the node we are currently on every time we step down into it, and every time we backtrack up to it. Alongside the node, we record its current depth. This flattened "depth array" has two magical properties:

* **Subtrees become contiguous ranges:** All nodes within a specific subtree will appear together in a single, contiguous block within the array.
* **LCA becomes a Range Minimum Query:** For any two nodes at indices $i$ and $j$, their LCA is exactly the node with the **minimum depth** located in the subarray between $i$ and $j$.

Finding the tree diameter now translates to finding three indices $i \le k \le j$ in our depth array $A$ that maximize:

$$
A_i + A_j - 2 \cdot A_k
$$

---

## 3. The Segment Tree Magic

We build a Segment Tree over our depth array to maintain this maximum value. To make the divide-and-conquer logic work, each node in the Segment Tree must track five specific pieces of information for its range.

| Variable | Definition | Mathematical Representation |
| :--- | :--- | :--- |
| **`mx`** | The maximum depth in the range. | Maximum $A_i$ |
| **`mn`** | The minimum depth in the range. | Minimum $A_k$ |
| **`lmx`** | Left partial diameter (maximum). | Maximum $(A_i - 2 \cdot A_k)$ for $i \le k$ |
| **`rmx`** | Right partial diameter (maximum). | Maximum $(A_j - 2 \cdot A_k)$ for $k \le j$ |
| **`diam`** | Maximum diameter entirely in this range. | Maximum $(A_i + A_j - 2 \cdot A_k)$ for $i \le k \le j$ |

### Crossing the Boundary
When a parent node merges its Left and Right children, the optimal diameter might be entirely in the Left child, entirely in the Right child, or it might cross the boundary between them. 

If the path crosses the boundary, the LCA (index $k$) could be in the Left child or the Right child. 
* **If LCA is on the Left:** We combine the Left's `lmx` with the Right's `mx`. 
* **If LCA is on the Right:** We combine the Left's `mx` with the Right's `rmx`.

The parent calculates its diameter like this:
$$
diam_{parent} = \max(diam_{left}, diam_{right}, lmx_{left} + mx_{right}, mx_{left} + rmx_{right})
$$

---

## 4. Lazy Propagation for Fast Updates

When an edge weight is updated, the depth of every single node in its subtree shifts by the exact same amount (let's call this $\Delta$). 

Because subtrees are contiguous ranges in our Euler Tour array, an edge update is simply a **range addition** query. We use Lazy Propagation to apply this shift in $O(\log N)$ time. 

The most elegant part of this solution is the relative invariance of the diameter. If you add $\Delta$ to every node in a subtree, `mx`, `mn`, `lmx`, and `rmx` all shift. However, **`diam` remains completely unchanged**! 

$$
(A_i + \Delta) + (A_j + \Delta) - 2 \cdot (A_k + \Delta) = A_i + A_j - 2 \cdot A_k
$$

The $\Delta$ perfectly cancels out, meaning we only need to update the partial components and pass the lazy tag down.

---

## The C++ Implementation

Here is the complete code bringing all these concepts together:

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

const int MAXN = 100005;

struct Edge {
    int u, v;
    long long w;
} edges[MAXN];

vector<pair<int, int>> adj[MAXN];
int edge_child[MAXN];
int in[MAXN], out[MAXN];
int tour[2 * MAXN];
long long depth_arr[MAXN];
int timer = 0;

// Segment Tree Node
struct Node {
    long long mx, mn, lmx, rmx, diam, lazy;
} tree[8 * MAXN];

// Flatten the tree
void dfs(int u, int p, long long d) {
    depth_arr[u] = d;
    in[u] = ++timer;
    tour[timer] = u;
    
    for (auto& edge : adj[u]) {
        int v = edge.first;
        int idx = edge.second;
        if (v != p) {
            edge_child[idx] = v; 
            dfs(v, u, d + edges[idx].w);
            tour[++timer] = u;
        }
    }
    out[u] = timer;
}

// Merge left and right children
void pushup(int node) {
    int left = 2 * node, right = 2 * node + 1;
    
    tree[node].mx = max(tree[left].mx, tree[right].mx);
    tree[node].mn = min(tree[left].mn, tree[right].mn);
    
    tree[node].lmx = max({tree[left].lmx, tree[right].lmx, tree[left].mx - 2 * tree[right].mn});
    tree[node].rmx = max({tree[left].rmx, tree[right].rmx, tree[right].mx - 2 * tree[left].mn});
    
    tree[node].diam = max({tree[left].diam, tree[right].diam, tree[left].lmx + tree[right].mx, tree[left].mx + tree[right].rmx});
}

// Apply range update
void apply(int node, long long val) {
    tree[node].mx += val;
    tree[node].mn += val;
    tree[node].lmx -= val;
    tree[node].rmx -= val;
    tree[node].lazy += val;
    // diam remains unchanged!
}

// Propagate lazy tags
void pushdown(int node) {
    if (tree[node].lazy != 0) {
        apply(2 * node, tree[node].lazy);
        apply(2 * node + 1, tree[node].lazy);
        tree[node].lazy = 0;
    }
}

// Initialize the Segment Tree
void build(int node, int start, int end) {
    tree[node].lazy = 0;
    if (start == end) {
        long long d = depth_arr[tour[start]];
        tree[node].mx = tree[node].mn = d;
        tree[node].lmx = tree[node].rmx = -d;
        tree[node].diam = 0;
        return;
    }
    int mid = start + (end - start) / 2;
    build(2 * node, start, mid);
    build(2 * node + 1, mid + 1, end);
    pushup(node);
}

// Range addition update
void update(int node, int start, int end, int l, int r, long long val) {
    if (l > end || r < start) return;
    if (l <= start && end <= r) {
        apply(node, val);
        return;
    }
    pushdown(node);
    int mid = start + (end - start) / 2;
    update(2 * node, start, mid, l, r, val);
    update(2 * node + 1, mid + 1, end, l, r, val);
    pushup(node);
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    long long n, q, w;
    cin >> n >> q >> w; 

    for (int i = 1; i < n; ++i) {
        cin >> edges[i].u >> edges[i].v >> edges[i].w;
        adj[edges[i].u].push_back({edges[i].v, i});
        adj[edges[i].v].push_back({edges[i].u, i});
    }

    dfs(1, 0, 0);
    build(1, 1, timer);

    long long last = 0;
    
    for (int j = 1; j <= q; ++j) {
        long long d_j, e_j;
        cin >> d_j >> e_j;

        // Problem-specific query transformation
        long long d_prime = (d_j + last) % (n - 1);
        long long e_prime = (e_j + last) % w;

        int idx = d_prime + 1;            
        int child = edge_child[idx];      
        long long delta = e_prime - edges[idx].w;

        // Update the subtree
        update(1, 1, timer, in[child], out[child], delta);
        
        edges[idx].w = e_prime;
        last = tree[1].diam;
        
        cout << last << "\n";
    }

    return 0;
}
```
problem link: https://codeforces.com/contest/1192/problem/B
