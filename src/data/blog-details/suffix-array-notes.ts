export interface BlogDetail {
  slug: string;
  title: string;
  content: string;
}

export const suffixArrayDetails: BlogDetail = {
  slug: 'suffix-array-notes',
  title: 'Suffix Array (SA) — Contest Black-Box Notes',
  content: `# Suffix Array (SA) — Contest Black-Box Notes (C++)

## What it is
For a string \`s\` of length \`n\`, the **suffix array** \`sa\` is a permutation of \`0..n-1\` such that:

- \`s.substr(sa[0]) < s.substr(sa[1]) < ... < s.substr(sa[n-1])\` (lexicographic order)

So:
- \`sa[i]\` = starting index of the **i-th** smallest suffix
- \`pos[i]\` (inverse SA) = rank of suffix starting at \`i\`

Example: \`s = "banana"\`

Suffixes:
- 0: banana
- 1: anana
- 2: nana
- 3: ana
- 4: na
- 5: a

Sorted suffixes:
- 5: a
- 3: ana
- 1: anana
- 0: banana
- 4: na
- 2: nana

\`sa = [5, 3, 1, 0, 4, 2]\`

---

## The black box you want in contests
Copy this struct and use the functions listed in the table below.

### Core guarantees (what returns what)
- \`SuffixArray sa(s)\` builds \`sa.sa\` and \`sa.pos\`
- \`sa.build_lcp()\` builds \`sa.lcp\` where \`lcp[i] = LCP(sa[i], sa[i-1])\` (and \`lcp[0]=0\`)
- \`sa.find_range(p)\` returns \`[L, R)\` interval in suffix array where suffixes start with pattern \`p\`
- \`sa.count(p)\` returns number of occurrences of \`p\` in \`s\`
- \`sa.contains(p)\` returns true/false

Then optional power tools:
- \`sa.lcp_suffix(i, j)\` returns LCP length of suffixes starting at \`i\` and \`j\` (needs \`build_lcp()\` + RMQ)
- \`sa.compare_substrings(l1, r1, l2, r2)\` lexicographically compares two substrings in ~O(1)

---

## Implementation (SA + LCP + RMQ)
This is the standard doubling algorithm: **O(n log² n)** for SA build, **O(n)** for LCP.

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

struct SuffixArray {
    string s;
    int n = 0;

    vector<int> sa;   // sa[i] = start index of i-th smallest suffix
    vector<int> pos;  // pos[i] = rank of suffix starting at i

    vector<int> lcp;  // lcp[i] = LCP( suffix sa[i], suffix sa[i-1] ), lcp[0]=0

    // RMQ (min) sparse table for lcp queries
    struct SparseMin {
        vector<vector<int>> st;
        vector<int> lg;

        void build(const vector<int>& a) {
            int n = (int)a.size();
            lg.assign(n + 1, 0);
            for (int i = 2; i <= n; i++) lg[i] = lg[i / 2] + 1;

            int K = (n == 0 ? 0 : lg[n] + 1);
            st.assign(K, vector<int>(n));
            if (n == 0) return;

            st[0] = a;
            for (int k = 1; k < K; k++) {
                for (int i = 0; i + (1 << k) <= n; i++) {
                    st[k][i] = min(st[k - 1][i], st[k - 1][i + (1 << (k - 1))]);
                }
            }
        }

        int query(int l, int r) const { // inclusive
            if (l > r) return INT_MAX;
            int k = lg[r - l + 1];
            return min(st[k][l], st[k][r - (1 << k) + 1]);
        }
    } rmq;

    bool rmq_ready = false;

    SuffixArray() = default;
    explicit SuffixArray(string str) { init(std::move(str)); }

    void init(string str) {
        s = std::move(str);
        n = (int)s.size();
        build_sa();
        build_pos();
        lcp.clear();
        rmq_ready = false;
    }

    void build_sa() {
        sa.resize(n);
        vector<int> rankk(n), tmp(n);

        for (int i = 0; i < n; i++) {
            sa[i] = i;
            rankk[i] = (unsigned char)s[i];
        }

        for (int k = 1;; k <<= 1) {
            auto cmp = [&](int i, int j) {
                if (rankk[i] != rankk[j]) return rankk[i] < rankk[j];
                int ri = (i + k < n) ? rankk[i + k] : -1;
                int rj = (j + k < n) ? rankk[j + k] : -1;
                return ri < rj;
            };

            sort(sa.begin(), sa.end(), cmp);

            tmp[sa[0]] = 0;
            for (int i = 1; i < n; i++) {
                tmp[sa[i]] = tmp[sa[i - 1]] + (cmp(sa[i - 1], sa[i]) ? 1 : 0);
            }
            for (int i = 0; i < n; i++) rankk[i] = tmp[i];

            if (rankk[sa[n - 1]] == n - 1) break;
        }
    }

    void build_pos() {
        pos.assign(n, 0);
        for (int i = 0; i < n; i++) pos[sa[i]] = i;
    }

    // Builds Kasai LCP: O(n)
    void build_lcp() {
        lcp.assign(n, 0);
        int h = 0;

        for (int i = 0; i < n; i++) {
            int r = pos[i];
            if (r == 0) continue;
            int j = sa[r - 1];

            while (i + h < n && j + h < n && s[i + h] == s[j + h]) h++;
            lcp[r] = h;
            if (h) h--;
        }

        rmq.build(lcp);
        rmq_ready = true;
    }

    // Returns [L, R) where pattern is a prefix of s.substr(sa[i]) for all i in [L,R)
    // O(|p| log n)
    pair<int,int> find_range(const string& p) const {
        int m = (int)p.size();

        int L = 0, R = n;
        while (L < R) {
            int mid = (L + R) / 2;
            if (s.compare(sa[mid], m, p) < 0) L = mid + 1;
            else R = mid;
        }
        int left = L;

        L = 0; R = n;
        while (L < R) {
            int mid = (L + R) / 2;
            if (s.compare(sa[mid], m, p) <= 0) L = mid + 1;
            else R = mid;
        }
        int right = L;

        return {left, right};
    }

    int count(const string& p) const {
        auto [L, R] = find_range(p);
        return R - L;
    }

    bool contains(const string& p) const {
        return count(p) > 0;
    }

    // Needs build_lcp(). Returns LCP length of suffixes i and j.
    int lcp_suffix(int i, int j) const {
        if (!rmq_ready) throw runtime_error("build_lcp() not called");
        if (i == j) return n - i;
        int ri = pos[i], rj = pos[j];
        if (ri > rj) swap(ri, rj);
        return rmq.query(ri + 1, rj);
    }

    // Compare substrings s[l1..r1] and s[l2..r2]
    // Needs build_lcp() (for RMQ).
    // Returns -1 if A<B, 0 if equal, +1 if A>B.
    int compare_substrings(int l1, int r1, int l2, int r2) const {
        if (!rmq_ready) throw runtime_error("build_lcp() not called");
        int len1 = r1 - l1 + 1;
        int len2 = r2 - l2 + 1;
        int common = min(lcp_suffix(l1, l2), min(len1, len2));

        if (common == min(len1, len2)) {
            if (len1 == len2) return 0;
            return (len1 < len2) ? -1 : 1;
        }
        char c1 = s[l1 + common];
        char c2 = s[l2 + common];
        if (c1 == c2) return 0;
        return (c1 < c2) ? -1 : 1;
    }
};
\`\`\`

---

## Applications (with common contest examples)

### 1) Count pattern occurrences (multi-query)
Use SA interval \`[L,R)\`.

\`\`\`cpp
SuffixArray sa(s);

int q; cin >> q;
while (q--) {
    string p; cin >> p;
    cout << sa.count(p) << "\n";
}
\`\`\`

What you rely on:
- \`sa.count(p)\` returns number of occurrences of \`p\` in \`s\`

---

### 2) Get all occurrence positions (or any one)

\`\`\`cpp
SuffixArray sa(s);

string p = "ana";
auto [L, R] = sa.find_range(p);

if (L == R) {
    cout << "not found\n";
} else {
    int anyPos = sa.sa[L];
    cout << "any occurrence at index: " << anyPos << "\n";

    vector<int> all;
    for (int i = L; i < R; i++) all.push_back(sa.sa[i]);
    sort(all.begin(), all.end()); // optional: index order

    for (int x : all) cout << x << " ";
    cout << "\n";
}
\`\`\`

What returns what:
- \`find_range(p)\` returns SA-interval of matches
- \`sa.sa[L..R-1]\` are the starting indices of matching suffixes (hence pattern occurrences)

---

### 3) Longest repeating substring (appears at least twice)
Fact: maximum value in LCP array is the answer length.

\`\`\`cpp
SuffixArray sa(s);
sa.build_lcp();

int bestLen = 0;
int bestAt = -1;
for (int i = 1; i < sa.n; i++) {
    if (sa.lcp[i] > bestLen) {
        bestLen = sa.lcp[i];
        bestAt = sa.sa[i];
    }
}

cout << bestLen << "\n";
if (bestLen > 0) cout << s.substr(bestAt, bestLen) << "\n";
\`\`\`

What returns what:
- \`sa.lcp[i]\` = LCP length of suffix \`sa.sa[i]\` with previous suffix \`sa.sa[i-1]\`

---

### 4) Number of distinct substrings
Formula:
- total substrings = $n(n+1)/2$
- duplicates counted by LCP sum
- distinct (non-empty) = total − sum(lcp)

\`\`\`cpp
SuffixArray sa(s);
sa.build_lcp();

long long n = sa.n;
long long total = n * (n + 1) / 2;
long long dup = 0;
for (int i = 1; i < sa.n; i++) dup += sa.lcp[i];

long long distinctNonEmpty = total - dup;
cout << distinctNonEmpty << "\n";
\`\`\`

---

### 5) Longest common substring of two strings
Concatenate: \`t = a + sep + b\` where \`sep\` is a character not in either string.
Then max LCP among adjacent suffixes coming from different halves.

\`\`\`cpp
string a, b;
cin >> a >> b;

char sep = '$'; // must NOT appear in a or b
string t = a + sep + b;

SuffixArray sa(t);
sa.build_lcp();

int n1 = (int)a.size();
int bestLen = 0;
int bestAt = -1;

for (int i = 1; i < sa.n; i++) {
    int x = sa.sa[i];
    int y = sa.sa[i - 1];
    bool inA = x < n1;
    bool inB = y > n1; // note: positions after sep

    bool otherWay = (y < n1) && (x > n1);
    if ((inA && inB) || otherWay) {
        if (sa.lcp[i] > bestLen) {
            bestLen = sa.lcp[i];
            bestAt = x;
        }
    }
}

cout << bestLen << "\n";
if (bestLen > 0) cout << t.substr(bestAt, bestLen) << "\n";
\`\`\`

---

### 6) Minimum rotation (circular string)
Smallest rotation of \`s\` can be found by building SA on \`s+s\` and taking the first suffix that starts in \`[0,n)\`.

\`\`\`cpp
string s; cin >> s;
int n = (int)s.size();
string t = s + s;

SuffixArray sa(t);

int start = 0;
for (int idx : sa.sa) {
    if (idx < n) { start = idx; break; }
}

string rot = t.substr(start, n);
cout << rot << "\n";
\`\`\`

---

## More examples (requested)

### 7) Compare two substrings lexicographically fast
This is useful in problems like:
- “sort queries by substring”,
- “pick smallest substring among candidates”,
- “compare two substrings many times”.

\`\`\`cpp
SuffixArray sa(s);
sa.build_lcp();

// compare s[l1..r1] with s[l2..r2]
int l1=1, r1=3; // "ana" in "banana"
int l2=4, r2=5; // "na"

int cmp = sa.compare_substrings(l1, r1, l2, r2);
// cmp = -1 => first smaller, 0 => equal, +1 => first bigger
cout << cmp << "\n";
\`\`\`

Main point:
- \`compare_substrings\` uses \`lcp_suffix\` + first mismatch character.

---

### 8) LCP of two suffixes (or two starting positions)
Often needed for:
- “how long do two parts match?”,
- “longest common prefix of substrings starting at i and j”.

\`\`\`cpp
SuffixArray sa(s);
sa.build_lcp();

int i = 1, j = 3; // suffixes "anana" and "ana"
cout << sa.lcp_suffix(i, j) << "\n"; // 3
\`\`\`

---

### 9) Longest substring that appears at least K times
Key fact:
- Among any \`K\` consecutive suffixes in SA, the common prefix of all \`K\` suffixes has length = min LCP in that window.

So answer is:
$$\max_i \min(lcp[i+1..i+K-1])$$

Compute sliding window minimum of \`lcp\` in **O(n)**.

\`\`\`cpp
int longest_repeated_at_least_k(const SuffixArray& sa, int K) {
    int n = sa.n;
    if (K <= 1) return n;
    if (K > n) return 0;

    int window = K - 1; // size on lcp
    deque<int> dq;      // indices into lcp, increasing by lcp value

    auto push = [&](int idx) {
        while (!dq.empty() && sa.lcp[dq.back()] >= sa.lcp[idx]) dq.pop_back();
        dq.push_back(idx);
    };
    auto pop = [&](int idx) {
        if (!dq.empty() && dq.front() == idx) dq.pop_front();
    };

    // initial window uses lcp[1..window]
    for (int idx = 1; idx <= window; idx++) push(idx);
    int best = sa.lcp[dq.front()];

    for (int i = 1; i + K - 1 < n; i++) {
        pop(i);
        push(i + window);
        best = max(best, sa.lcp[dq.front()]);
    }

    return best;
}

// usage:
SuffixArray sa(s);
sa.build_lcp();
cout << longest_repeated_at_least_k(sa, 3) << "\n";
\`\`\`

---

## Quick checklist (contest workflow)

1) Build SA:
\`\`\`cpp
SuffixArray sa(s);
\`\`\`

2) If you only do pattern queries: you are done.
- use \`sa.find_range(p)\`, \`sa.count(p)\`, \`sa.contains(p)\`

3) If you need LCP-based stuff: build LCP once.
\`\`\`cpp
sa.build_lcp();
\`\`\`

4) Now you can also use:
- \`sa.lcp_suffix(i, j)\`
- \`sa.compare_substrings(l1,r1,l2,r2)\`
- distinct substrings / longest repeats / repeats >= K

---

## Complexity (rule of thumb)

If you want, I can also add an \`O(n log n)\` SA build (radix sort) version, but the above is usually fast enough for \`n <= 2e5\`–\`5e5\`.

---

## Extra examples (more contest patterns)

### 10) Lexicographically smallest substring of fixed length \`L\`

**Problem:** Among all substrings of \`s\` with length \`L\`, find the lexicographically smallest one.

**Key idea:** Any substring of length \`L\` is the prefix of length \`L\` of some suffix \`s[i..]\`. The smallest such substring comes from the smallest suffix that has at least \`L\` characters remaining.

**What to call / what you get:**
- Call \`min_substring_len_L(sa, L)\`
- Returns \`{startIndex, substring}\`

\`\`\`cpp
pair<int,string> min_substring_len_L(const string& s, const SuffixArray& sa, int L) {
    int n = sa.n;
    for (int idx : sa.sa) {
        if (idx + L <= n) {
            return {idx, s.substr(idx, L)};
        }
    }
    return {-1, ""}; // impossible if L>n
}

// usage:
SuffixArray sa(s);
auto [i, sub] = min_substring_len_L(s, sa, 3);
cout << i << " " << sub << "\n";
\`\`\`

---

### 11) K-th lexicographically smallest **distinct** substring

**Problem:** Find the \`k\`-th smallest distinct substring (1-indexed).

**Key idea:**
- All substrings are prefixes of suffixes.
- From suffix at \`sa[i]\`, you can form \`n-sa[i]\` prefixes.
- But \`lcp[i]\` of them are duplicates already seen due to previous suffix in SA.

So new distinct substrings contributed by suffix \`sa[i]\` are:
$$ (n - sa[i]) - lcp[i] $$

**What to call / what you get:**
- Call \`kth_distinct_substring(sa, k)\`
- Returns the substring (or empty string if \`k\` too large)

\`\`\`cpp
string kth_distinct_substring(const SuffixArray& sa, long long k) {
    // requires sa.build_lcp() already called
    int n = sa.n;
    for (int i = 0; i < n; i++) {
        long long add = (n - sa.sa[i]) - (i == 0 ? 0 : sa.lcp[i]);
        if (k > add) {
            k -= add;
            continue;
        }
        // The k-th new substring from this suffix has length (lcp[i] + k)
        int base = (i == 0 ? 0 : sa.lcp[i]);
        int len = base + (int)k;
        return sa.s.substr(sa.sa[i], len);
    }
    return "";
}

// usage:
SuffixArray sa(s);
sa.build_lcp();
cout << kth_distinct_substring(sa, 5) << "\n";
\`\`\`

---

### 12) K-th lexicographically smallest substring (**with duplicates**) via suffix-tree-from-SA

This is the typical “Substring Order II” style problem: count **all** substrings (not just distinct), sort them lexicographically (with multiplicity), and output the \`k\`-th.

Why suffix array alone isn’t enough:
- If you list “all prefixes of suffixes in SA order”, you get duplicates scattered across many suffixes.
- You need a structure that groups equal prefixes and tracks **how many times** each prefix occurs.

The clean way with suffix arrays is:
1) Build \`sa\` and \`lcp\`.
2) Build the **suffix tree** (compressed suffix trie) from \`sa + lcp\`.
3) Store, for every node, how many suffixes (leaves) are under it → that equals the **occurrence count** of every substring on the path.
4) Walk the tree in lexicographic order and “consume” \`k\` using multiplicities.

#### Building a suffix tree from SA + LCP (stack method)

Each node represents a prefix of some suffixes.
- \`depth(v)\` = length of the string from root to node \`v\`.
- Each edge stores a label as an interval \`[l..r]\` into the original string \`s\`.

Algorithm sketch (classic):
- Maintain a stack of nodes with strictly increasing \`depth\`.
- Process suffixes in SA order.
- Let \`curLcp = lcp[i]\` (with \`lcp[0]=0\`).
    - Pop while \`depth(stack.top) > curLcp\`.
    - If \`depth(stack.top) < curLcp\`, you must **split** the edge to create an internal node of depth \`curLcp\`.
    - Create a new leaf for suffix \`sa[i]\` and attach it under the current top; the new leaf edge starts at \`sa[i] + depth(parent)\`.

This builds the same tree a suffix-tree algorithm would build, but using SA+LCP.

#### Counting substrings with multiplicity in the tree

Define for each node \`v\`:
- \`occ[v]\` = number of leaves in the subtree of \`v\` (how many suffixes share the prefix).
- \`sub[v]\` = total number of substrings (with multiplicity) contributed by edges in the subtree of \`v\`.

For an edge \`u -> v\` with label length \`len\`:
- Along this edge there are \`len\` different “stop points” (prefixes of the edge label).
- Each of those prefixes occurs \`occ[v]\` times in the original string.

So that edge contributes:
$$ occ[v] \cdot len $$

And including deeper edges:
$$ total(u\to v) = occ[v] \cdot len + sub[v] $$

You can compute \`occ[]\` and \`sub[]\` with one postorder DFS.

#### Selecting the k-th substring (1-indexed)

If children edges of each node are processed in increasing order of their first character, then the traversal matches lexicographic order.

At node \`u\`, for each outgoing edge \`e=(u\to v)\` in sorted order:
- \`pref = occ[v] * len(e)\` are the substrings that end **on this edge**
- \`tot  = pref + sub[v]\` are all substrings in this edge’s subtree

Selection logic:
- If \`k > tot\`, then \`k -= tot\` and try the next edge.
- Else if \`k <= pref\`, the answer ends on this edge:
    - Let $t = \lceil k / occ[v] \rceil$ (1..len), then take the first \`t\` characters of the edge label.
- Else (\`k > pref\`):
    - \`k -= pref\`, append the whole edge label, and descend into \`v\`.

This returns the k-th substring **with duplicates**.

**Complexity:**
- SA build + LCP: depends on your SA implementation (\`O(n log^2 n)\` for sort-based doubling, \`O(n log n)\` for radix-doubling).
- Tree build from SA+LCP: \`O(n)\` nodes/edges, \`O(n)\` stack operations.
- Postorder to compute \`occ/sub\`: \`O(n)\`.
- Query (k-th): \`O(answer length + number of visited edges)\`.

---

### 13) Longest repeated substring with **no overlap**

**Problem:** Find the maximum length \`L\` such that there exists a substring of length \`L\` that appears at least twice **without overlapping**.

Meaning: there exist positions \`i != j\` with \`s.substr(i, L) == s.substr(j, L)\` and \`|i - j| >= L\`.

**Key idea:**
- For a fixed \`L\`, all suffixes that share prefix length \`>= L\` form groups in SA where \`lcp\` values are \`>= L\`.
- In each group, if \`maxPos - minPos >= L\`, then you have two occurrences that don’t overlap.

Binary search on \`L\` gives \`O(n log n)\` (group scan is \`O(n)\` per check).

\`\`\`cpp
bool has_non_overlapping_repeat(const SuffixArray& sa, int L) {
    if (L == 0) return true;
    int n = sa.n;

    int i = 1;
    while (i < n) {
        if (sa.lcp[i] < L) { i++; continue; }

        int mn = min(sa.sa[i], sa.sa[i - 1]);
        int mx = max(sa.sa[i], sa.sa[i - 1]);

        int j = i;
        while (j < n && sa.lcp[j] >= L) {
            mn = min(mn, sa.sa[j]);
            mx = max(mx, sa.sa[j]);
            j++;
        }

        if (mx - mn >= L) return true;
        i = j;
    }
    return false;
}

int longest_non_overlapping_repeat(const SuffixArray& sa) {
    // requires sa.build_lcp() already called
    int lo = 0, hi = sa.n; // answer in [0, n)
    while (lo < hi) {
        int mid = (lo + hi + 1) / 2;
        if (has_non_overlapping_repeat(sa, mid)) lo = mid;
        else hi = mid - 1;
    }
    return lo;
}

// usage:
SuffixArray sa(s);
sa.build_lcp();
cout << longest_non_overlapping_repeat(sa) << "\n";
\`\`\`

Main point:
- \`longest_non_overlapping_repeat\` returns only the length; if you also want the substring itself, we can extend the check to remember the best group.

---

## When to think about Suffix Array (SA) in contests

Suffix Array is worth thinking about when the problem is essentially asking about **ordering of suffixes/substrings** or **many queries over one fixed string**.

### What SA gives you (mentally)
Think of SA as:

1) **All suffixes sorted** → any operation that needs “lexicographic order of substrings” becomes systematic.
2) **All occurrences of a pattern are contiguous in SA** → binary search on SA gives range \`[L, R)\`.
3) **LCP between adjacent suffixes** → repeated-substring facts become simple (max LCP, sum LCP, window min of LCP).
4) With RMQ on \`lcp[]\`, you get **LCP of any two suffixes in O(1)** → fast substring compare.

### Typical problem types (signals → SA approach)

#### A) Pattern queries on one big text
**Signals:**
- One text \`s\` (length up to ~2e5–5e5), many queries \`q\` (patterns / ask counts / existence).
- “How many times does \`p\` occur?” “Does \`p\` occur?” “Find all positions.”

**Use SA because:** occurrences of \`p\` correspond to a contiguous SA interval.

**Calls to use:**
- \`sa.find_range(p)\` → \`[L,R)\`
- \`sa.count(p)\` → number of occurrences

**Alternatives:**
- If only 1 pattern: KMP/Z may be simpler.
- If many patterns total length huge: Aho–Corasick may be better.

---

#### B) Distinct substrings / substring statistics
**Signals:**
- “How many distinct substrings?”
- “Count different substrings,” “number of unique substrings,” “sum over substrings.”

**Use SA+LCP because:** duplicates are exactly accounted by LCP sum.

**Calls/arrays:**
- \`sa.build_lcp()\`
- formula: distinct non-empty = $n(n+1)/2 - \sum_{i=1}^{n-1} lcp[i]$

---

#### C) Longest repeated substring / repeated at least K times
**Signals:**
- “Longest repeated substring”
- “appears at least K times”
- “maximum frequency substring length”

**Use SA+LCP because:** repetition is captured by LCP.

**Calls/arrays:**
- \`sa.build_lcp()\`
- max repeat (>=2): \`max(lcp)\`
- repeat >= K: sliding window minimum on \`lcp\`

---

#### D) Longest common substring (two strings)
**Signals:**
- “longest common substring” (not subsequence)
- “common block,” “shared segment,” “max matching contiguous”

**Use SA because:** build SA on \`a + sep + b\`, then check adjacent suffixes from different strings.

**Calls/arrays:**
- build SA+LCP on concatenated string
- take max \`lcp[i]\` where suffixes cross the separator

**Alternatives:**
- Suffix automaton is also common (often O(n)).

---

#### E) Lexicographic substring comparisons / ordering many substrings
**Signals:**
- “compare substrings many times”
- “sort queries by substring”
- “minimum / maximum substring under lex order”
- “k-th substring”

**Use SA+RMQ because:** LCP of suffixes makes substring comparison fast.

**Calls:**
- \`sa.build_lcp()\`
- \`sa.compare_substrings(l1,r1,l2,r2)\`

---

#### F) Circular string / rotation
**Signals:**
- “minimum rotation,” “lexicographically smallest rotation”
- “cyclic shift smallest”

**Use SA because:** build SA on \`s+s\`, pick first suffix starting in \`[0,n)\`.

---

### Quick decision checklist (use this during contests)

Ask yourself:

1) Is there **one main string** and **many queries**? → SA is a strong candidate.
2) Are we asked about **lexicographic order of substrings** (k-th, min, compare)? → SA+LCP+RMQ.
3) Are we asked about **repetition** (longest repeat, repeat ≥K, distinct substrings)? → SA+LCP.
4) Are we asked about **two-string common substring**? → concatenate + SA+LCP.

If you answer “yes” to any, think SA.

---

## When NOT to use SA (common traps)

1) **Single pattern search** (just once):
    - Prefer KMP/Z (simpler and faster to code).

2) **Online edits / dynamic string** (updates between queries):
    - SA rebuild is expensive; consider suffix automaton variants, hashing with updates, or segment trees depending on task.

3) **Very large \`n\` (like 1e6+) with strict time**:
    - This note’s SA build is \`O(n log² n)\`; may TLE.
    - Consider \`O(n log n)\` SA (radix) or SA-IS \`O(n)\` if necessary.

4) **Need exact palindrome queries**:
    - SA can help indirectly but Manacher / palindromic tree is usually better.

---

## The “think SA” keywords (fast pattern recognition)

If a statement contains these, SA is often intended:

- “lexicographically smallest / largest substring”
- “k-th substring”
- “number of distinct substrings”
- “longest repeated substring”
- “occurs at least K times”
- “longest common substring”
- “minimum rotation”
- “many substring comparisons / sort by substring”

---

## Must-remember contest notes (high-value details)

### 1) Pattern queries: SA is a “sorted suffix dictionary”
When doing \`find_range(p)\` / \`count(p)\`, remember:

- The matches are exactly a contiguous SA segment \`[L, R)\`.
- \`R - L\` is the count.
- \`sa.sa[L..R-1]\` are all starting positions (in lexicographic suffix order).

This is the cleanest mental model for “count occurrences / list positions” problems.

---

### 2) Separator rule (two strings problems)
When you do \`t = a + sep + b\`:

- \`sep\` must be a character that does **not** appear in \`a\` or \`b\`.
- If inputs can contain all ASCII characters, use a separator outside the alphabet by mapping to integers (or pick \`\0\` only if you’re careful with C++ strings).

Contest-safe approach:
- If alphabet is lowercase letters, \`sep = '{'\` works.
- If alphabet is \`a-zA-Z0-9\`, \`sep = '$'\` usually works.

---

### 3) The 3 “LCP facts” you should memorize
After \`sa.build_lcp()\`:

1) **Longest repeated substring (≥2 times)** length is \`max(lcp)\`.
2) **Distinct substrings** (non-empty) is:
    $$n(n+1)/2 - \sum lcp$$
3) **Appears at least K times** is:
    $$\max_i \min(lcp[i+1..i+K-1])$$
    (sliding window minimum over LCP)

If a problem smells like “repeat / distinct / frequency”, these facts are usually the intended shortcut.

---

### 4) Substring compare trick (why RMQ matters)
If you see:
- “compare substrings many times”, or
- “sort many substrings”,

then SA + LCP + RMQ gives:

- \`lcp_suffix(i, j)\` in **O(1)**
- \`compare_substrings(l1,r1,l2,r2)\` in **O(1)**

That’s a huge upgrade vs naive comparison (which can be O(length) per query).

---

### 5) Complexity reality check (when this exact code is safe)
This note uses \`O(n log² n)\` SA build (because of \`sort\` with a comparator).

Rule of thumb:
- \`n <= 2e5\` → almost always OK
- \`n ~ 5e5\` → often OK in C++ with fast IO, but borderline on slow judges
- \`n >= 1e6\` → risky; consider \`O(n log n)\` (radix sorting) or SA-IS

If constraints are huge, SA might still be the right idea, but you need a faster construction.

---

### 6) Common pitfalls (things that cause WA/TLE)

1) **Forgetting \`build_lcp()\`** before using \`lcp_suffix\` or substring compare.
2) **Wrong separator** (separator appears in strings) → false matches.
3) **Assuming SA positions are sorted by index**: they’re sorted by suffix lexicographic order.
4) **Very large query patterns**: \`s.compare(sa[mid], m, p)\` is O(m) each time, so total is \`O(m log n)\` per query.
5) **Multi-testcase**: rebuild SA per test; don’t reuse arrays without re-init.

---

### 7) “Think SA or think something else?” (fast choice table)

- **One pattern, one text** → KMP/Z
- **Many patterns, one text** → SA (or Aho–Corasick if many patterns at once)
- **Distinct substrings / k-th substring / repeated substrings** → SA+LCP (or suffix automaton)
- **Dynamic updates to string** → hashing/segment tree/other dynamic structures (SA is static)
- **Palindromes** → Manacher / palindromic tree (SA is usually not first choice)

---

### 8) Quick sanity tests (debugging in 60 seconds)
When you’re unsure your SA is correct:

1) Print first few \`sa\` entries and the suffixes, verify they’re sorted.
2) Verify inverse ranks: \`pos[sa[i]] == i\` for all \`i\`.
3) For random \`i\`, check \`lcp_suffix(i, i) == n-i\`.
4) For adjacent suffixes, \`lcp[i] == commonPrefixLen( s.substr(sa[i]), s.substr(sa[i-1]) )\`.



`,
};

export default suffixArrayDetails;
