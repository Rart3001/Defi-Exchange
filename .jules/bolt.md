## 2026-03-21 - Debounce input fields triggering RPC calls
**Learning:** Input fields that calculate expected values on every keystroke by triggering RPC calls (like calculating expected tokens) create performance bottlenecks and UI jank.
**Action:** Always debounce input handlers that trigger expensive operations like RPC calls using `useRef` and `setTimeout` to prevent excessive network requests.
