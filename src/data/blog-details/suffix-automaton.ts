export interface BlogDetail {
  slug: string;
  title: string;
  content: string;
}

export const suffixAutomatonDetails: BlogDetail = {
  slug: 'suffix-automaton',
  title: 'Suffix Automaton (SAM) — Competitive Programming Note',
  content: `# Suffix Automaton (SAM) — Competitive Programming Note (C++)

Suffix Automaton is a **compressed DFA of all substrings** of a string \`S\`.
It is often the fastest “one build, many substring facts” structure.

- Build time: \`O(|S| * alphabet)\` with fixed array transitions, or \`O(|S|)\` expected with hash-map transitions.
- States: at most \`2*|S| - 1\`.
- Each SAM state represents an equivalence class of substrings having the same \`endpos\` set.

---

## What SAM gives you (mentally)

After you build SAM for \`S\`, it can answer many tasks about substrings of \`S\`:

- Check if a pattern \`P\` is a substring.
- Count **distinct substrings** of \`S\`.
- Count **occurrences** of any substring (after one propagation pass).
- Find **longest repeated substring**.
- Find **longest common substring** between \`S\` and another string \`T\`.
- Solve many “online append characters” tasks (SAM is incremental).

SAM is usually **not** the best tool for:

- Prefix-function / border tasks (use KMP / Z).
- “Exact match for many patterns” with small alphabet and many patterns (use Aho–Corasick).
- LCP-heavy tasks requiring sorted suffixes (suffix array / suffix tree).
- When only 1–2 substring checks are needed (rolling hash may be simpler).

---

## Black-box usage in contests (how to use without re-deriving)

### Step 1: Build

\`\`\`cpp
SuffixAutomaton sam;
sam.build(s); // O(n)
\`\`\`

### Step 2: Pick the recipe you need

- **Substring existence**: walk transitions from state \`0\`.
- **Distinct substrings**: sum \`len[v] - len[link[v]]\` over states \`v != 0\`.
- **Occurrences of substring**: after \`sam.compute_occurrences()\`, walk to the state of substring and read \`occ[state]\`.
- **Longest repeated substring**: after occurrences computed, take \`max(len[v])\` among states with \`occ[v] >= 2\`.
- **Longest common substring (LCS)** with \`T\`: run \`sam.lcs_len(T)\`.

### Step 3: Remember the two invariants

For any state \`v\`:

- \`len[v]\` = length of the **longest** string in that class.
- Let \`p = link[v]\`.
  Then the set of lengths of strings in state \`v\` is:

$$ (len[link[v]]+1) \ldots len[v] $$

This is why formulas like \`len[v] - len[link[v]]\` show up everywhere.

---

## Minimal contest template (lowercase \`a\`–\`z\`, fastest)

This is the “default” for most problems; it’s extremely fast and simple.

\`\`\`cpp
struct SuffixAutomaton {
    static constexpr int SIG = 26;

    struct State {
        std::array<int, SIG> next;
        int link;
        int len;
        long long occ; // endpos count (after propagation)

        State() : link(-1), len(0), occ(0) { next.fill(-1); }
    };

    std::vector<State> st;
    int last;

    void init(int maxLen) {
        st.clear();
        st.reserve(2 * maxLen + 1);
        st.push_back(State());
        st[0].link = -1;
        st[0].len = 0;
        st[0].occ = 0;
        last = 0;
    }

    static int id(char c) { return c - 'a'; }

    void extend(char ch) {
        int c = id(ch);
        int cur = (int)st.size();
        st.push_back(State());
        st[cur].len = st[last].len + 1;
        st[cur].occ = 1;

        int p = last;
        while (p != -1 && st[p].next[c] == -1) {
            st[p].next[c] = cur;
            p = st[p].link;
        }
        if (p == -1) {
            st[cur].link = 0;
        } else {
            int q = st[p].next[c];
            if (st[p].len + 1 == st[q].len) {
                st[cur].link = q;
            } else {
                int clone = (int)st.size();
                st.push_back(st[q]);
                st[clone].len = st[p].len + 1;
                st[clone].occ = 0; // IMPORTANT: clones do not correspond to a new end position

                while (p != -1 && st[p].next[c] == q) {
                    st[p].next[c] = clone;
                    p = st[p].link;
                }
                st[q].link = st[cur].link = clone;
            }
        }
        last = cur;
    }

    void build(const std::string& s) {
        init((int)s.size());
        for (char c : s) extend(c);
    }

    long long distinct_substrings() const {
        long long ans = 0;
        for (int v = 1; v < (int)st.size(); v++) {
            ans += st[v].len - st[st[v].link].len;
        }
        return ans;
    }

    // Returns state id after reading p, or -1 if p is not a substring.
    int walk(const std::string& p) const {
        int v = 0;
        for (char ch : p) {
            int c = id(ch);
            if (c < 0 || c >= SIG) return -1;
            v = st[v].next[c];
            if (v == -1) return -1;
        }
        return v;
    }

    bool contains(const std::string& p) const { return walk(p) != -1; }

    // Counting-sort states by len (ascending). Useful for propagation.
    std::vector<int> order_by_len() const {
        int maxLen = 0;
        for (auto &s : st) maxLen = std::max(maxLen, s.len);
        std::vector<int> cnt(maxLen + 1, 0);
        for (auto &s : st) cnt[s.len]++;
        for (int i = 1; i <= maxLen; i++) cnt[i] += cnt[i - 1];

        std::vector<int> order(st.size());
        for (int i = (int)st.size() - 1; i >= 0; i--) {
            order[--cnt[st[i].len]] = i;
        }
        return order;
    }

    // After calling, st[v].occ = number of occurrences of any substring whose path ends at v.
    // (Specifically, occurrences of the endpos-equivalence class.)
    void compute_occurrences() {
        auto order = order_by_len();
        for (int i = (int)order.size() - 1; i > 0; i--) { // skip root at i=0 later
            int v = order[i];
            int p = st[v].link;
            if (p != -1) st[p].occ += st[v].occ;
        }
    }

    // Longest Common Substring length between built string S and string T.
    int lcs_len(const std::string& t) const {
        int v = 0;
        int l = 0;
        int best = 0;
        for (char ch : t) {
            int c = id(ch);
            if (c < 0 || c >= SIG) { v = 0; l = 0; continue; }
            while (v != 0 && st[v].next[c] == -1) {
                v = st[v].link;
                l = st[v].len;
            }
            if (st[v].next[c] != -1) {
                v = st[v].next[c];
                l++;
            } else {
                v = 0;
                l = 0;
            }
            best = std::max(best, l);
        }
        return best;
    }
};
\`\`\`

---

## Common “recipes” (copy-paste logic)

### 1) Count distinct substrings

Why SAM: direct formula \`sum(len[v] - len[link[v]])\` after one build.

\`\`\`cpp
long long ans = sam.distinct_substrings();
\`\`\`

### 2) Check if \`P\` is a substring

Why SAM: \`O(|P|)\` walk, no hashes, no collisions.

\`\`\`cpp
if (sam.contains(p)) { ... }
\`\`\`

### 3) Occurrences of a query substring \`P\`

Why SAM: one propagation gives occurrence counts for **all** substrings.

\`\`\`cpp
sam.compute_occurrences();
int v = sam.walk(p);
long long occ = (v == -1 ? 0 : sam.st[v].occ);
\`\`\`

Notes:
- This counts occurrences in the **original** built string.
- Must set \`occ[cur]=1\` on normal states and \`occ[clone]=0\`.

### 4) Longest repeated substring

Why SAM: after \`occ\` propagation, repeated means \`occ[v] >= 2\`.

\`\`\`cpp
sam.compute_occurrences();
int best = 0;
for (int v = 1; v < (int)sam.st.size(); v++) {
    if (sam.st[v].occ >= 2) best = max(best, sam.st[v].len);
}
\`\`\`

### 5) Longest common substring (LCS) of \`S\` and \`T\`

Why SAM: build once on \`S\`, scan \`T\` in linear time.

\`\`\`cpp
int ans = sam.lcs_len(t);
\`\`\`

---

## How to recognize “this is a SAM problem”

Think SAM when the statement smells like:

- “Consider **all substrings**…”
- “How many **distinct** substrings…”
- “Longest substring that…” (especially repeated / common / appears k times)
- “Many queries asking if pattern is substring / count occurrences”
- “Online appends to a string, maintain substring properties”

Don’t reach for SAM when:

- Only prefixes or borders matter → KMP / Z.
- Need to match many patterns in one text → Aho–Corasick.
- Need sorted suffix order / LCP array queries / lexicographic suffix operations → suffix array.

---

## Example patterns (with “why SAM” and “why not something else”)

### Example A — Distinct substrings

**Problem:** Given \`S\`, output number of distinct substrings.

- Why SAM: formula \`Σ(len[v] − len[link[v]])\` is immediate and linear.
- Why not hashing: you’d need store all substrings or do binary searches with set; memory/time worse.

### Example B — Many substring existence queries

**Problem:** Given \`S\` and \`Q\` patterns, answer if each pattern is a substring.

- Why SAM: build once, each query \`O(|P|)\` deterministic.
- Why not suffix array: also works (\`O(|P| log n)\`), but SAM is simpler/faster if you don’t need lex order.

### Example C — Occurrence count for many queries

**Problem:** Given \`S\` and many queries \`P\`, output occurrences of \`P\` in \`S\`.

- Why SAM: one \`compute_occurrences()\` then each query is a walk + read \`occ\`.
- Why not KMP per query: \`O(Q*|S|)\` worst-case.
- Why not hashing: occurrences need extra structures anyway.

### Example D — Longest repeated substring / repeated at least k times

**Problem:** Find max length substring that appears at least 2 (or k) times.

- Why SAM: \`occ[v]\` gives repetition counts across all substrings.
- Why not suffix array: also standard via LCP + RMQ, but SAM is usually quicker to code.

### Example E — Longest common substring of two strings

**Problem:** Given \`S\` and \`T\`, find length of longest substring common to both.

- Why SAM: build on \`S\`, scan \`T\` in linear time.
- Why not DP: \`O(n*m)\` too slow.

### Example F — Online: after each appended char, output #distinct substrings

**Problem:** Start with empty string; append characters; after each append output number of distinct substrings.

- Why SAM: incremental extend; you can maintain answer by adding \`len[last] - len[link[last]]\` after each extend.
- Why not suffix array: rebuilding is heavy.

### Example G — Count distinct substrings appearing at least \`k\` times

**Problem:** Given \`S\` and integer \`k\`, count how many **distinct** substrings occur at least \`k\` times.

- Why SAM: once you have \`occ[v]\` for every state, each state \`v\` contributes exactly

$$
\max(0,\; len[v] - len[link[v]])
$$

    distinct substrings; and if \`occ[v] >= k\`, then **all** of those substrings occur at least \`k\` times.
- Why not suffix array: also doable with LCP + counting, but the implementation is usually longer.

Recipe:

$$
	ext{answer} = \sum_{v \neq 0,\; occ[v] \ge k} (len[v] - len[link[v]])
$$

### Example H — Number of distinct common substrings of \`S\` and \`T\`

**Problem:** Count how many **distinct** substrings appear in both \`S\` and \`T\`.

- Why SAM: build on \`S\`, scan \`T\` once to compute the best match length reaching each state.
- Why not hashing: you’d have to store many substrings (memory) or do complex dedup.

How it works (standard trick):

1) Build SAM for \`S\`.
2) Scan \`T\` like LCS, but whenever you are at state \`v\` with current match length \`l\`, do:

     \`best[v] = max(best[v], l)\`.
3) Propagate \`best\` down suffix links in decreasing \`len\` order:

     \`best[link[v]] = max(best[link[v]], min(best[v], len[link[v]]))\`.

Then each state contributes:

$$
\max(0,\; \min(len[v], best[v]) - len[link[v]])
$$

and summing over \`v != 0\` gives the answer.

When to use: anything that says “common substrings” but asks for **count of distinct**, not just longest.

### Example I — Longest common substring among many strings

**Problem:** Given strings \`S1, S2, ..., Sm\`, find length of the longest substring common to all.

- Why SAM: build once on \`S1\`. For each other string \`Si\`, compute \`best_i[v]\` (max match ending in state \`v\` while scanning \`Si\`), propagate it, and maintain \`mn[v] = min(mn[v], best_i[v])\` across all strings.
- Result:

$$
	ext{answer} = \max_v mn[v]
$$

- Why not suffix array: generalized suffix array works too but is heavier to code.

Use when \`m\` is moderate and total length is large.

### Example J — K-th lexicographic distinct substring

**Problem:** Given \`S\` and \`k\`, output the \`k\`-th substring in lexicographic order among **distinct** substrings.

- Why SAM: SAM is a DAG of all distinct substrings. If you compute \`dp[v] = number of distinct substrings starting from state v\`, you can greedily walk transitions in \`'a'..'z'\` order to construct the k-th.
- Why not suffix array: also possible, but SAM can be simpler if you’re comfortable with DAG DP.

Sketch:

- Compute \`dp[v] = Σ (1 + dp[to])\` over outgoing transitions \`v -> to\` (the \`+1\` counts the substring that ends immediately after taking that edge).
- From root, iterate characters in order; if edge exists to \`to\` with count \`cnt = 1 + dp[to]\`:
    - if \`k > cnt\`, do \`k -= cnt\`
    - else take that char, output it, and set \`v = to\`, \`k--\` (because you consumed the substring equal to current path).

### Example K — Shortest string that is NOT a substring (minimal absent substring)

**Problem:** Given \`S\`, find the shortest (and often lexicographically smallest among shortest) string that does **not** occur in \`S\`.

- Why SAM: SAM recognizes exactly the set of substrings of \`S\`. You need the shortest string rejected by this automaton.
- Why not brute force: impossible for large \`S\`.

Standard BFS idea:

- Do BFS over SAM states by increasing constructed length.
- Keep the current prefix along BFS (store parent pointers: \`(prevState, prevChar)\`).
- When exploring state \`v\`, if there exists a character \`c\` such that \`next[v][c] == -1\`, then the string \`(prefix_of_v + c)\` is absent and is minimal by BFS order.

Use when you see “find smallest missing substring” / “mex substring”.

### Example L — Output one occurrence position of a substring

**Problem:** Given \`S\` and queries \`P\`, output an index where \`P\` occurs in \`S\` (or report none).

- Why SAM: after walking \`P\` to state \`v\`, any substring ending at \`v\` occurs in the original string; if you store a representative end position \`first_pos[v]\`, you can return an occurrence.
- Why not suffix array: also doable, but SAM can answer in \`O(|P|)\` after build.

Implementation note (template tweak):

- Maintain \`first_pos[cur] = len[cur] - 1\` for newly created states.
- For clones, set \`first_pos[clone] = first_pos[q]\`.

Then for query \`P\` reaching state \`v\`, one occurrence is:

$$
[first\_pos[v] - |P| + 1,\; first\_pos[v]]
$$

### Example M — Maximum value of \`f(substring)\` over all substrings

Many tasks look like:

- maximize \`len * occ\` (classic “repetition score”), or
- maximize \`occ\` among substrings with \`len >= L\`, etc.

Why SAM: after \`compute_occurrences()\`, every state \`v\` represents a whole interval of lengths.

Typical easy one:

$$
\max_{v \neq 0} (len[v] \cdot occ[v])
$$

This corresponds to taking the **longest** string in each class; it solves problems like “maximum product length × frequency”.

### Example N — Count total number of substring occurrences (sanity check / subtask)

**Fact:**

$$
\sum_{v \neq 0} occ[v] \cdot (len[v] - len[link[v]]) = \frac{n(n+1)}{2}
$$

where \`n = |S|\`.

Why it matters:

- Useful as a correctness check after implementing \`compute_occurrences()\`.
- Some problems directly ask for aggregated sums over all substrings (e.g., sum of occurrences of all distinct substrings).

### Example O — When NOT to use SAM (concrete counterexamples)

1) **Borders / prefix-suffix queries** (e.g., “longest border of every prefix”): use KMP/Z.
2) **Palindromic substrings** (e.g., “count distinct palindromes”): use Eertree (palindromic tree).
3) **Substring queries on many different ranges of one string** (e.g., “distinct substrings in \`S[l..r]\` for many queries”): SAM alone is not enough; you’ll need suffix array + LCP, Mo’s on suffixes, suffix automaton with offline/persistent tricks, etc.
4) **Many patterns matched in one text**: Aho–Corasick is usually the intended tool.

---

## Common pitfalls

- **Forgetting \`clone.occ = 0\`** breaks occurrence counts.
- **Not propagation-sorting by length** breaks occurrence accumulation.
- Alphabet mismatch: template assumes lowercase \`a..z\`.
  If the input contains other chars, compress alphabet or switch to \`unordered_map\` transitions.

---

## If your alphabet is large (general template idea)

If characters are arbitrary (\`ASCII\`, \`digits+letters\`, etc.), use:

- \`unordered_map<char,int>\` per state (slower but robust), OR
- coordinate-compress the alphabet of \`S\` into \`[0..k-1]\` and keep arrays.

In contests, if constraints are big, prefer compress-to-array.
`,
};

export default suffixAutomatonDetails;
