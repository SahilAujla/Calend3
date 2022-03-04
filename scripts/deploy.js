// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const Contract = await hre.ethers.getContractFactory("Calend3");
  const contract = await Contract.deploy();

  await contract.deployed();

  console.log("Calend3 deployed to:", contract.address);

  saveFrontendFiles();
}

function saveFrontendFiles() {
  const fs = require("fs");

  const abiDir = __dirname + "/../frontend/abis";

  if (!fs.existsSync(abiDir)) {
    fs.mkdirSync(abiDir);
  }

  const artifact = artifacts.readArtifactSync("Calend3");

  fs.writeFileSync(abiDir + "/Calend3.json", JSON.stringify(artifact, null, 2));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
