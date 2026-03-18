## 2025-02-12 - Concurrent RPC calls for Blockchain Reads
**Learning:** Sequential `await` calls for independent blockchain data (like contract reserves and balances) cause significant unnecessary network latency bottlenecks.
**Action:** Use `Promise.all` to fetch independent blockchain read operations concurrently whenever possible to reduce overall network round-trip time.
