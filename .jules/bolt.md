## 2024-05-22 - [Parallelizing Independent Async Calls]
**Learning:** React `useEffect` or initialization functions often perform multiple independent async reads. Awaiting them sequentially creates a waterfall effect, significantly slowing down the initial render or data refresh.
**Action:** Identify independent async operations and bundle them with `Promise.all()` to execute concurrently. In this case, fetching balances and reserves simultaneously reduced the total wait time to the duration of the slowest request.
