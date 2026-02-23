const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Exchange Security", function () {
  let exchange;
  let token;
  let owner;
  let user1; // Attacker
  let user2; // Victim

  beforeEach(async function () {
    [owner, user1, user2] = await ethers.getSigners();

    // Deploy Mock Token
    const MockToken = await ethers.getContractFactory("MockToken");
    token = await MockToken.deploy();
    await token.deployed();

    // Deploy Exchange
    const Exchange = await ethers.getContractFactory("Exchange");
    exchange = await Exchange.deploy(token.address);
    await exchange.deployed();

    // Mint tokens to users (mock token mints to deployer, need to transfer)
    await token.transfer(user1.address, ethers.utils.parseEther("100"));
    await token.transfer(user2.address, ethers.utils.parseEther("100"));

    // Approve exchange to spend tokens
    await token.connect(user1).approve(exchange.address, ethers.utils.parseEther("1000"));
    await token.connect(user2).approve(exchange.address, ethers.utils.parseEther("1000"));
  });

  it("Should prevent First Depositor Attack via MINIMUM_LIQUIDITY", async function () {
    // 1. Attacker (User1) tries to add < MINIMUM_LIQUIDITY
    const smallAmount = 1;
    // Should revert due to underflow (Solidity 0.8.x) or explicit failure
    await expect(
        exchange.connect(user1).addLiquidity(smallAmount, { value: smallAmount })
    ).to.be.reverted;

    // 2. Attacker adds exactly MINIMUM_LIQUIDITY (1000 wei)
    const minLiquidity = 1000;
    await exchange.connect(user1).addLiquidity(minLiquidity, { value: minLiquidity });

    // Verify state
    // Total Supply should be 1000
    expect(await exchange.totalSupply()).to.equal(minLiquidity);
    // Attacker balance should be 0 (1000 - 1000 burned)
    expect(await exchange.balanceOf(user1.address)).to.equal(0);
    // Burn address should have 1000
    expect(await exchange.balanceOf("0x000000000000000000000000000000000000dEaD")).to.equal(minLiquidity);

    // 3. Attacker inflates ETH balance via selfdestruct (10 ETH)
    const attackAmount = ethers.utils.parseEther("10"); // 10 ETH

    // Deploy SelfDestruct contract
    const AttackSelfDestruct = await ethers.getContractFactory("AttackSelfDestruct");
    const selfDestruct = await AttackSelfDestruct.deploy();
    await selfDestruct.deployed();

    // Execute attack: send 10 ETH to Exchange via selfdestruct
    await selfDestruct.attack(exchange.address, { value: attackAmount });

    // Verify reserves inflated
    const exchangeBalance = await ethers.provider.getBalance(exchange.address);
    // Balance should be 1000 wei (initial) + 10 ETH (attack)
    expect(exchangeBalance).to.equal(attackAmount.add(minLiquidity));

    // 4. Victim (User2) adds liquidity (1 ETH)
    const victimEth = ethers.utils.parseEther("1");

    // Victim adds liquidity
    await exchange.connect(user2).addLiquidity(victimEth, { value: victimEth });

    // Verify victim received LP tokens
    // liquidity = (totalSupply * msg.value) / ethReserve
    // totalSupply = 1000
    // msg.value = 1 ETH = 10^18
    // ethReserve = 10 ETH + 1000 wei = 10*10^18 + 1000

    // liquidity = (1000 * 10^18) / (10*10^18 + 1000)
    // liquidity ≈ 1000 / 10 = 100

    const victimLP = await exchange.balanceOf(user2.address);
    console.log("Victim LP Balance:", victimLP.toString());

    // Assert victim received LP tokens > 0
    expect(victimLP).to.be.gt(0);

    // Roughly 99 (integer division truncation)
    expect(victimLP).to.be.closeTo(ethers.BigNumber.from("99"), 5);

    // Attacker still has 0 LP.
    expect(await exchange.balanceOf(user1.address)).to.equal(0);
  });
});
