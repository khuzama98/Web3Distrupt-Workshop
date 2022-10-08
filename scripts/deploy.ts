import { ethers } from "hardhat";

let NFT_ADDRESS = "";
let ERC20_ADDRESS = "";

async function deployNFT() {
  const NFT_NAME = "Coffee_NFT";
  const NFT_SYMBOL = "CMNFT"
  const NFT = await ethers.getContractFactory("CoffeeMock");
  const deployInstance = await NFT.deploy(NFT_NAME,NFT_SYMBOL);
  await deployInstance.deployed();

  NFT_ADDRESS = deployInstance.address;
  console.log("Coffee NFT deployed at:", deployInstance.address);
}

async function deployERC20() {
  const ERC20_NAME = "Coffee_ERC20";
  const ERC20_SYMBOL = "CMERC20"
  const ERC20 = await ethers.getContractFactory("MyToken");
  const deployInstance = await ERC20.deploy(ERC20_NAME,ERC20_SYMBOL);
  await deployInstance.deployed();

  ERC20_ADDRESS = deployInstance.address;
  console.log("Coffee ERC20 deployed at:", deployInstance.address);
}

async function deployCoffee() {
  const COFFEE_PRICE = 5;


  const Coffee = await ethers.getContractFactory("Coffee");
  const deployInstance = await Coffee.deploy(COFFEE_PRICE,ERC20_ADDRESS,NFT_ADDRESS);
  await deployInstance.deployed();

  console.log("Coffee deployed at:", deployInstance.address);
}

async function main() {
  await deployNFT();
  await deployERC20();
  await deployCoffee();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
