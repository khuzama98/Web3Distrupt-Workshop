import { ethers } from "hardhat";

async function deployERC20() {
  const ERC20_NAME = "MyToken";
  const ERC20_SYMBOL = "MTKN";
  const ERC20 = await ethers.getContractFactory("MyToken");
  const deployInstance = await ERC20.deploy(ERC20_NAME, ERC20_SYMBOL);
  await deployInstance.deployed();

  console.log("Coffee ERC20 deployed at:", deployInstance.address);
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

  console.log("Deploying ERC20");
  await deployERC20();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
