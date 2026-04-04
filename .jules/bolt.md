## 2024-05-24 - Debouncing RPC Calls
**Learning:** In React components that make Ethereum RPC calls (like `calculateCD` or `_getTokensAfterRemove`) based on user input, updating state and making the call on every keystroke can lead to excessive network requests and UI blocking.
**Action:** Always debounce input handlers that trigger expensive network operations using `useRef` and `setTimeout`, ensuring to clear the timeout in a cleanup `useEffect` on component unmount.
