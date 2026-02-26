# Palette's Journal - UX & Accessibility Learnings

## 2024-05-24 - Accessibility Patterns in Crypto DApps
**Learning:** Tabbed interfaces in DApps often rely solely on visual cues (like color changes) for state, leaving screen reader users unaware of the current mode (Liquidity vs Swap).
**Action:** Always implement `role="tablist"` and `role="tab"` with `aria-selected` attributes for mode switchers, even if they look like simple buttons.
