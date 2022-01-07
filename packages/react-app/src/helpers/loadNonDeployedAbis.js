const nonDeployedContracts = import("../contracts/hardhat_non_deployed_contracts.json");

export const loadNonDeployedContractAbi = async contractName => {
  const all = await nonDeployedContracts;
  return !!all ? all[contractName] : null;
};
