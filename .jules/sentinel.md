## 2023-10-27 - First Depositor Attack in AMMs
**Vulnerability:** Found a "First Depositor Attack" where an attacker can steal funds from the first liquidity provider by manipulating the pool ratio with a tiny initial deposit and a large direct transfer.
**Learning:** AMMs that mint initial liquidity proportional to `sqrt(x*y)` or just `x` (in this case) are vulnerable if the total supply is extremely small (1 wei). Integer division truncates the victim's share to zero.
**Prevention:** Mint a minimum liquidity amount (e.g., 1000 wei) to a dead address (`0x...dEaD`) on the first deposit. This makes the attack prohibitively expensive (1000x the victim's deposit).

## 2024-05-22 - Zero Slippage Tolerance in Swap
**Vulnerability:** The `swapTokens` function calculated the exact expected output amount based on current reserves and passed it as the minimum required output (`minTokens`) to the smart contract.
**Learning:** In a live blockchain environment, reserves change constantly due to other transactions. Requiring exact output amount means any unfavorable price movement of even 1 wei (which is extremely common) causes the transaction to revert, resulting in a Denial of Service for users.
**Prevention:** Implement a slippage tolerance (e.g., 1%) by calculating `minAmount = expectedAmount * 99 / 100`. This allows the transaction to succeed even if the price moves slightly against the user, while still protecting against large sandwich attacks.
