const hre = require("hardhat");

async function main() {
  const Contract = await hre.ethers.getContractFactory("CeroToken");
  const token = await Contract.deploy();

  await token.deployed();

  console.log(`Cero Token Address - ${token.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
