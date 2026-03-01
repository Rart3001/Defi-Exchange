## 2024-03-01 - Batch JSON-RPC reads with Promise.all
**Learning:** Sequential await operations for independent blockchain reads (e.g., getting multiple balances in a Web3 dApp) cause severe performance bottlenecks due to accumulated network round-trip latency. This is a critical pattern in Ethers.js/Web3 frontend performance.
**Action:** Always wrap independent blockchain read operations (like `provider.getBalance`, `contract.balanceOf`, etc.) in `Promise.all` rather than awaiting them sequentially.
