## 2023-10-27 - First Depositor Attack in AMMs
**Vulnerability:** Found a "First Depositor Attack" where an attacker can steal funds from the first liquidity provider by manipulating the pool ratio with a tiny initial deposit and a large direct transfer.
**Learning:** AMMs that mint initial liquidity proportional to `sqrt(x*y)` or just `x` (in this case) are vulnerable if the total supply is extremely small (1 wei). Integer division truncates the victim's share to zero.
**Prevention:** Mint a minimum liquidity amount (e.g., 1000 wei) to a dead address (`0x...dEaD`) on the first deposit. This makes the attack prohibitively expensive (1000x the victim's deposit).

## 2024-05-22 - Reentrancy in AMM AddLiquidity
**Vulnerability:** The `addLiquidity` function performed `transferFrom` (Interaction) before calling `_mint` (Effect), violating the Checks-Effects-Interactions pattern. This could allow a malicious token or hook-enabled token to reenter the function and manipulate the reserve ratio before the LP tokens are minted.
**Learning:** Even if the intended token is standard ERC20, AMM contracts should not rely on the behavior of external tokens. Reentrancy can occur if control flow is handed over to an external contract before state is finalized.
**Prevention:** Use the `ReentrancyGuard` modifier on all external functions that perform state changes and external calls, especially when the CEI pattern cannot be strictly followed or as a defense-in-depth measure.
