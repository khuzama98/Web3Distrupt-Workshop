import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

import type { MyToken } from "../typechain-types";

describe("MyToken", function () {
  const ERC20_NAME = "MyToken";
  const ERC20_SYMBOL = "MTKN";

  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployMyTokenFixture() {
    // Contracts are deployed using the first signer/account by default
    const [deployer, otherAccount] = await ethers.getSigners();

    // Deploy ERC20
    const ERC20 = await ethers.getContractFactory("MyToken");
    const erc20 = (await ERC20.deploy(ERC20_NAME, ERC20_SYMBOL)) as MyToken;
    await erc20.deployed();

    return { deployer, otherAccount, erc20 };
  }

  describe("Deployment", function () {
    it("Should set the right name", async function () {
      const { deployer, erc20 } = await loadFixture(deployMyTokenFixture);

      expect(await erc20.name()).to.equal(ERC20_NAME);
    });

    it("Should set the right symbol", async function () {
      const { deployer, erc20 } = await loadFixture(deployMyTokenFixture);

      expect(await erc20.symbol()).to.equal(ERC20_SYMBOL);
    });
  });

  describe("Mint", function () {
    it("Should mint 10 tokens to otherAccount", async function () {
      const { deployer, otherAccount, erc20 } = await loadFixture(
        deployMyTokenFixture
      );

      // mint
      await erc20.mint(otherAccount.address, ethers.utils.parseEther("10"));
      expect(await erc20.balanceOf(otherAccount.address)).to.equal(
        ethers.utils.parseEther("10")
      );
    });
  });

  describe("Burn", function () {
    it("Should burn 5 tokens from otherAccount", async function () {
      const { deployer, otherAccount, erc20 } = await loadFixture(
        deployMyTokenFixture
      );

      // mint
      await erc20.mint(otherAccount.address, ethers.utils.parseEther("10"));
      expect(await erc20.balanceOf(otherAccount.address)).to.equal(
        ethers.utils.parseEther("10")
      );

      // burn
      await erc20.burn(otherAccount.address, ethers.utils.parseEther("5"));
      expect(await erc20.balanceOf(otherAccount.address)).to.equal(
        ethers.utils.parseEther("5")
      );
    });
  });
});
