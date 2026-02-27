# Bolt's Journal ⚡

## 2024-05-22 - [Parallelizing Blockchain Reads]
**Learning:** React `useEffect` or event handlers that sequentially await multiple independent blockchain read operations (like `await getBalance(); await getTokenBalance();`) create a waterfall effect, significantly slowing down the UI update.
**Action:** Use `Promise.all()` to execute these independent read operations concurrently. This reduces the total wait time to the duration of the slowest request rather than the sum of all requests.
