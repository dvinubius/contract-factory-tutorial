import React from "react";
import { LeftOutlined } from "@ant-design/icons";
import { Button, Divider } from "antd";
import { useState } from "react";
import CreateYourContract from "../components/Factory/CreateYourContract";
import YourContract from "../components/YourContract/YourContract";
import { mainColWidth, mediumButtonMinWidth } from "../styles";
import StackGrid from "react-stack-grid";
import ContractItem from "../components/Factory/ContractItem";

const CreatedContractsUI = ({
  factoryAddress,
  injectableAbis,
  createdContracts,
  localProvider,
  mainnetProvider,
  contractConfig,
  gasPrice,
  userSigner,
  localChainId,
  price,
  DEBUG,
}) => {
  const [openedContract, setOpenedContract] = useState();
  const handleOpenContract = c => setOpenedContract(c);
  const handleBack = () => setOpenedContract(null);

  return (
    <div
      style={{
        width: mainColWidth,
        display: "flex",
        flexDirection: "column",
        minHeight: "50vh",
        margin: "auto",
        paddingTop: "2rem",
      }}
    >
      {/* NAVI */}
      <div style={{ display: "flex", alignItems: "center" }}>
        {!openedContract && (
          <div style={{ marginLeft: "auto" }}>
            <CreateYourContract
              contractConfig={contractConfig}
              gasPrice={gasPrice}
              userSigner={userSigner}
              localChainId={localChainId}
              localProvider={localProvider}
              price={price}
            />
          </div>
        )}
        {openedContract && (
          <div style={{ marginRight: "auto" }}>
            <Button onClick={handleBack} style={{ minWidth: mediumButtonMinWidth }}>
              <LeftOutlined /> Back
            </Button>
          </div>
        )}
      </div>
      {!openedContract && <Divider style={{ margin: "2rem 0" }}>Your Contracts</Divider>}
      {openedContract && <Divider style={{ margin: "44px 0" }} />}
      {/* CONTENT */}
      {!openedContract && createdContracts && createdContracts.length > 0 && injectableAbis && (
        <div style={{ alignSelf: "stretch" }}>
          <div style={{ width: "28rem", margin: "auto" }}>
            <StackGrid columnWidth="100%" gutterHeight={16}>
              {createdContracts.map(c => (
                <div key={c.address}>
                  <ContractItem
                    openContract={handleOpenContract}
                    contract={c}
                    abi={injectableAbis.YourContract}
                    localChainId={localChainId}
                    localProvider={localProvider}
                    userAddress={userSigner.address}
                  />
                </div>
              ))}
            </StackGrid>
          </div>
        </div>
      )}
      {openedContract && injectableAbis && (
        <div style={{ alignSelf: "stretch" }}>
          <YourContract
            contract={openedContract}
            injectableAbis={injectableAbis}
            localProvider={localProvider}
            mainnetProvider={mainnetProvider}
            userSigner={userSigner}
            address={factoryAddress}
            DEBUG={DEBUG}
            localChainId={localChainId}
            gasPrice={gasPrice}
            price={price}
          />
        </div>
      )}
    </div>
  );
};

export default CreatedContractsUI;
