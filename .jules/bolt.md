
## 2024-05-19 - Promise.all for independent contract reads
**Learning:** In DApps, fetching state from the blockchain piece by piece can drastically slow down the application, as each request incurs a network round trip. When querying multiple independent data points from identical or different smart contracts on the same provider.
**Action:** Always wrap independent blockchain read operations (`provider.getBalance`, `contract.balanceOf`, etc.) in `Promise.all` instead of awaiting them sequentially.
