
## 2024-05-19 - Use Promise.all() for independent blockchain reads
**Learning:** Sequential `await` calls for independent blockchain read operations (e.g., `getEtherBalance`, `getCDTokensBalance`, `getReserveOfCDTokens`) create unnecessary cumulative network latency and slow down UI loading significantly.
**Action:** Always wrap independent blockchain read operations in `Promise.all()` to execute them concurrently, reducing total wait time to the slowest single request.
