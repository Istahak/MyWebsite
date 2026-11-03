---
title: "Rerooting DP: The Answer for Every Root in O(n)"
excerpt: "Rerooting turns one tree DP into answers for every possible root in linear time. Learn the idea from pictures, trace it by hand on a small tree, then solve six classic problems and reuse one tested template."
date: "2026-11-03"
category: "Tutorial"
tags: ["Rerooting","Tree DP","Dynamic Programming","Trees","Competitive Programming"]
published: true
---
Many tree problems ask the same question **once for every vertex**:

- For every vertex `v`, what is the sum of distances from `v` to all other vertices?
- For every vertex `v`, how far is the farthest vertex?
- Which vertex is the best root?

You already know how to answer this for **one** root with a DFS. Doing that DFS from every vertex costs `O(n)` each, so `O(n²)` in total. With `n = 2 * 10^5`, that is `4 * 10^10` steps, which is far too slow.

**Rerooting** gives all `n` answers in `O(n)` total. You run two passes over the tree: one going up, one going down. That is the whole trick, and these notes build it up step by step.

> [!NOTE]
> This post assumes you can write a basic subtree DP, such as subtree sizes. If tree DP itself is new to you, read [How to Think About Dynamic Programming on Trees](/blog/dp-on-trees) first.

---

## The one idea behind rerooting

Take a tree rooted at vertex `1`, and move the root to its neighbor `3`.

<figure class="diagram">
<svg viewBox="0 0 520 310" role="img" aria-label="A six-vertex tree. Moving the root from 1 to 3 brings vertices 3 and 6 one step closer and pushes vertices 1, 2, 4 and 5 one step farther.">
  <path class="edge" d="M260 45 L150 130 M150 130 L90 215 M150 130 L210 215 M370 130 L370 215"/>
  <path class="arrow" d="M260 45 L370 130"/>
  <text class="note start" x="322" y="68">root moves</text>
  <circle class="node up" cx="260" cy="45" r="22"/><text x="260" y="45">1</text>
  <circle class="node up" cx="150" cy="130" r="22"/><text x="150" y="130">2</text>
  <circle class="node down" cx="370" cy="130" r="22"/><text x="370" y="130">3</text>
  <circle class="node up" cx="90" cy="215" r="22"/><text x="90" y="215">4</text>
  <circle class="node up" cx="210" cy="215" r="22"/><text x="210" y="215">5</text>
  <circle class="node down" cx="370" cy="215" r="22"/><text x="370" y="215">6</text>
  <circle class="node down" cx="40" cy="268" r="8"/><text class="note start" x="56" y="268">3, 6 (the subtree of 3): 1 step closer</text>
  <circle class="node up" cx="40" cy="294" r="8"/><text class="note start" x="56" y="294">1, 2, 4, 5 (everything else): 1 step farther</text>
</svg>
<figcaption>Moving the root across one edge changes only one parent-child relation.</figcaption>
</figure>

Look at what changed:

- The edge `1 - 3` flipped. Before, `3` was the child of `1`. Now `1` is the child of `3`.
- **Every other edge kept its direction.** The subtree of `2` is still `{2, 4, 5}`, and the subtree of `6` is still `{6}`.

So the answer for root `3` is **the answer for root `1` with one edge fixed**. If you can do that fix in `O(1)` (or `O(degree)`), you can walk the root over the whole tree and get every answer in `O(n)`.

---

## Worked example: sum of distances

