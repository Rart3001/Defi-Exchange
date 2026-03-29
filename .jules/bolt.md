
## 2024-05-18 - Batching RPC calls with Promise.all
**Learning:** Sequential RPC read operations in functions like `getAmounts` create a waterfall effect, significantly slowing down data fetching.
**Action:** Use `Promise.all` to execute independent RPC read operations concurrently to minimize network latency.
