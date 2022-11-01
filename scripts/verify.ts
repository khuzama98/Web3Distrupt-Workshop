import { ethers, run } from "hardhat";

async function verifyERC20() {
  try {
    await run("verify:verify", {
      address: "",
      constructorArguments: ["MyToken", "MTKN"],
      contract: "contracts/MyToken.sol:MyToken",
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
  await verifyERC20();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
