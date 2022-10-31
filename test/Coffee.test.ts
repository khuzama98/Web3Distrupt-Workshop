import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

import type { MyToken, CoffeeMock, Coffee } from "../typechain-types";

describe("Coffee", function () {
  const ERC20_NAME = "Coffee_ERC20";
  const ERC20_SYMBOL = "CERC20";

  const NFT_NAME = "Coffee_NFT";
  const NFT_SYMBOL = "CNFT";

  const COFFEE_PRICE = ethers.utils.parseEther("1");

  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployCoffeeFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    // Deploy ERC20
    const ERC20 = await ethers.getContractFactory("MyToken");
    const erc20 = (await ERC20.deploy(ERC20_NAME, ERC20_SYMBOL)) as MyToken;
    await erc20.deployed();

    // Deploy ERC721
    const NFT = await ethers.getContractFactory("CoffeeMock");
    const erc721 = (await NFT.deploy(NFT_NAME, NFT_SYMBOL)) as CoffeeMock;
    await erc721.deployed();

    // Deploy Coffee
    const Coffee = await ethers.getContractFactory("Coffee");
    const coffee = (await Coffee.deploy(
      COFFEE_PRICE,
      erc20.address,
      erc721.address
    )) as Coffee;
    await coffee.deployed();

    return { owner, otherAccount, erc20, erc721, coffee };
  }

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const { owner, erc20, erc721, coffee } = await loadFixture(
        deployCoffeeFixture
      );

      expect(await coffee.owner()).to.equal(owner.address);
    });

    it("Should set the right token", async function () {
      const { owner, erc20, erc721, coffee } = await loadFixture(
        deployCoffeeFixture
      );

      expect(await coffee.owner()).to.equal(owner.address);
    });

    it("Should set the right nft", async function () {
      const { owner, erc20, erc721, coffee } = await loadFixture(
        deployCoffeeFixture
      );

      expect(await coffee.nft()).to.equal(erc721.address);
    });

    it("Should set the right price", async function () {
      const { owner, erc20, erc721, coffee } = await loadFixture(
        deployCoffeeFixture
      );

      expect(await coffee.priceOfCoffee()).to.equal(COFFEE_PRICE);
    });
  });

  describe("Donate", function () {
    it("Should mint nft on donation of tokens", async function () {
      const { owner, otherAccount, erc20, erc721, coffee } = await loadFixture(
        deployCoffeeFixture
      );

      // mint erc20 tokens to otherAccount
      await erc20.mint(otherAccount.address, ethers.utils.parseEther("5"));
      expect(await erc20.balanceOf(otherAccount.address)).to.equal(
        ethers.utils.parseEther("5")
      );

      // give approval to coffee contract
      await erc20
        .connect(otherAccount)
        .approve(coffee.address, ethers.utils.parseEther("2"));

      // donate tokens worth 2 coffees
      await coffee.connect(otherAccount).donate(2);

      expect(await erc721.balanceOf(otherAccount.address)).to.equal(2);
    });
  });

  describe("Withdraw", function () {
    it("Should withdraw all tokens to owner", async function () {
      const { owner, otherAccount, erc20, erc721, coffee } = await loadFixture(
        deployCoffeeFixture
      );

      // mint erc20 tokens to otherAccount
      await erc20.mint(otherAccount.address, ethers.utils.parseEther("5"));
      expect(await erc20.balanceOf(otherAccount.address)).to.equal(
        ethers.utils.parseEther("5")
      );

      // give approval to coffee contract
      await erc20
        .connect(otherAccount)
        .approve(coffee.address, ethers.utils.parseEther("2"));

      // donate tokens worth 2 coffees
      await coffee.connect(otherAccount).donate(2);

      expect(await erc721.balanceOf(otherAccount.address)).to.equal(2);

      // owner calls withdraws
      await coffee.connect(owner).withdraw();
      expect(await erc20.balanceOf(owner.address)).to.equal(
        // add prev 10000 tokens too
        ethers.utils.parseEther("2").add(ethers.utils.parseEther("10000"))
      );
    });
  });
});
