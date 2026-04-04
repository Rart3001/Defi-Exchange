## 2023-10-27 - Sequential Blockchain Reads
**Learning:** Independent blockchain read operations (like provider.getBalance, contract.balanceOf) should always be wrapped in Promise.all rather than awaited sequentially to reduce network round-trip latency.
**Action:** Batch independent read calls using Promise.all.
