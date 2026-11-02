---
title: "Palindromic Tree (Eertree): Contest Notes"
excerpt: "A palindromic tree stores every distinct palindromic substring of a string as one node. Learn how it grows one character at a time, then use a tested template to count, check and iterate over every palindrome in a string."
date: "2026-11-02"
category: "Tutorial"
tags: ["Palindromic Tree","Eertree","String Algorithms","Data Structures","Competitive Programming"]
published: true
---
A **palindromic tree** (also called an **eertree**) stores **every distinct palindromic substring** of a string `s` as exactly one node.

- A string of length `n` has **at most `n` distinct non-empty palindromes**, so the tree has at most `n + 2` real nodes.
- Build time is **amortized `O(n)`** transitions, plus `O(n * σ)` memory for array transitions (`σ` = alphabet size).
- It is **online**: you add characters to the end one by one, and after each one the tree is complete for the current prefix.

If a problem says "distinct palindromes", "how many times each palindrome occurs" or "palindromes ending at position `i`", this is usually the tool.

## Watch it grow

I made a short video that builds the tree step by step on three strings. Watch it first if the suffix links feel abstract; the rest of these notes will read much faster.

<iframe src="https://www.youtube-nocookie.com/embed/FbjWTlQ0l80" title="How a Palindromic Tree Grows: Eertree Visualized on 3 Strings" loading="lazy" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

---

## What each node means

Every node is one palindrome. We never store its characters; we store only:

- `len`: the length of the palindrome.
- `next[c]`: an edge to the palindrome `c + X + c`, where `X` is this node. An edge adds **the same character on both sides**.
- `link`: the suffix link. It points to the **longest proper palindromic suffix** of this palindrome.
- `count`: how often the palindrome occurs (more on this below).

### The two roots

Edges add two characters, so odd and even palindromes need different starting points:

| Node | `len` | Meaning | Children |
|---|---|---|---|
| 1 | `-1` | imaginary root | odd palindromes: `c + "" + c` with `len = -1 + 2 = 1` gives `"c"` |
| 2 | `0` | empty string | even palindromes: `"cc"`, `"abba"`, ... |

The `len = -1` trick removes a special case. When we ask "can `X` be extended by `c` at position `i`?", we check `s[i - 1 - len] == s[i]`. For the `-1` root that index is `i` itself, so the check always passes. Every character can therefore become a length-1 palindrome.

Node `0` in the template below is a dummy. It exists so that `next[c] == 0` can mean "no edge".

---

## Adding one character

Keep `last` = the node of the **longest palindromic suffix** of the current prefix. To append `s[i]`:

1. **Find where to extend.** Walk from `last` along suffix links until the node `X` satisfies `s[i - 1 - len(X)] == s[i]`. Then `s[i] + X + s[i]` is the new longest palindromic suffix. This walk is `get_link(last, i)`.
2. **Create the node if it is new.** If `X` has no edge for `s[i]`, create node `u` with `len = len(X) + 2`.
3. **Set the suffix link of `u`.** Continue the same walk from `link(X)` to find the next `Y` that can be extended by `s[i]`. Then `link(u) = next[Y][s[i]]`. If `u` has length 1, that edge does not exist yet, and the link goes to the empty root (node 2).
4. Move `last` to the new longest palindromic suffix.

> [!IMPORTANT]
> **Each new character creates at most one new palindrome.** All palindromic suffixes shorter than the longest one are also prefixes of it (a palindrome reads the same both ways), so they already appeared earlier. That is why the tree has at most `n` real nodes.

### Walkthrough on `"abba"`

| `i` | char | walk from `last` stops at | new node | its suffix link |
|---|---|---|---|---|
| 0 | `a` | root `-1` | `"a"` (len 1) | empty root |
| 1 | `b` | `"a"` fails, empty fails (`s[0] != b`), root `-1` | `"b"` (len 1) | empty root |
| 2 | `b` | `"b"` fails (`s[0] != b`), empty root works (`s[1] == b`) | `"bb"` (len 2) | `"b"` |
| 3 | `a` | `"bb"` works (`s[0] == a`) | `"abba"` (len 4) | `"a"` |

Four nodes: `a`, `b`, `bb`, `abba`. Those are exactly the distinct palindromes of `"abba"`.

### Why it is linear

