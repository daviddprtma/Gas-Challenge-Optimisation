const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("Deploy Gas Challenge Contract", () => {
  let gas_contract;

  beforeEach(async () => {
    const gas_challenge_contract = await ethers.getContractFactory(
      "gasChallenge"
    );
    gas_contract = await gas_challenge_contract.deploy();
  });

  describe("Compute Gas", () => {
    it("Should return lower gas", async () => {
      await gas_contract.notOptimizedFunction();
      await gas_contract.optimizedFunction();
    });
  });

  describe("Check Sum Of Array", () => {
    it("Should return 0", async () => {
      // Write test block here to check sum of array equals 0
      const sum_array_before = await gas_contract.getSumOfArray();
      console.log("Sum of array before optimization: ", sum_array_before.toNumber());

      await gas_contract.optimizedFunction();

      const sum_array_after = await gas_contract.getSumOfArray();
      console.log("Sum of array after optimization: ", sum_array_after.toNumber());

      expect(sum_array_after).to.equal(0);
    });
  });
});
