const { expect } = require("chai");

describe("Exchange", function () {
  it("Should deploy", async function () {
    const Exchange = await ethers.getContractFactory("Exchange");
    // const exchange = await Exchange.deploy("0x...");
  });
});