Let the depth of a node be its number of non-empty palindromic suffixes, which is its depth in the suffix-link tree. Each step along a suffix link lowers the depth by one. The palindromic suffixes of `c + X + c` are `"c"` and `c + Z + c` for each palindromic suffix `Z` of `X` (including the empty one), so **one character raises the depth by at most 2**. Depth never goes below zero, so the first walk takes at most `2n` steps in total. The second walk (for the suffix link of the new node) is bounded by a similar argument.

---

## Contest template

Lowercase `a`-`z`, array transitions. Nodes `0`, `1`, `2` are the dummy and the two roots; **real palindromes are nodes `3 .. tree.size() - 1`**.

```cpp
// Palindromic Tree (Eertree) Template
struct Eertree {
    struct Node {
        int len;          // Length of the palindrome
        int link;         // Suffix link
        int next[26];     // Transitions (assuming lowercase English letters)
        long long count;  // Frequency of the palindrome
        vector<int> ends; // All ending positions (0-indexed)

        Node(int len = 0, int link = 0) : len(len), link(link), count(0) {
            memset(next, 0, sizeof(next));
        }
    };

    vector<Node> tree;
    string s;
    int last; // Pointer to the longest palindromic suffix

    Eertree(int max_len = 100005) {
        tree.reserve(max_len + 3);
        tree.emplace_back(0, 0);  // Node 0: Dummy
        tree.emplace_back(-1, 1); // Node 1: Root -1 (Odd length)
        tree.emplace_back(0, 1);  // Node 2: Root 0 (Even length)
        last = 2;
    }

    int get_link(int v, int i) {
        while (i - 1 - tree[v].len < 0 || s[i - 1 - tree[v].len] != s[i]) {
            v = tree[v].link;
        }
        return v;
    }

    void add_char(char ch) {
        s += ch;
        int i = s.length() - 1;
        int c = ch - 'a';

        int curr = get_link(last, i);

        if (!tree[curr].next[c]) {
            int u = tree.size();
            tree.emplace_back(tree[curr].len + 2);

            int link_node = get_link(tree[curr].link, i);
            tree[u].link = tree[link_node].next[c] ? tree[link_node].next[c] : 2;
            tree[curr].next[c] = u;
        }

        last = tree[curr].next[c];
        tree[last].count++;           // Increment frequency
        tree[last].ends.push_back(i); // Record ending position
    }

    // Call this EXACTLY ONCE after adding all characters
    void propagate() {
        for (int i = (int)tree.size() - 1; i > 2; --i) {
            int p = tree[i].link;
            tree[p].count += tree[i].count;

            // Note: For very large strings, tracking all ends can cause MLE/TLE.
            // Comment out the insert line below if you only need 'count' or 'first occurrence'.
            tree[p].ends.insert(tree[p].ends.end(), tree[i].ends.begin(), tree[i].ends.end());
        }
    }
};
```

### What `count` and `ends` mean, before and after `propagate()`

- **Before `propagate()`:** `count[u]` = how many positions have `u` as their **longest** palindromic suffix. `ends[u]` lists those positions.
- **After `propagate()`:** `count[u]` = **total occurrences** of `u` in `s`. `ends[u]` lists every end position.

`propagate()` works because if `u` ends at position `i`, so does every palindrome on its suffix-link chain. A link always points to an **older node (smaller index)**, so walking indices from high to low pushes each count into its parent after the parent's own subtree is done.

**`ends[u][0]` is always the first occurrence of `u`**, both before and after `propagate()`. A palindrome first appears exactly when its node is created. If it first ended at `i` as a shorter suffix of a longer palindrome `Q`, it would also be a prefix of `Q` and so would have appeared earlier.

> [!WARNING]
> **`ends` can blow up to `O(n²)` total size.** For `s = "aaaa...a"`, the palindrome `a^k` occurs `n - k + 1` times, so after `propagate()` the lists sum to about `n² / 2`. If you need only counts or one position, delete `ends` and keep a single `int first_end`, set inside the `if (!tree[curr].next[c])` block as `tree[u].first_end = i;`.

---

## Recipes: check and iterate palindromes

All recipes below were checked against brute force on 3,000 random strings.

### 1) Count distinct palindromic substrings

```cpp
Eertree et(s.size());
for (char ch : s) et.add_char(ch);
long long distinct = (long long)et.tree.size() - 3;
```

