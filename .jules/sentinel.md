## 2023-10-27 - First Depositor Attack in AMMs
**Vulnerability:** Found a "First Depositor Attack" where an attacker can steal funds from the first liquidity provider by manipulating the pool ratio with a tiny initial deposit and a large direct transfer.
**Learning:** AMMs that mint initial liquidity proportional to `sqrt(x*y)` or just `x` (in this case) are vulnerable if the total supply is extremely small (1 wei). Integer division truncates the victim's share to zero.
**Prevention:** Mint a minimum liquidity amount (e.g., 1000 wei) to a dead address (`0x...dEaD`) on the first deposit. This makes the attack prohibitively expensive (1000x the victim's deposit).

## 2024-05-22 - Zero Slippage Tolerance
**Vulnerability:** The DApp enforced exact output matching for swaps (`minTokens = expectedTokens`), causing transactions to revert on any price movement or front-running.
**Learning:** Naive implementations often ignore slippage, assuming `expectedTokens` is a valid `minTokens`. This makes the DApp unusable and vulnerable to griefing.
**Prevention:** Always implement a slippage tolerance (e.g., 0.5% - 1%) when calculating `minTokens` for swap operations.
