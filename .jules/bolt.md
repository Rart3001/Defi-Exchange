## 2026-02-23 - RPC Calls on Keystroke
**Learning:** Frequent RPC calls (e.g., `totalSupply()`, `getAmountOfTokens()`) triggered by `onChange` events in React components create significant performance bottlenecks and potential rate-limit issues.
**Action:** Always verify if an async calculation in an input handler involves network requests. If so, immediately implement debouncing to batch updates and reduce load.
