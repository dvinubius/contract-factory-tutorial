const fs = require("fs");
const chalk = require("chalk");

const contractsDir = "./artifacts/contracts";

function exportContracts(contractNames, destination) {
  try {
    const dirPath = destination.split("/").slice(0, -1).join("/");
    const destinationFile = destination.split("/").slice(-1);

    const exported = {};
    contractNames.forEach((contractName) => {
      const file = fs.readFileSync(
        `${contractsDir}/${contractName}.sol/${contractName}.json`
      );
      exported[contractName] = JSON.parse(file).abi;
    });

    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true }, () => {});
    }
    const filePath = `${dirPath}/${destinationFile}`;
    fs.writeFileSync(
      filePath,
      JSON.stringify(exported, null, 2),
      { flag: "w" },
      () => {}
    );

    return true;
  } catch (e) {
    console.log(
      "Failed to export non-deployed contracts " +
        chalk.red(contractNames) +
        "to frontend."
    );
    console.log(e);
    return false;
  }
}

async function main() {
  const destination = process.argv[2];
  // add any of your factory-created contracts here
  const contracts = ["YourContract"];
  const success = exportContracts(contracts, destination);
  if (success) {
    console.log(
      `✅  Exported abi(s) for non-deployed contract(s) ${contracts} to the frontend.`
    );
  }
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
