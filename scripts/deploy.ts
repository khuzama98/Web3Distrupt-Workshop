import { ethers } from "hardhat";

async function deployNFT() {
  const NFT_NAME = "NFT";
  const NFT_SYMBOL = "NFT";
  const NFT = await ethers.getContractFactory("NFT");
  const deployInstance = await NFT.deploy(NFT_NAME, NFT_SYMBOL);
  await deployInstance.deployed();

  console.log("Coffee NFT deployed at:", deployInstance.address);
}

async function main() {
  const { chainId, name } = await ethers.provider.getNetwork();
  const [deployer] = await ethers.getSigners();
  const ethBalance = await ethers.provider.getBalance(deployer.address);

  console.log(`Network: ${name} & ChainId: ${chainId}`);
  console.log(
    `Deployer: ${deployer.address}, Balance: ${ethers.utils.formatEther(
      ethBalance
    )} ETH`
  );

  console.log("Deploying NFT");
  await deployNFT();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
