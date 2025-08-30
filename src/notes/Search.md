## Search

In linear search, checking one item at a time is very similar to .indexOf(). This would be O(n).

For search prior to binary, if you search by 10% at a time it's still O(n). O(10 + 0.1N) = O(N)

With binary search, you get a O(log n) runtime. First search is 1/2 N, then N/4, N/8, and so on.
N/2^k = 1 => log2^N = k => log N

If the inputs halve at each step, it's likely O(log n) or O(n log n)


