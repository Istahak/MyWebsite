export interface BlogDetail {
  slug: string;
  title: string;
  content: string;
}

export const dpOnTreesDetails: BlogDetail = {
  slug: 'dp-on-trees',
  title: 'How to Think About Dynamic Programming on Trees',
  content: `# How to Think About Dynamic Programming on Trees

This note is about the *thinking process* for Tree DP in competitive programming: how to decide “this is tree DP”, how to invent states/transitions, when rerooting is needed, and how to debug it.

---

## 1) How to recognize a DP on Tree problem

### Keywords / structures that strongly hint Tree DP

Look for any of these:

- “Tree with N nodes and N−1 edges”, “connected and acyclic”, “root the tree at …”.
- Queries like “for every node v, compute …” (often needs rerooting).
- Optimization/counting where choosing something in one part of tree doesn’t affect another part except through their connecting edge.
- Constraints or objects naturally defined on *subtrees*: subtree sizes, subtree sums, paths, parent-child relations.
- “If we remove an edge, the problem splits into two independent parts.” This is the tree DP superpower.

### What properties of trees make DP applicable?

- **No cycles ⇒ clean subproblems.** Once you choose a root, every edge becomes parent-child. A node’s children subproblems don’t overlap.
- **Cut property.** Removing the parent edge isolates the subtree. Many objectives can be written as “combine children answers + local decision at u”.
- **Unique path between any two nodes.** Path-style quantities often decompose with LCA/parent relations.

### Distinguish Tree DP from greedy or general graph DP

- **Tree DP vs greedy:**
  - If the problem has local choices that “feel” independent but can globally conflict (e.g., select nodes with adjacency constraints), greedy usually fails.
  - If the optimal solution can be constructed by combining optimal solutions on children plus a local choice at u, DP is likely.

- **Tree DP vs graph DP:**
  - On a general graph you must handle cycles (visited states / DP on subsets / SCC / treewidth). On a tree, rooting eliminates cycles entirely.
  - If the input is a tree, but your recurrence seems to depend on “visited set” or “avoid revisiting”, you’re probably overcomplicating it. Root it.

---

## 2) Mental checklist before deciding Tree DP

### Structural properties you want

- The input is a tree (or can be turned into a tree by contracting components / building a tree of components).
- A solution can be expressed as combining independent parts separated by edges.
- The “interaction” between a node’s subtree and the rest of the tree can be summarized by a small state (often O(1) or O(k)).

### When does subtree independence appear?

Ask:

- If I cut edge (u, parent[u]), does the objective inside subtree(u) depend on nodes outside subtree(u) *only via u*?
  - If yes, define \`dp[u]\` as “answer for subtree(u)”.

Typical independence sources:

- Additive objectives: sum, min, max.
- Local constraints: adjacency constraints, degree constraints, color constraints, matching constraints.

### When does rerooting become necessary?

Subtree DP is enough if the question is:

- “Compute answer for the whole tree when rooted at fixed root r”.

Rerooting becomes necessary when the question is:

- “Compute answer **for every node as the root** / for every node as the ‘center’ / for every node’s perspective.”
- “For each node u, answer depends on both its children and its parent side.”

Canonical symptom:

- You can compute \`down[u]\` from children, but to answer for u you also need information from “above” u.

---

## 3) The model’s internal reasoning process (a step-by-step method)

Use this checklist almost mechanically.

### Step A — Force a root and define the *direction of information*

1. Pick any root \`r\` (often 1).
2. Think in two directions:
   - **Downward (subtree)** info: children → parent.
   - **Upward (outside subtree)** info: parent → child (used in rerooting).

### Step B — Decide what a node needs to know from each child

Ask: “If I stand at u, and I look at one child v, what ‘summary’ of v’s subtree is relevant?”

Examples of summaries:

- best path length from v downwards
- number of valid configurations in subtree(v)
- min cost to satisfy constraints in subtree(v)
- DP table by small parameter (e.g., color, chosen/not chosen)

### Step C — Choose states (keep them minimal)

Good state design:

- captures exactly what u needs to combine children
- has small dimension
- has transitions you can compute quickly

Bad state signs:

- state depends on “set of chosen nodes” explicitly
- transitions require iterating over all nodes in subtree repeatedly

### Step D — Define \`dp[u]\` in one sentence

Format:

- \`dp[u] = (best/ways/cost) for subtree(u) assuming <explicit condition about u>\`

Examples:

- Independent set:
  - \`dp[u][0]\` = max size in subtree(u) if u is NOT taken
  - \`dp[u][1]\` = max size in subtree(u) if u IS taken

- Farthest node (like your framework):
  - \`down[u] = best (distance, nodeId) achievable from u going only into its subtree\` (children side)

### Step E — Determine transitions by “merge children” thinking

Common merge patterns:

- **Sum merge** (independent substructures):
  - \`dp[u] += f(dp[v])\`
- **Max merge** (choose best child):
  - \`dp[u] = max(dp[u], g(dp[v]))\`
- **Product merge** (counting independent choices):
  - \`ways[u] *= f(ways[v])\`

Always check the “independence condition”: are choices in different child subtrees independent once u’s local state is fixed? If yes, sum/product merges are valid.

### Step F — Decide single DFS vs rerooting

- Use **single DFS** if the final answer is only needed at root or can be derived from a single root’s subtree.
- Use **rerooting** if you need answers for all nodes, or the answer at u depends on outside-subtree information.

### Step G — Detect need for prefix/suffix optimization

You need prefix/suffix (or “two-pass best”) when:

- computing \`up[v]\` for each child v needs “best contribution among all other children of u” (i.e., all children except v).

Symptoms:

- your formula looks like: \`up[v] = combine( up[u], best over children != v )\`
- naive computation would scan all siblings per child ⇒ O(sum deg(u)^2) ⇒ can become O(N^2)

Prefix/suffix lets you compute “best excluding v” in O(1) per child after O(deg(u)) preprocessing.

---

## 4) Converting a problem statement into DP

### Rewrite the question in subtree terms

Try to rewrite:

- “Answer for whole tree” → “answer for root’s subtree”
- “for every node” → “answer at u = combine(down[u], up[u])”

Techniques:

- **Cut edge viewpoint:** removing (u,parent) isolates subtree(u). What is the contribution from that component?
- **Local constraint viewpoint:** constraints depend only on adjacent nodes ⇒ DP with include/exclude or color states.

### Define recurrence formally

Structure:

1. Base case: leaf behavior
2. Recurrence: how u uses children v
3. Final answer: what you output

Write it like math or pseudocode, then implement.

### Validate correctness of the recurrence

Three checks:

1. **Subproblem correctness:** does \`dp[u]\` correspond exactly to what you claim?
2. **No double counting:** each node/edge contributes exactly once.
3. **Independence check:** once u’s local decision is fixed, do children subproblems interact? If they do, you need a bigger state.

---

## 5) Common DP on Tree patterns (with thinking templates)

### Pattern A — Subtree aggregation (sum/min/max)

**When it appears:** subtree size, subtree sum of weights, best depth, etc.

Thinking:

- Define \`dp[u]\` as the desired quantity over subtree(u).
- Merge children’s results with a simple operation.

Example: subtree size

- \`sz[u] = 1 + Σ sz[v]\`

---

### Pattern B — Diameter-like / “best path passing through u”

**When it appears:** diameter, longest path, farthest node in subtree, best two downward paths.

Thinking:

- Track “best downward” per child.
- Often need top-2 values at u.

Example: tree diameter

- \`down[u] = max( down[v] + 1 )\`
- \`diam[u] = max( max(diam[v]), best1 + best2 )\`

---

### Pattern C — Distance from every node (sum of distances)

**When it appears:** for each u, compute Σ dist(u, x) for all x.

Thinking:

- First compute subtree sizes and subtree distance sums.
- Then reroot to convert parent answer to child answer.

Typical formulas:

- \`sz[u] = 1 + Σ sz[v]\`
- \`downSum[u] = Σ (downSum[v] + sz[v])\`  (sum distances from u to nodes in subtree(u))
- Reroot:
  - \`ans[v] = ans[u] + (N - 2*sz[v])\`

Reasoning behind reroot step:

- When moving root from u to child v:
  - nodes in subtree(v) become 1 closer ⇒ decrease by \`sz[v]\`
  - all other nodes become 1 farther ⇒ increase by \`N - sz[v]\`
  - net change: \`(N - sz[v]) - sz[v] = N - 2*sz[v]\`

---

### Pattern D — Counting configurations

**When it appears:** number of colorings, ways to pick nodes with constraints, ways to orient edges, etc.

Thinking:

- Fix a local state at u (color/selected/etc).
- Children become independent given u’s state.
- Multiply ways across children.

Example: 2-coloring with constraint “adjacent different” (on tree it’s always 2 ways if connected), but for custom constraints you’ll do:

- \`ways[u][c] = Π over children v ( Σ over allowed child colors c' of ways[v][c'] )\`

---

### Pattern E — Multiple-state DP (include/exclude)

**When it appears:** maximum independent set, vertex cover, matching variants.

Thinking:

- Create states for whether u is taken.
- Each child’s allowed states depend on u’s state.

Example: Maximum Independent Set (MIS)

- \`dp[u][1] = 1 + Σ dp[v][0]\`  (if take u, children cannot be taken)
- \`dp[u][0] = Σ max(dp[v][0], dp[v][1])\`

---

## 6) Rerooting thinking process (the “up[]” mindset)

### When subtree DP is not enough

Subtree DP gives you answers that only see descendants.

If you need “best over the entire tree from node u” (farthest node, best path, total distance, etc.), you must incorporate information from outside subtree(u).

### Why \`up[]\` is needed

Define:

- \`down[u]\` = best summary from u into its children/subtree
- \`up[u]\` = best summary from u going to the parent side (everything outside subtree(u))

Then:

- full answer at u = \`combine(down[u], up[u])\`

### How to derive \`up\` transition formula

General derivation for a child v of u:

- Anything outside subtree(v) that v can reach must go through u.
- So \`up[v]\` is basically “best from u that does NOT go into v’s subtree”, then +1 edge to move from v to u.

Template:

1. Candidate from above u:
   - \`candidate1 = up[u]\` (then adjust for edge)
2. Candidate from siblings:
   - \`candidate2 = bestAmongChildrenExceptV( down[child] + 1 )\` (from u’s perspective)
3. Combine candidates at u and push to v with +1.

### Why prefix/suffix trick is required

To compute \`bestAmongChildrenExceptV\` efficiently for every v.

- Naive: for each child v, scan all other children ⇒ O(deg(u)^2)
- Prefix/suffix: compute best prefix and best suffix arrays over children contributions ⇒ O(deg(u)) total per u

**Your existing code** in [classic_dp_on_tree_framework.cpp](classic_dp_on_tree_framework.cpp) does a variant of this with two passes:

- left-to-right tracking a \`best\`
- right-to-left tracking another \`best\`

This is the same idea as prefix/suffix without explicit arrays.

---

## 7) Complexity reasoning

### Why Tree DP is usually O(N)

- Each edge is traversed a constant number of times in DFS.
- Each node merges child contributions once.
- Total child iterations = Σ deg(u) = 2(N−1).

### When it becomes O(N^2)

Usually when:

- For each child v, you recompute a “best over all other children” by scanning siblings.
  - Worst case star tree: center has deg ~ N ⇒ O(N^2).

Other sources:

- DP state dimension too large (e.g., O(subtree size))
- knapsack-style merges without optimization (O(N^2) merges)

### How to optimize transitions

- Use **prefix/suffix** for “all children except v”.
- Maintain **top-2 maxima** when you only need best and second-best.
- For counting merges, precompute products and modular inverses if division is allowed (careful).

---

## 8) Debugging framework

### Test small trees intentionally

Use tiny trees where you can enumerate answers:

1. Single node
2. 2 nodes
3. Path of length 3–5
4. Star (one center, many leaves) — great for catching O(N^2) and sibling-exclusion bugs
5. “T” shape tree

### Verify recurrence manually

For 3–6 nodes:

- Write down dp values bottom-up.
- For rerooting, compute \`up\` by hand for one child and verify formula.
- Confirm tie-breaking rules (e.g., maximum value then maximum node id).

### Common logical mistakes

- Forgetting to exclude parent in DFS.
- Mixing meanings of dp states (e.g., dp[u] “includes u” vs “subtree size”).
- Wrong +1 / +2 edge increments when moving across u.
- In rerooting: using child contribution that still includes that child (not excluding v).
- Not initializing \`up[root]\` properly.
- Tie-breaking inconsistencies (pair ordering, custom comparator).

---

## 9) Illustrative examples with small trees

### Example 1 — “Farthest node from every node” (matches your framework)

Tree (1-indexed):

\`\`\`
1-2
|
3
|
4
\`\`\`

Thinking:

- For each u, the farthest node might be in one of its child subtrees (down), or via its parent side (up).
- Define:
  - \`down[u] = best (distance, nodeId) going into children\`
  - \`up[u]   = best (distance, nodeId) going to parent side\`
- Answer per node: \`max(down[u], up[u])\` with tie-breaking by node id.

Your code does:

- \`dfs1\` computes \`down[u]\` via children.
- \`dfs2\` computes \`up[child]\` using \`up[u]\` and best siblings, using two passes (prefix/suffix idea).

Key mental model:

- “When computing answer for child v, I need the best route from u that does not go into v.”

---

### Example 2 — Maximum Independent Set (include/exclude)

Small tree:

\`\`\`
  1
 / \
2   3
    |
    4
\`\`\`

States:

- \`dp[u][1]\`: max nodes selected in subtree(u) if u selected
- \`dp[u][0]\`: max nodes selected in subtree(u) if u not selected

Transitions:

- If u selected: children cannot be selected.
- If u not selected: children can be selected or not.

This is a pure subtree DP (no rerooting) unless the problem asks “answer if rooted at every node” (rare for MIS).

---

### Example 3 — Sum of distances from every node (classic reroot)

Small path:

\`\`\`
1 - 2 - 3 - 4
\`\`\`

Compute:

- \`sz[u]\` and \`downSum[u]\` by DFS from root 1.
- \`ans[root] = downSum[root]\`.
- reroot using \`ans[v] = ans[u] + (N - 2*sz[v])\`.

Mental check:

- moving root across edge flips the “closer vs farther” partition exactly at that edge.

---

## 10) C++ template patterns

### Template 1 — Basic subtree DP (single DFS)

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

int n;
vector<vector<int>> g;

// Example: subtree sizes
vector<int> sz;

void dfs(int u, int p) {
    sz[u] = 1;
    for (int v : g[u]) {
        if (v == p) continue;
        dfs(v, u);
        sz[u] += sz[v];
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    cin >> n;
    g.assign(n + 1, {});
    for (int i = 0; i < n - 1; i++) {
        int u, v; cin >> u >> v;
        g[u].push_back(v);
        g[v].push_back(u);
    }
    sz.assign(n + 1, 0);
    dfs(1, 0);
}
\`\`\`

### Template 2 — Rerooting skeleton (down + up)

Use this when you need answer for every node.

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

int n;
vector<vector<int>> g;

// Replace these with whatever summary you need
// Here we use pair (value, tieBreaker) like your framework.
using State = pair<int,int>;

vector<State> downState, upState;

State mergeState(const State& a, const State& b) {
    return max(a, b); // customize: sum/product/min/max etc.
}

void dfsDown(int u, int p) {
    downState[u] = {0, u};
    for (int v : g[u]) {
        if (v == p) continue;
        dfsDown(v, u);
        State cand = {downState[v].first + 1, downState[v].second};
        downState[u] = mergeState(downState[u], cand);
    }
}

void dfsUp(int u, int p) {
    // Precompute contributions of each child from u's perspective.
    vector<int> children;
    children.reserve(g[u].size());
    for (int v : g[u]) if (v != p) children.push_back(v);

    int m = (int)children.size();
    vector<State> contrib(m);
    for (int i = 0; i < m; i++) {
        int v = children[i];
        contrib[i] = {downState[v].first + 1, downState[v].second};
    }

    // prefix/suffix best excluding i
    vector<State> pref(m + 1, {-1, -1}), suf(m + 1, {-1, -1});
    for (int i = 0; i < m; i++) pref[i + 1] = mergeState(pref[i], contrib[i]);
    for (int i = m - 1; i >= 0; i--) suf[i] = mergeState(suf[i + 1], contrib[i]);

    for (int i = 0; i < m; i++) {
        int v = children[i];

        State bestExceptV = mergeState(pref[i], suf[i + 1]);

        // upState[u] is from u to outside its subtree.
        // v reaches outside via u, so candidates at u are:
        // - upState[u]
        // - best among siblings (bestExceptV)
        State fromU = mergeState(upState[u], bestExceptV);

        // push to child: +1 edge (v -> u)
        upState[v] = {fromU.first + 1, fromU.second};

        dfsUp(v, u);
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    cin >> n;
    g.assign(n + 1, {});
    for (int i = 0; i < n - 1; i++) {
        int u, v; cin >> u >> v;
        g[u].push_back(v);
        g[v].push_back(u);
    }

    downState.assign(n + 1, {0, 0});
    upState.assign(n + 1, {0, 0});

    int root = 1;
    dfsDown(root, 0);

    // initialize root up-state (identity depends on problem)
    upState[root] = {0, root};
    dfsUp(root, 0);

    for (int u = 1; u <= n; u++) {
        State ans = mergeState(downState[u], upState[u]);
        // print ans according to problem
        // cout << ans.first << " " << ans.second << "\n";
    }
}
\`\`\`

### Template 3 — Include/Exclude DP (adjacency constraint)

\`\`\`cpp
// Example: maximum independent set size
vector<array<long long,2>> dp; // dp[u][0/1]

void dfs(int u, int p) {
    dp[u][0] = 0;
    dp[u][1] = 1;
    for (int v : g[u]) {
        if (v == p) continue;
        dfs(v, u);
        dp[u][1] += dp[v][0];
        dp[u][0] += max(dp[v][0], dp[v][1]);
    }
}
\`\`\`

---

## 11) Decision-making cheat sheet (fast rules)

- If the problem says **tree** + asks for a value that can be computed by **combining children subanswers** → consider Tree DP.
- If cutting an edge makes the problem split into **independent components** → Tree DP is natural.
- If the output is **for every node** (answer from each node’s perspective) → likely **rerooting**.
- If answer at u needs info “from the parent side” → define \`up[u]\` (rerooting).
- If \`up[child]\` needs “best over all siblings except this child” → use **prefix/suffix** or **top-2** trick.
- If your transition scans all siblings for each child → you’re drifting to **O(N^2)** (optimize).
- If constraints are adjacency-based (taken/not taken, color constraints) → start with **multi-state include/exclude** DP.
- If you need “best path” or “diameter” → track **best downward** (often top-2) and optionally reroot.

---

If you want, I can also adapt your existing [classic_dp_on_tree_framework.cpp](classic_dp_on_tree_framework.cpp) into a more reusable “library-style” template (same logic, less problem-specific), but I didn’t change any code since you asked specifically for the study note.
`,
};

export default dpOnTreesDetails;
