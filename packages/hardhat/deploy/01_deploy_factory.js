const { ethers } = require("hardhat");

module.exports = async ({ getNamedAccounts, deployments, getChainId }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = await getChainId();

  // We only deploy the Factory

  await deploy("YourContractFactory", {
    // Learn more about args here: https://www.npmjs.com/package/hardhat-deploy#deploymentsdeploy
    from: deployer,
    // args: [],
    log: true,
  });

  // If you want to link a library into your contract:
  // reference: https://github.com/austintgriffith/scaffold-eth/blob/using-libraries-example/packages/hardhat/scripts/deploy.js#L19
  // const yourContractFactory = await deploy("YourContractFactory", [], {}, {
  //  LibraryName: **LibraryAddress**
  // });

  // todo: uncomment to verify your contract
  // if (chainId !== "31337") {
  //   try {
  //     console.log(" 🎫 Verifing Contract on Etherscan... ");
  //     await sleep(10000); // wait 10 seconds for deployment to propagate bytecode
  //      await run("verify:verify", {
  //        address: YourContractFactory.address,
  //        contract: "contracts/YourContractFactory.sol:YourContractFactory",
  //        contractArguments: [],
  //      });
  //   } catch (e) {
  //     console.log(" ⚠️ Failed to verify contract on Etherscan ");
  //   }
  // }
};

module.exports.tags = ["YourContractFactory"];
