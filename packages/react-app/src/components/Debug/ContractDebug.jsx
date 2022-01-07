import { Contract } from "..";
import ContractDebugHeader from "./ContractDebugHeader";

const ContractDebug = ({ contractName, contract, blockExplorer, contractConfig, userSigner, localProvider }) => {
  return (
    <div>
      <ContractDebugHeader contract={contract} />
      <Contract
        name={contractName}
        key={contract.address}
        signer={userSigner}
        provider={localProvider}
        address={contract.address}
        blockExplorer={blockExplorer}
        contractConfig={contractConfig}
        noPadding
      />
    </div>
  );
};

export default ContractDebug;
