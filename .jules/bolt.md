## 2024-05-20 - Debounce Input Handlers To Prevent RPC Spam
**Learning:** React state inputs that perform expensive backend or RPC operations on every keystroke (`onChange`) create massive performance bottlenecks and layout spam.
**Action:** When working on performance, always ensure `onChange` inputs triggering external APIs are debounced utilizing `useRef` and `setTimeout`. Always clear these timeouts inside a `useEffect` cleanup return function.
