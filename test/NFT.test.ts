import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

import type { NFT } from "../typechain-types";

describe("NFT", function () {
  const ERC721_NAME = "NFT";
  const ERC721_SYMBOL = "NFT";

  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployNFTFixture() {
    // Contracts are deployed using the first signer/account by default
    const [deployer, otherAccount] = await ethers.getSigners();

    // Deploy ERC20
    const ERC20 = await ethers.getContractFactory("NFT");
    const erc20 = (await ERC20.deploy(ERC721_NAME, ERC721_SYMBOL)) as NFT;
    await erc20.deployed();

    return { deployer, otherAccount, erc20 };
  }

  describe("Deployment", function () {
    it("Should set the right name", async function () {
      const { deployer, erc20 } = await loadFixture(deployNFTFixture);

      expect(await erc20.name()).to.equal(ERC721_NAME);
    });

    it("Should set the right symbol", async function () {
      const { deployer, erc20 } = await loadFixture(deployNFTFixture);

      expect(await erc20.symbol()).to.equal(ERC721_SYMBOL);
    });
  });

  describe("Mint", function () {
    it("Should mint 1 nft to otherAccount", async function () {
      const { deployer, otherAccount, erc20 } = await loadFixture(
        deployNFTFixture
      );

      // mint
      await erc20.mint(otherAccount.address);
      expect(await erc20.balanceOf(otherAccount.address)).to.equal(1);
    });
  });
});
