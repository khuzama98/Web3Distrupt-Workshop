//TODO: Write tests for the coffee contract
import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

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
    const erc20 = await ERC20.deploy(ERC20_NAME, ERC20_SYMBOL);
    await erc20.deployed();

    // Deploy ERC721
    const NFT = await ethers.getContractFactory("CoffeeMock");
    const erc721 = await NFT.deploy(NFT_NAME, NFT_SYMBOL);
    await erc721.deployed();

    // Deploy Coffee
    const Coffee = await ethers.getContractFactory("Coffee");
    const coffee = await Coffee.deploy(
      COFFEE_PRICE,
      erc20.address,
      erc721.address
    );
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

      expect(await coffee.price()).to.equal(COFFEE_PRICE);
    });
  });

  // describe("Withdrawals", function () {
  //   describe("Validations", function () {
  //     it("Should revert with the right error if called too soon", async function () {
  //       const { lock } = await loadFixture(deployOneYearLockFixture);

  //       await expect(lock.withdraw()).to.be.revertedWith(
  //         "You can't withdraw yet"
  //       );
  //     });

  //     it("Should revert with the right error if called from another account", async function () {
  //       const { lock, unlockTime, otherAccount } = await loadFixture(
  //         deployOneYearLockFixture
  //       );

  //       // We can increase the time in Hardhat Network
  //       await time.increaseTo(unlockTime);

  //       // We use lock.connect() to send a transaction from another account
  //       await expect(lock.connect(otherAccount).withdraw()).to.be.revertedWith(
  //         "You aren't the owner"
  //       );
  //     });

  //     it("Shouldn't fail if the unlockTime has arrived and the owner calls it", async function () {
  //       const { lock, unlockTime } = await loadFixture(
  //         deployOneYearLockFixture
  //       );

  //       // Transactions are sent using the first signer by default
  //       await time.increaseTo(unlockTime);

  //       await expect(lock.withdraw()).not.to.be.reverted;
  //     });
  //   });

  //   describe("Events", function () {
  //     it("Should emit an event on withdrawals", async function () {
  //       const { lock, unlockTime, lockedAmount } = await loadFixture(
  //         deployOneYearLockFixture
  //       );

  //       await time.increaseTo(unlockTime);

  //       await expect(lock.withdraw())
  //         .to.emit(lock, "Withdrawal")
  //         .withArgs(lockedAmount, anyValue); // We accept any value as `when` arg
  //     });
  //   });

  //   describe("Transfers", function () {
  //     it("Should transfer the funds to the owner", async function () {
  //       const { lock, unlockTime, lockedAmount, owner } = await loadFixture(
  //         deployOneYearLockFixture
  //       );

  //       await time.increaseTo(unlockTime);

  //       await expect(lock.withdraw()).to.changeEtherBalances(
  //         [owner, lock],
  //         [lockedAmount, -lockedAmount]
  //       );
  //     });
  //   });
  // });
});