Because the tree is online, `tree.size() - 3` after each `add_char` is the answer **for every prefix**.

### 2) Visit every distinct palindrome

One node is one palindrome. Rebuild its text from its length and any end position.

```cpp
et.propagate();
for (int u = 3; u < (int)et.tree.size(); ++u) {
    int len = et.tree[u].len;
    int end = et.tree[u].ends[0];             // first occurrence
    int start = end - len + 1;
    string pal = s.substr(start, len);        // skip this if you only need len
    long long occ = et.tree[u].count;         // total occurrences
    // use (pal, len, start, occ)
}
```

For `s = "abacaba"`:

| node | palindrome | first at | occurrences |
|---|---|---|---|
| 3 | `a` | `[0, 0]` | 4 |
| 4 | `b` | `[1, 1]` | 2 |
| 5 | `aba` | `[0, 2]` | 2 |
| 6 | `c` | `[3, 3]` | 1 |
| 7 | `aca` | `[2, 4]` | 1 |
| 8 | `bacab` | `[1, 5]` | 1 |
| 9 | `abacaba` | `[0, 6]` | 1 |

### 3) Check whether a palindrome `P` occurs in `s`

Edges add a character on **both** sides, so walk from the center of `P` outwards. Odd lengths start at root `-1`, even lengths at the empty root.

```cpp
bool contains(Eertree& et, const string& p) {
    if (!equal(p.begin(), p.end(), p.rbegin())) return false;  // not a palindrome
    int n = p.size();
    int v = (n % 2) ? 1 : 2;
    for (int k = (n - 1) / 2; k >= 0; --k) {   // p[k] is added on both sides
        v = et.tree[v].next[p[k] - 'a'];
        if (!v) return false;
    }
    return true;
}
```

This is `O(|P|)`, independent of `|s|`. For `P = "bacab"`, the walk is `1 -> c -> a -> b`, which visits `"c"`, `"aca"`, `"bacab"`.

### 4) Count all palindromic substrings (with repetition)

Sum `count` over real nodes after `propagate()`:

```cpp
long long total = 0;
for (int u = 3; u < (int)et.tree.size(); ++u) total += et.tree[u].count;
```

For `"abacaba"` this is `4 + 2 + 2 + 1 + 1 + 1 + 1 = 12`.

### 5) How many palindromes end at each position

The palindromes ending at `i` are exactly the nodes on the suffix-link chain from the longest one. So the answer is the **depth of that node in the link tree**. You do not need to change the template: record `last` after each character, then compute depth in index order.

```cpp
int n = s.size();
Eertree et(n);
vector<int> lastAt(n);
for (int i = 0; i < n; ++i) {
    et.add_char(s[i]);
    lastAt[i] = et.last;
}

vector<int> depth(et.tree.size(), 0);           // roots have depth 0
for (int u = 3; u < (int)et.tree.size(); ++u)
    depth[u] = depth[et.tree[u].link] + 1;      // link is an older node

// endingAt[i] = depth[lastAt[i]]
```

For the number of palindromes **starting** at `i`, build a second tree on the reversed string.

### 6) Walk every occurrence `(l, r)` of every palindrome

Use `lastAt` from recipe 5 and follow suffix links until you reach a root:

```cpp
for (int i = 0; i < n; ++i) {
    for (int v = lastAt[i]; et.tree[v].len > 0; v = et.tree[v].link) {
        int len = et.tree[v].len;
        int l = i - len + 1, r = i;              // s[l..r] is a palindrome
    }
}
```

The loop does **exactly one step per palindromic occurrence**. That is optimal when you must output them all, but it is `O(n²)` for strings like `"aaaa...a"`. If you need only counts, use recipes 4 and 5.

### 7) Longest palindromic substring

```cpp
int best = 3;
for (int u = 3; u < (int)et.tree.size(); ++u)
    if (et.tree[u].len > et.tree[best].len) best = u;
int len = et.tree[best].len;
string longest = s.substr(et.tree[best].ends[0] - len + 1, len);
```

You do not need `propagate()` here, so `ends` stays at `n` entries in total.

---

## Example problems

### A: Distinct palindromes after each prefix

