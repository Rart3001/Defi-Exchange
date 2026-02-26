## 2026-02-26 - Sequential RPC Calls
**Learning:** Fetching blockchain data (balances, reserves) sequentially using `await` creates significant delays due to network latency for each request.
**Action:** Use `Promise.all` to execute independent read-only contract calls in parallel, reducing total load time to the duration of the slowest request.
