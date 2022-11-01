import { ethers, run } from "hardhat";

async function verifyNFT() {
  try {
    await run("verify:verify", {
      address: "0x7F32e033530E289a26e8eE4CCA815631027e4109",
      constructorArguments: ["Coffee_NFT", "CNFT"],
      contract: "contracts/Coffee_NFT.sol:CoffeeMock",
    });
  } catch (error: any) {
    if (error.message.toLowerCase().includes("already verified")) {
      console.log("Already verified!");
    } else {
      console.log(error);
    }
  }
}

async function verifyERC20() {
  try {
    await run("verify:verify", {
      address: "0xF3CcB93f3a1Ee251a11806BDADC1E5848918cEA6",
      constructorArguments: ["Coffee_ERC20", "CERC20"],
      contract: "contracts/Coffee_ERC20.sol:MyToken",
    });
  } catch (error: any) {
    if (error.message.toLowerCase().includes("already verified")) {
      console.log("Already verified!");
    } else {
      console.log(error);
    }
  }
}

async function verifyCoffee() {
  try {
    await run("verify:verify", {
      address: "0xc49a84ceD3075b291A38f8f5cDA596524B6B6421",
      constructorArguments: [
        ethers.utils.parseEther("1"), // price
        "0xF3CcB93f3a1Ee251a11806BDADC1E5848918cEA6", // erc20
        "0x7F32e033530E289a26e8eE4CCA815631027e4109", // erc721
      ],
      contract: "contracts/Coffee.sol:Coffee",
    });
  } catch (error: any) {
    if (error.message.toLowerCase().includes("already verified")) {
      console.log("Already verified!");
    } else {
      console.log(error);
    }
  }
}

async function main() {
  console.log("Verifying NFT");
  await verifyNFT();

  console.log("Verifying NFT");
  await verifyERC20();

  console.log("Verifying NFT");
  await verifyCoffee();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
