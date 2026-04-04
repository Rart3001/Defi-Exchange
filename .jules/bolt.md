## 2024-05-18 - [Concurrent Read Operations]
**Learning:** Independent blockchain read operations in `getAmounts` can be batched concurrently using `Promise.all` rather than sequentially executing them, which results in faster UI rendering for the user upon loading.
**Action:** Always check if a sequence of multiple `await`s fetching independent data can be grouped via `Promise.all`.