**Problem** ([CSES 1133, Tree Distances II](https://cses.fi/problemset/task/1133)): for every vertex `v`, print the sum of distances from `v` to all other vertices.

We use this tree (`n = 6`) for the whole post:

```text
edges: 1-2, 1-3, 2-4, 2-5, 3-6
```

### Step 1: solve it for one root

Root the tree at `1`. For each vertex `v`, compute two values in its subtree:

- `sz[v]`: the number of vertices in the subtree of `v`.
- `down[v]`: the sum of distances from `v` to every vertex in its subtree.

When you go from child `c` up to its parent `v`, every vertex in `c`'s subtree gets **one step farther**. There are `sz[c]` of them, so, summing over the children `c` of `v`:

$$
down[v] = \sum_{c} \big(down[c] + sz[c]\big)
$$

| `v` | children | `sz[v]` | `down[v]` |
|---|---|---|---|
| 4 | none | 1 | 0 |
| 5 | none | 1 | 0 |
| 6 | none | 1 | 0 |
| 2 | 4, 5 | 3 | `(0 + 1) + (0 + 1) = 2` |
| 3 | 6 | 2 | `(0 + 1) = 1` |
| 1 | 2, 3 | 6 | `(2 + 3) + (1 + 2) = 8` |

The root's subtree is the whole tree, so **`ans[1] = down[1] = 8`**. Check: from `1`, the distances are `1, 1, 2, 2, 2`, and their sum is `8`.

### Step 2: move the root across one edge

Move the root from parent `p` to child `c`, as in the picture above:

- The `sz[c]` vertices in the subtree of `c` each get **1 step closer**: `-sz[c]`.
- The other `n - sz[c]` vertices each get **1 step farther**: `+(n - sz[c])`.

$$
\begin{aligned}
ans[c] &= ans[p] - sz[c] + (n - sz[c]) \\
       &= ans[p] + n - 2 \cdot sz[c]
\end{aligned}
$$

That is the whole reroot step. It uses only `ans[p]`, which we already know, and `sz[c]`, which pass 1 computed.

### Step 3: fill every answer from the top

Process vertices from the root down, so a parent is always done before its children:

| `v` | parent | `ans[v] = ans[p] + 6 - 2 * sz[v]` |
|---|---|---|
| 1 | none | `8` (from step 1) |
| 2 | 1 | `8 + 6 - 6 = 8` |
| 3 | 1 | `8 + 6 - 4 = 10` |
| 4 | 2 | `8 + 6 - 2 = 12` |
| 5 | 2 | `8 + 6 - 2 = 12` |
| 6 | 3 | `10 + 6 - 2 = 14` |

Check one by hand: from `6`, the distances are `3: 1`, `1: 2`, `2: 3`, `4: 4`, `5: 4`, and their sum is `14`.

### The code

Deep trees (a path of `2 * 10^5` vertices) can overflow the recursion stack, so we **never recurse**. A BFS gives an order where every parent comes before its children:

- Walk that order **backwards** to see children first (pass 1).
- Walk it **forwards** to see parents first (pass 2).

Every solution in this post uses this helper:

```cpp
// BFS from root r. Afterwards every parent appears in `order` before its
// children, and par[v] is the parent of v (-1 for the root).
void rootAt(const vector<vector<int>>& g, int r, vector<int>& order, vector<int>& par) {
    int n = g.size();
    order.assign(1, r);
    par.assign(n, -1);
    for (int i = 0; i < (int)order.size(); ++i) {
        int v = order[i];
        for (int u : g[v]) if (u != par[v]) { par[u] = v; order.push_back(u); }
    }
}
```

```cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;

// rootAt(...) from above goes here

int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
    int n; cin >> n;
    vector<vector<int>> g(n);
    for (int i = 0; i < n - 1; ++i) {
        int a, b; cin >> a >> b; --a; --b;
        g[a].push_back(b); g[b].push_back(a);
    }

    vector<int> order, par;
    rootAt(g, 0, order, par);

    vector<ll> sz(n, 1), down(n, 0), ans(n);
    for (int i = n - 1; i > 0; --i) {          // pass 1: children first
        int v = order[i], p = par[v];
        sz[p] += sz[v];
        down[p] += down[v] + sz[v];
    }
    ans[0] = down[0];
    for (int i = 1; i < n; ++i) {              // pass 2: parents first
        int v = order[i];
        ans[v] = ans[par[v]] + n - 2 * sz[v];
    }

    for (int v = 0; v < n; ++v) cout << ans[v] << " \n"[v == n - 1];
}
```

---

## The general pattern: `down` and `up`

The sum-of-distances formula was neat because we could write `ans[c]` straight from `ans[p]`. Most problems are not that clean, so here is the general way to think. It always works.

Cut the edge between a vertex `v` and its parent. The tree splits into two parts:

<figure class="diagram">
<svg viewBox="0 0 520 310" role="img" aria-label="For vertex 2, down[2] covers its subtree 2, 4, 5; up[2] covers the rest of the tree 1, 3, 6.">
  <path class="edge" d="M260 45 L370 130 M150 130 L90 215 M150 130 L210 215 M370 130 L370 215"/>
  <path class="arrow skip" d="M260 45 L150 130"/>
  <text class="note start" x="94" y="72">cut</text>
  <circle class="node up" cx="260" cy="45" r="22"/><text x="260" y="45">1</text>
  <circle class="node down" cx="150" cy="130" r="22"/><text x="150" y="130">2</text>
  <circle class="node up" cx="370" cy="130" r="22"/><text x="370" y="130">3</text>
  <circle class="node down" cx="90" cy="215" r="22"/><text x="90" y="215">4</text>
  <circle class="node down" cx="210" cy="215" r="22"/><text x="210" y="215">5</text>
  <circle class="node up" cx="370" cy="215" r="22"/><text x="370" y="215">6</text>
  <circle class="node down" cx="40" cy="268" r="8"/><text class="note start" x="56" y="268">down[2]: the subtree of 2</text>
  <circle class="node up" cx="40" cy="294" r="8"/><text class="note start" x="56" y="294">up[2]: everything else, seen from 2</text>
</svg>
<figcaption>Every vertex sees the tree as its own subtree plus one extra "parent side" subtree.</figcaption>
</figure>

- **`down[v]`**: the DP value of the subtree of `v`. This is the normal tree DP.
- **`up[v]`**: the DP value of **everything outside** the subtree of `v`, treated as one more subtree hanging from `v` through its parent.

Now picture `v` as the root. Its neighbors are its children plus its parent. **Each child brings `down[child]`, and the parent brings `up[v]`.** Combine them the same way the normal DP combines children, and you have the full answer for `v`.

The two values come from two passes:

<figure class="diagram">
<svg viewBox="0 0 560 250" role="img" aria-label="Pass 1 sends values from children up to parents. Pass 2 sends values from parents down to children.">
  <defs>
    <marker id="rr-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="currentColor"/>
    </marker>
  </defs>
  <path class="arrow" marker-end="url(#rr-arrow)" d="M94.3 93.3 L124.4 58.2"/>
  <path class="arrow" marker-end="url(#rr-arrow)" d="M185.7 93.3 L155.6 58.2"/>
  <path class="arrow" marker-end="url(#rr-arrow)" d="M50.9 160.9 L68.1 130.8"/>
  <path class="arrow" marker-end="url(#rr-arrow)" d="M109.1 160.9 L91.9 130.8"/>
  <path class="arrow" marker-end="url(#rr-arrow)" d="M404.4 58.2 L374.3 93.3"/>
  <path class="arrow" marker-end="url(#rr-arrow)" d="M435.6 58.2 L465.7 93.3"/>
  <path class="arrow" marker-end="url(#rr-arrow)" d="M348.1 130.8 L330.9 160.9"/>
  <path class="arrow" marker-end="url(#rr-arrow)" d="M371.9 130.8 L389.1 160.9"/>
  <circle class="node down" cx="140" cy="40" r="18"/><circle class="node down" cx="80" cy="110" r="18"/><circle class="node down" cx="200" cy="110" r="18"/><circle class="node down" cx="40" cy="180" r="18"/><circle class="node down" cx="120" cy="180" r="18"/>
  <circle class="node up" cx="420" cy="40" r="18"/><circle class="node up" cx="360" cy="110" r="18"/><circle class="node up" cx="480" cy="110" r="18"/><circle class="node up" cx="320" cy="180" r="18"/><circle class="node up" cx="400" cy="180" r="18"/>
  <text x="140" y="215">pass 1: down[]</text>
  <text class="note" x="140" y="238">leaves first, child → parent</text>
  <text x="420" y="215">pass 2: up[]</text>
  <text class="note" x="420" y="238">root first, parent → child</text>
</svg>
<figcaption>Pass 1 is the tree DP you already know. Pass 2 pushes the "outside" information back down.</figcaption>
</figure>

1. **Pass 1 (children first):** compute `down[v]` from the `down` values of its children.
2. **Pass 2 (parents first):** compute `up[c]` for each child `c` of `v`. The "outside" of `c` is everything `v` can see **except `c` itself**: `up[v]` plus `down` of every other child of `v`, combined at `v`.

The words "except `c` itself" are where all the difficulty lives. The next section is about exactly that.

---

## How to think about any rerooting problem

When you meet a new problem, answer these four questions in order.

### Question 1: what is the DP for one fixed root?

Write `down[v]` in one plain sentence, such as "the sum of distances from `v` to its subtree" or "the height of the subtree of `v`". **If you cannot solve the problem for one root, rerooting cannot help yet.**

### Question 2: what does a child send to its parent?

Split the DP into two operations:

- **Lift**: what `down[c]` turns into when it crosses the edge to the parent. For distances, every vertex gets one step farther (`+ sz[c]`). For heights, it is `+ 1`.
- **Merge**: how the parent combines what its children send: `+`, `max`, `*`, and so on.

### Question 3: what changes when the root moves from `p` to `c`?

Only the edge `p - c` changes direction. Everything that `p` saw **except `c`** becomes one new child of `c`. That "everything except `c`" is `up[c]`.

### Question 4: can I remove one child from a merge?

This decides how to compute "everything except `c`":

| merge | can you undo it? | how to exclude one child |
|---|---|---|
| `+` (sum) | yes | subtract it |
| `xor` | yes | xor it again |
| `max`, `min` | no | keep the **best two** values |
| `*` mod a prime | only if no factor is `0` | prefix and suffix products |
| `*` mod any `M`, `gcd`, ... | no | prefix and suffix |

> [!TIP]
> **When in doubt, use prefix and suffix.** It always works, for any merge, in `O(degree)` per vertex. Subtracting or keeping the best two are shortcuts for special cases.

---

## Example 2: the farthest vertex (keep the best two)

**Problem** ([CSES 1132, Tree Distances I](https://cses.fi/problemset/task/1132)): for every vertex, find the distance to the farthest vertex.

**Answering the four questions:**

1. `down[v]` = height of the subtree of `v` (longest path going down).
2. Lift is `+ 1` and merge is `max`.
3. `up[c]` = the longest path that starts at `c` and goes through its parent `p` first.
4. `max` cannot be undone. If the best child of `p` is `c` itself, we need the **second** best. So we store the top two heights at each vertex, and which child gave the best one.

The parent side of `c` is "go to `p` (1 step), then either go up from `p` or go down into a sibling of `c`":

```text
up[c] = 1 + max( up[p], best height of p NOT using c )
ans[v] = max( best1[v], up[v] )
```

Trace on our tree (rooted at `1`; `best1` and `best2` are the two largest values of `height(child) + 1`):

| `v` | `best1` | `best2` | `best1` comes from | `up[v]` | `ans[v]` |
|---|---|---|---|---|---|
| 1 | 2 | 2 | 3 | 0 (root) | 2 |
| 2 | 1 | 1 | 5 | `1 + max(0, best1[1] = 2) = 3` | 3 |
| 3 | 1 | 0 | 6 | `1 + max(0, best2[1] = 2) = 3` | 3 |
| 4 | 0 | 0 | none | `1 + max(3, best1[2] = 1) = 4` | 4 |
| 5 | 0 | 0 | none | `1 + max(3, best2[2] = 1) = 4` | 4 |
| 6 | 0 | 0 | none | `1 + max(3, best2[3] = 0) = 4` | 4 |

Look at vertex `3`: the best child of `1` is `3` itself, so it uses `best2[1]`. That one branch is the whole trick.

```cpp
int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
    int n; cin >> n;
    vector<vector<int>> g(n);
    for (int i = 0; i < n - 1; ++i) {
        int a, b; cin >> a >> b; --a; --b;
        g[a].push_back(b); g[b].push_back(a);
    }

    vector<int> order, par;
    rootAt(g, 0, order, par);

    vector<int> best1(n, 0), best2(n, 0), bestChild(n, -1), up(n, 0);
    for (int i = n - 1; i > 0; --i) {
        int v = order[i], p = par[v];
        int h = best1[v] + 1;
        if (h > best1[p]) { best2[p] = best1[p]; best1[p] = h; bestChild[p] = v; }
        else if (h > best2[p]) best2[p] = h;
    }
    for (int i = 1; i < n; ++i) {
        int v = order[i], p = par[v];
        int sibling = (bestChild[p] == v) ? best2[p] : best1[p];
        up[v] = 1 + max(up[p], sibling);
    }

    for (int v = 0; v < n; ++v) cout << max(best1[v], up[v]) << " \n"[v == n - 1];
}
```

---

## Example 3: the best capital (edge costs)

**Problem** ([Codeforces 219D, Choosing Capital for Treeland](https://codeforces.com/problemset/problem/219/D)): the roads of a tree are **one-way**. Choose a capital so that every city can be reached from it, reversing as few roads as possible. Print the minimum, and every city that achieves it.

**How to think:**

1. With a fixed root, every road must point **away** from the root. The cost is the number of roads that point toward the root.
2. Give each road a cost: `0` if it points from parent to child (good), `1` if it points from child to parent (must reverse).
3. Move the root from `p` to `c`: **only the road `p - c` changes its role.** Every other road keeps its parent and child.
   - If the road was `p → c` (cost `0`), it now points toward the new root: cost `+1`.
   - If the road was `c → p` (cost `1`), it now points away: cost `-1`.

```text
ans[c] = ans[p] + (road is p → c ? +1 : -1)
```

```cpp
int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
    int n; cin >> n;
    // g[v] holds (u, cost): cost = 1 when the road is u -> v, so going v -> u needs a reversal
    vector<vector<pair<int,int>>> g(n);
    for (int i = 0; i < n - 1; ++i) {
        int s, t; cin >> s >> t; --s; --t;
        g[s].push_back({t, 0});
        g[t].push_back({s, 1});
    }

    vector<int> order(1, 0), par(n, -1), parCost(n, 0);
    for (int i = 0; i < (int)order.size(); ++i) {
        int v = order[i];
        for (auto& e : g[v]) if (e.first != par[v]) {
            par[e.first] = v; parCost[e.first] = e.second; order.push_back(e.first);
        }
    }

    vector<int> ans(n, 0);
    for (int v = 1; v < n; ++v) ans[0] += parCost[v];
    for (int i = 1; i < n; ++i) {
        int v = order[i];
        ans[v] = ans[par[v]] + (parCost[v] == 0 ? 1 : -1);
    }

    int best = *min_element(ans.begin(), ans.end());
    cout << best << "\n";
    for (int v = 0; v < n; ++v) if (ans[v] == best) cout << v + 1 << " ";
    cout << "\n";
}
```

The lesson: **sometimes the "DP" is only a count over edges**, and rerooting is just noticing that one move changes one edge.

---

## Example 4: weighted distances

**Problem** ([Codeforces 1092F, Tree with Maximum Cost](https://codeforces.com/problemset/problem/1092/F)): every vertex `u` has a weight `a[u]`. For a root `v`, the cost is the sum of `dist(v, u) * a[u]`. Find the maximum cost over all roots.

This is example 1 with weights. Replace "count of vertices" with "sum of weights":

- `sub[v]` = sum of `a` in the subtree of `v` (instead of `sz[v]`).
- `total` = sum of all `a` (instead of `n`).
- Moving the root `p → c`: the subtree of `c` gets 1 step closer (`-sub[c]`), and the rest gets 1 step farther (`+(total - sub[c])`).

```text
ans[c] = ans[p] + total - 2 * sub[c]
```

```cpp
int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
    int n; cin >> n;
    vector<ll> a(n);
    for (auto& x : a) cin >> x;
    vector<vector<int>> g(n);
    for (int i = 0; i < n - 1; ++i) {
        int u, v; cin >> u >> v; --u; --v;
        g[u].push_back(v); g[v].push_back(u);
    }

    vector<int> order, par;
    rootAt(g, 0, order, par);

    ll total = accumulate(a.begin(), a.end(), 0LL);
    vector<ll> sub(a), down(n, 0), ans(n);
    for (int i = n - 1; i > 0; --i) {
        int v = order[i], p = par[v];
        sub[p] += sub[v];
        down[p] += down[v] + sub[v];
    }
    ans[0] = down[0];
    for (int i = 1; i < n; ++i) {
        int v = order[i];
        ans[v] = ans[par[v]] + total - 2 * sub[v];
    }

    cout << *max_element(ans.begin(), ans.end()) << "\n";
}
```

**Learning to spot "this is example 1 again" is half of rerooting.** Many problems are the same move with different weights.

---

## Example 5: counting, where you cannot divide (prefix and suffix)

**Problem** ([AtCoder EDPC V, Subtree](https://atcoder.jp/contests/dp/tasks/dp_v)): for every vertex `v`, count the connected vertex sets that contain `v`, modulo `M`. **`M` is not necessarily prime.**

**Answering the four questions:**

1. `down[v]` = number of connected sets inside the subtree of `v` that contain `v`. Each child `c` is either left out (1 way) or joined through `c` (`down[c]` ways), and children are independent:
   ```text
   down[v] = product over children c of (down[c] + 1)
   ```
2. Lift is `+ 1`, and merge is `*`.
3. `up[c]` = number of connected sets on the parent side of `c` that contain `p`.
4. Excluding `c` from a product means dividing by `down[c] + 1`. **Modulo a non-prime `M`, that inverse may not exist.** Even modulo a prime, `down[c] + 1` can be `0 (mod M)`. So we use prefix and suffix products.

### The prefix and suffix trick

List the children of `v` as `c1, c2, ..., ck`. Build:

- `pre[j]` = the merge of the first `j` children.
- `suf[j]` = the merge of children `j, j + 1, ..., k - 1` (0-indexed).

Then "every child except index `j`" is `pre[j] ⊕ suf[j + 1]`, with no undo needed.

<figure class="diagram">
<svg viewBox="0 0 520 215" role="img" aria-label="To merge every child except c3, combine the prefix of c1 and c2 with the suffix of c4 and c5.">
  <path class="edge" d="M260 40 L70 130 M260 40 L165 130 M260 40 L355 130 M260 40 L450 130"/>
  <path class="edge skip" d="M260 40 L260 130"/>
  <circle class="node" cx="260" cy="40" r="22"/><text x="260" y="40">v</text>
  <circle class="node down" cx="70" cy="130" r="22"/><text x="70" y="130">c1</text>
  <circle class="node down" cx="165" cy="130" r="22"/><text x="165" y="130">c2</text>
  <circle class="node skip" cx="260" cy="130" r="22"/><text x="260" y="130">c3</text>
  <circle class="node up" cx="355" cy="130" r="22"/><text x="355" y="130">c4</text>
  <circle class="node up" cx="450" cy="130" r="22"/><text x="450" y="130">c5</text>
  <path class="arrow" d="M46 166 L46 174 L189 174 L189 166 M331 166 L331 174 L474 174 L474 166"/>
  <text class="note" x="117" y="196">pre[2] = c1 ⊕ c2</text>
  <text class="note" x="260" y="170">skip</text>
  <text class="note" x="402" y="196">suf[3] = c4 ⊕ c5</text>
</svg>
<figcaption>Everything except c3 = pre[2] ⊕ suf[3]. Two arrays, built once per vertex in O(degree).</figcaption>
</figure>

For this problem, the parent side of child `c` (index `j`) is:

```text
up[c] = (up[v] + 1) * pre[j] * suf[j + 1]          (all mod M)
ans[v] = down[v] * (up[v] + 1)
```

The `up[v] + 1` factor treats the parent side as one more child of `v`: either leave it out (`1`) or join it (`up[v]` ways). For the root, `up = 0`, so the factor is `1`.

```cpp
int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
    int n; ll M; cin >> n >> M;
    vector<vector<int>> g(n);
    for (int i = 0; i < n - 1; ++i) {
        int a, b; cin >> a >> b; --a; --b;
        g[a].push_back(b); g[b].push_back(a);
    }

    vector<int> order, par;
    rootAt(g, 0, order, par);

    vector<ll> down(n, 1 % M), up(n, 0), ans(n);
    for (int i = n - 1; i > 0; --i) {
        int v = order[i], p = par[v];
        down[p] = down[p] * (down[v] + 1) % M;
    }

    for (int v : order) {
        vector<int> ch;
        for (int u : g[v]) if (u != par[v]) ch.push_back(u);
        int k = ch.size();
        vector<ll> pre(k + 1, 1 % M), suf(k + 1, 1 % M);
        for (int j = 0; j < k; ++j) pre[j + 1] = pre[j] * (down[ch[j]] + 1) % M;
        for (int j = k - 1; j >= 0; --j) suf[j] = suf[j + 1] * (down[ch[j]] + 1) % M;

        ll top = (up[v] + 1) % M;                       // the parent side, as one more child
        for (int j = 0; j < k; ++j) up[ch[j]] = top * pre[j] % M * suf[j + 1] % M;
        ans[v] = down[v] * top % M;
    }

    for (int v = 0; v < n; ++v) cout << ans[v] << "\n";
}
```

---

## A reusable template

Every example above has the same shape. Once you name the pieces, you can write the rerooting once and only plug in the problem:

| piece | meaning | farthest vertex | connected sets |
|---|---|---|---|
| `e` | merge of zero children | `0` | `1` |
| `merge(a, b)` | combine two neighbors | `max(a, b)` | `a * b % M` |
| `add_edge(x)` | lift a value across an edge | `x + 1` | `(x + 1) % M` |
| `add_vertex(x, v)` | turn merged neighbors into `dp[v]` | `x` | `x` |

```cpp
// dp[v] = add_vertex( merge over neighbors u of add_edge(dp of u's side) , v )
// merge must be associative and commutative, with identity e.
template <class T, class Merge, class AddEdge, class AddVertex>
vector<T> reroot(const vector<vector<int>>& g, T e, Merge merge, AddEdge add_edge, AddVertex add_vertex) {
    int n = g.size();
    vector<int> order, par;
    rootAt(g, 0, order, par);

    vector<T> down(n, e), up(n, e), ans(n, e);
    for (int i = n - 1; i >= 0; --i) {                     // pass 1
        int v = order[i];
        T acc = e;
        for (int u : g[v]) if (u != par[v]) acc = merge(acc, add_edge(down[u]));
        down[v] = add_vertex(acc, v);
    }
    for (int v : order) {                                  // pass 2
        int k = g[v].size();
        vector<T> pre(k + 1, e), suf(k + 1, e);
        for (int j = 0; j < k; ++j) {
            int u = g[v][j];
            pre[j + 1] = merge(pre[j], add_edge(u == par[v] ? up[v] : down[u]));
        }
        for (int j = k - 1; j >= 0; --j) {
            int u = g[v][j];
            suf[j] = merge(add_edge(u == par[v] ? up[v] : down[u]), suf[j + 1]);
        }
        ans[v] = add_vertex(pre[k], v);                    // all neighbors: the full answer
        for (int j = 0; j < k; ++j) {
            int u = g[v][j];
            if (u != par[v]) up[u] = add_vertex(merge(pre[j], suf[j + 1]), v);
        }
    }
    return ans;
}
```

Here `up[u]` is "the DP value of `v` when `u` is cut off", which is exactly what `u` sees through its parent.

Plugging in the problems:

```cpp
// Farthest vertex (CSES 1132)
auto far = reroot(g, 0,
    [](int a, int b) { return max(a, b); },
    [](int x) { return x + 1; },
    [](int x, int) { return x; });

// Connected sets mod M (EDPC V)
auto cnt = reroot(g, 1 % M,
    [&](ll a, ll b) { return a * b % M; },
    [&](ll x) { return (x + 1) % M; },
    [](ll x, int) { return x; });

// Sum of distances (CSES 1133): carry (distance sum, vertex count)
typedef pair<ll, ll> P;
auto dist = reroot(g, P(0, 0),
    [](P a, P b) { return P(a.first + b.first, a.second + b.second); },
    [](P x) { return P(x.first + x.second, x.second); },   // every vertex 1 step farther
    [](P x, int) { return P(x.first, x.second + 1); });     // count v itself
// dist[v].first is the answer
```

**Use the template when the merge is awkward. Write it by hand when there is a clean formula**, as in examples 1, 3 and 4. The hand-written version is shorter and faster.

All code in this post was checked against a brute-force solver on 4,000 random trees.

---

## Common mistakes

- **Recursion on deep trees.** A path of `2 * 10^5` vertices overflows the default stack. Use the BFS `order`, as in every example here.
- **Forgetting the root has no parent side.** `up[root]` must be the merge identity (`0` for sums and heights, `1` for products), not a real value.
- **Subtracting from a `max`.** You cannot undo `max`. Keep the best two, or use prefix and suffix.
- **Dividing under a modulus.** Inverses may not exist, and a factor can be `0 (mod M)`. Prefix and suffix avoid both problems.
- **Overflow.** A sum of distances on a path of `2 * 10^5` vertices is about `2 * 10^10`. Use `long long`.
- **Mixing up what `up[v]` includes.** Write its definition down in one sentence before you code it. For example: "`up[v]` is the longest path from `v` whose first step goes to its parent."
- **Missing `n = 1`.** The loops must still print one answer. All the code above handles it.

---

## Practice problems

In rough order of difficulty:

1. [CSES 1133, Tree Distances II](https://cses.fi/problemset/task/1133): example 1.
2. [CSES 1132, Tree Distances I](https://cses.fi/problemset/task/1132): example 2.
3. [Codeforces 219D, Choosing Capital for Treeland](https://codeforces.com/problemset/problem/219/D): example 3.
4. [Codeforces 1092F, Tree with Maximum Cost](https://codeforces.com/problemset/problem/1092/F): example 4.
5. [Codeforces 1187E, Tree Painting](https://codeforces.com/problemset/problem/1187/E): the answer for root `v` is the sum of all subtree sizes. Moving the root `p → c` changes only `sz[p]` and `sz[c]`.
6. [Codeforces 1324F, Maximum White Subtree](https://codeforces.com/problemset/problem/1324/F): `down[v] = a[v] + sum of max(0, down[c])`. The parent side is only worth adding when it is positive.
7. [AtCoder EDPC V, Subtree](https://atcoder.jp/contests/dp/tasks/dp_v): example 5.
8. [Codeforces 543D, Road Improvement](https://codeforces.com/problemset/problem/543/D): a product modulo a prime where a factor can be `0`, so division breaks. Prefix and suffix again.

**Solve each one with the four questions first**, before you write any code. When the questions are answered, the code is mostly the same two loops every time.