[Timus 1960, Palindromes and Super Abilities](https://acm.timus.ru/problem.aspx?space=1&num=1960): after each character, print the number of distinct palindromes so far.

**Why the eertree:** it is online. Print `et.tree.size() - 3` after every `add_char`. Drop `ends` entirely.

### B: Longest palindrome

[CSES 1111, Longest Palindrome](https://cses.fi/problemset/task/1111): recipe 7. Manacher's algorithm solves this too, with less memory. The eertree version is useful practice because it is the same code you reuse later.

### C: Maximum `length * occurrences`

APIO 2014, *Palindromes*: over all palindromic substrings, maximize `len * occurrences`.

**Recipe:** build, `propagate()`, take `max(len * count)` over nodes `3 ..`. **Remove `ends` first.** With `n = 3 * 10^5`, the merged lists can reach billions of entries.

```cpp
long long ans = 0;
for (int u = 3; u < (int)et.tree.size(); ++u)
    ans = max(ans, (long long)et.tree[u].len * et.tree[u].count);
```

### D: Palindromes common to two strings

[Gym 100548G, The Problem to Slow Down You](https://codeforces.com/gym/100548): count pairs of equal palindromes, one from `S` and one from `T`. The answer is the sum over common palindromes `p` of `countS(p) * countT(p)`.

**Idea:** two trees built from the same roots spell the same palindromes along the same edge labels. Walk both trees together from each root, and only follow an edge if both have it.

```cpp
long long common(Eertree& a, Eertree& b, int u, int v) {
    long long res = (a.tree[u].len > 0) ? a.tree[u].count * b.tree[v].count : 0;
    for (int c = 0; c < 26; ++c)
        if (a.tree[u].next[c] && b.tree[v].next[c])
            res += common(a, b, a.tree[u].next[c], b.tree[v].next[c]);
    return res;
}
// after propagate() on both trees:
long long ans = common(A, B, 1, 1) + common(A, B, 2, 2);
```

The recursion can go `n / 2` levels deep on `"aaaa...a"`. Use an explicit stack if the stack limit is small.

### E: Pairs of intersecting palindromes

[Codeforces 17E, Palisection](https://codeforces.com/problemset/problem/17/E): count pairs of palindromic substrings that overlap.

**Idea:** count all pairs, then subtract the pairs that do not overlap. A pair does not overlap when one ends before the other starts, so you need "palindromes ending at `i`" (recipe 5) and "palindromes starting at `j`" (recipe 5 on the reversed string), then prefix sums.

> [!NOTE]
> Here `n` goes up to `2 * 10^6`, and 26 ints per node is too much memory. Manacher's algorithm gives the same per-position counts with `O(n)` memory. If you want the eertree, store edges in a linked list instead of `next[26]`.

### Next step

[Codeforces 932G, Palindrome Partition](https://codeforces.com/problemset/problem/932/G) needs the **series link** extension (grouping suffix palindromes into `O(log n)` arithmetic progressions). It builds directly on this template.

---

## How to recognize an eertree problem

- The problem says **"distinct palindromic substrings"**. Each one is a node, so the count is free.
- You need **occurrence counts per palindrome** (`propagate()`).
- You need **palindromes ending at (or starting at) each position**: link-tree depth, possibly on the reversed string.
- Characters arrive **online**, or you need answers for every prefix.
- You need to **match palindromes across two strings**: walk both trees together.

**Use something else when:**

- You only need "is `s[l..r]` a palindrome?" for many `(l, r)` queries. Use Manacher or hashing, which answer in `O(1)`.
- You only need the longest palindrome and memory is tight. Manacher is lighter.

---

## Common pitfalls

- **Calling `propagate()` twice.** Counts get added again. Call it once, after the last `add_char`.
- **Iterating from node 0, 1 or 2.** They are the dummy and the two roots, not palindromes. Real nodes start at 3.
- **Keeping `ends` on large inputs.** It can be `O(n²)` after `propagate()`. Replace it with `first_end` unless you truly need every position.
- **Forgetting `max_len`.** The constructor reserves `max_len + 3` nodes; pass the real string length so memory matches the input.
- **Wrong alphabet.** `ch - 'a'` assumes lowercase letters. For other alphabets, remap characters or use `map<int, int>` transitions.
- **Reading `count` before `propagate()`.** At that point it means "times this was the longest palindromic suffix", not total occurrences.
