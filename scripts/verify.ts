import { run } from "hardhat";

async function verifyERC721() {
  try {
    await run("verify:verify", {
      address: "",
      constructorArguments: ["NFT", "NFT"],
      contract: "contracts/NFT.sol:NFT",
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
  await verifyERC721();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
