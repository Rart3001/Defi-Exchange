## 2023-10-27 - First Depositor Attack in AMMs
**Vulnerability:** Found a "First Depositor Attack" where an attacker can steal funds from the first liquidity provider by manipulating the pool ratio with a tiny initial deposit and a large direct transfer.
**Learning:** AMMs that mint initial liquidity proportional to `sqrt(x*y)` or just `x` (in this case) are vulnerable if the total supply is extremely small (1 wei). Integer division truncates the victim's share to zero.
**Prevention:** Mint a minimum liquidity amount (e.g., 1000 wei) to a dead address (`0x...dEaD`) on the first deposit. This makes the attack prohibitively expensive (1000x the victim's deposit).

## 2024-02-28 - Avoid `.transfer()` for Ether Transfers
**Vulnerability:** The `Exchange` contract was using `payable(msg.sender).transfer()` to send Ether back to users. This relies on a fixed gas limit of 2300. If the recipient is a smart contract that requires more gas to execute its fallback/receive function, the transfer will fail, effectively locking their funds.
**Learning:** Smart contract gas costs can change (e.g., EIP-1884), making fixed-gas transfers dangerous. `payable(msg.sender).call{value: amount}("")` is the recommended approach to forward all available gas. However, this introduces reentrancy risks, so it must be paired with reentrancy protection.
**Prevention:** Use `.call{value: ...}("")` and check the boolean return value (`require(success, "Transfer failed");`). Always implement the Checks-Effects-Interactions pattern and use OpenZeppelin's `ReentrancyGuard` (`nonReentrant` modifier) to prevent reentrancy attacks when making external calls.
