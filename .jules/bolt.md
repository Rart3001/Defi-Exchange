## 2026-03-25 - Promise.all for Concurrent RPC Calls
**Learning:** Independent blockchain read operations (like `provider.getBalance` and `contract.balanceOf`) should be wrapped in `Promise.all` rather than awaited sequentially. This reduces network round-trip latency and improves application performance.
**Action:** Always check for sequentially awaited independent async read operations and convert them to use `Promise.all` where applicable.
