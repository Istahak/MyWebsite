export interface BlogDetail {
  slug: string;
  title: string;
  content: string;
  tableOfContents?: {
    title: string;
    anchor: string;
    level: number;
  }[];
  codeExamples?: {
    title: string;
    language: string;
    code: string;
    explanation?: string;
  }[];
  relatedTopics?: string[];
  practiceProblems?: {
    title: string;
    platform: string;
    difficulty: string;
    link: string;
  }[];
  references?: {
    title: string;
    url: string;
  }[];
}

export const dynamicProgrammingGuideDetails: BlogDetail = {
  slug: "dynamic-programming-guide",
  title: "Dynamic Programming: From Beginner to Expert",
  content: `
# Dynamic Programming: From Beginner to Expert

Dynamic programming is one of the most important algorithmic techniques in competitive programming. It's a method for solving complex problems by breaking them down into simpler subproblems.

## What is Dynamic Programming?

Dynamic Programming (DP) is an algorithmic technique that solves problems by storing the results of subproblems to avoid computing the same results again. It's particularly useful for optimization problems where we want to find the best solution among many possible solutions.

### Key Characteristics

1. **Optimal Substructure**: The optimal solution to the problem contains optimal solutions to subproblems
2. **Overlapping Subproblems**: The same subproblems are solved multiple times in a naive recursive approach
3. **Memoization or Tabulation**: Store results of subproblems to avoid recomputation

## When to Use Dynamic Programming

You should consider DP when:
- The problem can be broken down into subproblems
- Subproblems overlap (same subproblems solved multiple times)
- The problem exhibits optimal substructure
- You're looking for optimal solutions (maximum, minimum, count, etc.)

## Common DP Patterns

### 1. Linear DP

Linear DP problems can be solved by considering elements one by one in a sequence.

**Example: Fibonacci Sequence**

\`\`\`cpp
// Recursive approach (inefficient)
int fibRecursive(int n) {
    if (n <= 1) return n;
    return fibRecursive(n-1) + fibRecursive(n-2);
}

// DP approach (efficient)
int fibDP(int n) {
    if (n <= 1) return n;
    
    vector<int> dp(n + 1);
    dp[0] = 0;
    dp[1] = 1;
    
    for (int i = 2; i <= n; i++) {
        dp[i] = dp[i-1] + dp[i-2];
    }
    
    return dp[n];
}

// Space-optimized DP
int fibOptimized(int n) {
    if (n <= 1) return n;
    
    int prev2 = 0, prev1 = 1;
    for (int i = 2; i <= n; i++) {
        int curr = prev1 + prev2;
        prev2 = prev1;
        prev1 = curr;
    }
    
    return prev1;
}
\`\`\`

### 2. 2D DP

Problems involving two dimensions like grids, two strings, or two sequences.

**Example: Longest Common Subsequence**

\`\`\`cpp
int longestCommonSubsequence(string text1, string text2) {
    int m = text1.length(), n = text2.length();
    vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
    
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (text1[i-1] == text2[j-1]) {
                dp[i][j] = dp[i-1][j-1] + 1;
            } else {
                dp[i][j] = max(dp[i-1][j], dp[i][j-1]);
            }
        }
    }
    
    return dp[m][n];
}
\`\`\`

### 3. Tree DP

Dynamic programming on trees, where we solve subproblems for subtrees.

**Example: Maximum Path Sum in Binary Tree**

\`\`\`cpp
class Solution {
private:
    int maxSum = INT_MIN;
    
    int maxPathHelper(TreeNode* node) {
        if (!node) return 0;
        
        int leftMax = max(0, maxPathHelper(node->left));
        int rightMax = max(0, maxPathHelper(node->right));
        
        // Current path sum including this node
        int currentMax = node->val + leftMax + rightMax;
        maxSum = max(maxSum, currentMax);
        
        // Return max path sum from this node to parent
        return node->val + max(leftMax, rightMax);
    }
    
public:
    int maxPathSum(TreeNode* root) {
        maxPathHelper(root);
        return maxSum;
    }
};
\`\`\`

## State Design and Transition

The most crucial part of DP is designing the state and transition correctly.

### State Definition

A state should:
- Uniquely represent a subproblem
- Contain all necessary information to solve the subproblem
- Be as simple as possible

### Transition Formula

The transition should:
- Express how to compute the current state from previous states
- Handle all possible cases
- Maintain the optimal substructure property

## Optimization Techniques

### 1. Space Optimization

Many DP problems can be optimized from O(n²) space to O(n) or even O(1) space.

### 2. Rolling Arrays

When we only need the previous row/column, we can use rolling arrays.

\`\`\`cpp
// Instead of 2D array
vector<vector<int>> dp(m, vector<int>(n));

// Use two 1D arrays
vector<int> prev(n), curr(n);
\`\`\`

### 3. Bottom-Up vs Top-Down

- **Bottom-Up (Tabulation)**: Build solutions from smallest subproblems
- **Top-Down (Memoization)**: Solve recursively with caching

## Common Mistakes to Avoid

1. **Incorrect state definition**: Missing important parameters
2. **Wrong base cases**: Not handling edge cases properly
3. **Incorrect transition**: Missing cases or wrong formula
4. **Integer overflow**: Not using appropriate data types
5. **TLE due to inefficient implementation**: Not optimizing time/space complexity

## Practice Strategy

### Beginner Level
Start with these classic problems:
- Climbing Stairs
- House Robber
- Coin Change
- Maximum Subarray

### Intermediate Level
- Longest Increasing Subsequence
- Edit Distance
- 0/1 Knapsack
- Palindromic Subsequence

### Advanced Level
- Matrix Chain Multiplication
- Optimal Binary Search Tree
- Longest Common Substring with K mismatches
- DP on Trees

## Tips for Contest Success

1. **Identify DP problems quickly**: Look for optimization, counting, or decision problems
2. **Start with brute force**: Think recursively first, then optimize
3. **Define states clearly**: Write down what each state represents
4. **Handle base cases**: Always check boundary conditions
5. **Optimize space when needed**: Sometimes crucial for memory limits
6. **Practice implementation**: Speed matters in contests

## Conclusion

Dynamic Programming is a powerful technique that can solve many optimization problems efficiently. The key is to:

1. Recognize when to use DP
2. Define the state correctly
3. Find the right transition formula
4. Implement efficiently

With consistent practice and understanding of these patterns, you'll be able to solve most DP problems in competitive programming contests.

Remember: Every expert was once a beginner. Keep practicing, and you'll master dynamic programming!

---

*Happy coding! 🚀*
  `,
  
  tableOfContents: [
    { title: "What is Dynamic Programming?", anchor: "what-is-dynamic-programming", level: 2 },
    { title: "When to Use Dynamic Programming", anchor: "when-to-use-dynamic-programming", level: 2 },
    { title: "Common DP Patterns", anchor: "common-dp-patterns", level: 2 },
    { title: "Linear DP", anchor: "linear-dp", level: 3 },
    { title: "2D DP", anchor: "2d-dp", level: 3 },
    { title: "Tree DP", anchor: "tree-dp", level: 3 },
    { title: "State Design and Transition", anchor: "state-design-and-transition", level: 2 },
    { title: "Optimization Techniques", anchor: "optimization-techniques", level: 2 },
    { title: "Common Mistakes to Avoid", anchor: "common-mistakes-to-avoid", level: 2 },
    { title: "Practice Strategy", anchor: "practice-strategy", level: 2 }
  ],

  codeExamples: [
    {
      title: "Fibonacci with DP",
      language: "cpp",
      code: `int fibonacci(int n) {
    if (n <= 1) return n;
    
    vector<int> dp(n + 1);
    dp[0] = 0;
    dp[1] = 1;
    
    for (int i = 2; i <= n; i++) {
        dp[i] = dp[i-1] + dp[i-2];
    }
    
    return dp[n];
}`,
      explanation: "Basic linear DP example showing how to avoid recomputation of subproblems."
    },
    {
      title: "Coin Change Problem",
      language: "cpp",
      code: `int coinChange(vector<int>& coins, int amount) {
    vector<int> dp(amount + 1, amount + 1);
    dp[0] = 0;
    
    for (int i = 1; i <= amount; i++) {
        for (int coin : coins) {
            if (coin <= i) {
                dp[i] = min(dp[i], dp[i - coin] + 1);
            }
        }
    }
    
    return dp[amount] > amount ? -1 : dp[amount];
}`,
      explanation: "Classic DP problem demonstrating optimal substructure and overlapping subproblems."
    }
  ],

  relatedTopics: [
    "Recursion and Memoization",
    "Graph Algorithms",
    "Greedy Algorithms",
    "Divide and Conquer"
  ],

  practiceProblems: [
    {
      title: "Climbing Stairs",
      platform: "LeetCode",
      difficulty: "Easy",
      link: "https://leetcode.com/problems/climbing-stairs/"
    },
    {
      title: "Coin Change",
      platform: "LeetCode", 
      difficulty: "Medium",
      link: "https://leetcode.com/problems/coin-change/"
    },
    {
      title: "Longest Increasing Subsequence",
      platform: "LeetCode",
      difficulty: "Medium", 
      link: "https://leetcode.com/problems/longest-increasing-subsequence/"
    },
    {
      title: "Edit Distance",
      platform: "LeetCode",
      difficulty: "Hard",
      link: "https://leetcode.com/problems/edit-distance/"
    },
    {
      title: "Frog 1",
      platform: "AtCoder",
      difficulty: "Beginner",
      link: "https://atcoder.jp/contests/dp/tasks/dp_a"
    }
  ],

  references: [
    {
      title: "Introduction to Algorithms (CLRS)",
      url: "https://mitpress.mit.edu/books/introduction-algorithms-third-edition"
    },
    {
      title: "Dynamic Programming - GeeksforGeeks",
      url: "https://www.geeksforgeeks.org/dynamic-programming/"
    },
    {
      title: "DP Tutorial - Codeforces",
      url: "https://codeforces.com/blog/entry/43256"
    }
  ]
};
