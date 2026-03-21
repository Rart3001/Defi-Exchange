## 2024-05-24 - [Concurrent Blockchain Reads]
**Learning:** Independent blockchain read operations (e.g., `getEtherBalance`, `getCDTokensBalance`) in the frontend are often sequentially awaited by default, causing unnecessary network round-trip delays that bottleneck performance.
**Action:** Use `Promise.all` to group and execute independent RPC calls concurrently to significantly reduce data fetching time.
