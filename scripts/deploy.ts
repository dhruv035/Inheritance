import { ethers } from "hardhat";
import * as dotenv from "dotenv";

dotenv.config();

async function main() {
  // Define the heir address
  const heirAddress = process.env.HEIR_ADDRESS;
  
  if (!heirAddress) {
    throw new Error("HEIR_ADDRESS not set in environment variables");
  }

  // Deploy the contract with 1 ETH
  const inheritance = await ethers.deployContract("Will", [heirAddress], {
    value: ethers.parseEther("0.0001"),
  });

  await inheritance.waitForDeployment();

  console.log(
    `Inheritance with 1 ETH deployed to ${inheritance.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}); 