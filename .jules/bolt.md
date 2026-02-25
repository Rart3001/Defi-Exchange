# Bolt's Journal

This journal documents critical performance learnings and patterns discovered while optimizing the codebase.

## 2024-05-22 - [Parallel Data Fetching]
**Learning:** Sequential `await` calls in `getAmounts` were causing a "waterfall" effect, delaying the UI update until all blockchain reads were complete.
**Action:** Always check for independent async operations and use `Promise.all` to execute them concurrently.
