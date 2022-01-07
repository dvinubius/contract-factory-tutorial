import React from "react";
import { softTextColor, primaryColor } from "../../styles";
import { useContractReader } from "eth-hooks";
import { Card, Descriptions } from "antd";
import CustomAddress from "../CustomKit/CustomAddress";
import { UserOutlined } from "@ant-design/icons";
import { useContractLoader } from "../../hooks/custom/useContractLoader";
import { getContractConfigWithInjected } from "../../helpers/getContractConfigWithInjected";

const ContractItem = ({ openContract, contract, abi, localChainId, localProvider, userAddress }) => {
  /**
   * contractConfig not from props,
   * we create a copy in which we inject this particular contract
   **/
  // const contractConfig = getContractConfigWithInjected("YourContract", abi, contract.address, localChainId);
  // const readContracts = useContractLoader(localProvider, contractConfig);
  // const owner = useContractReader(readContracts, "YourContract", "owner");
  // console.log("owner:", owner);

  // const ownerMark =
  //   owner === userAddress ? (
  //     <div
  //       style={{
  //         position: "absolute",
  //         right: "1rem",
  //         top: "50%",
  //         transform: "translateY(calc(-50% - 2px))",
  //       }}
  //     >
  //       <UserOutlined
  //         style={{
  //           color: primaryColor,
  //           background: "hsla(209deg, 100%, 92%, 1)",
  //           borderRadius: "50%",
  //           width: "1.25rem",
  //           height: "1.25rem",
  //           display: "flex",
  //           alignItems: "center",
  //           justifyContent: "center",
  //           border: `1px solid ${primaryColor}`,
  //         }}
  //       />
  //     </div>
  //   ) : (
  //     ""
  //   );

  const cellHeight = "2.5rem";
  return (
    <Card
      size="small"
      className="hoverableLight"
      onClick={() => openContract(contract)}
      title={
        <div
          style={{
            padding: "0 0.5rem",
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            justifyContent: "space-between",
            fontWeight: 400,
          }}
        >
          <div style={{ fontSize: "1rem", fontWeight: 500 }}>{contract.name}</div>
          <CustomAddress noBlockie={true} fontSize="1rem" value={contract.address} />
        </div>
      }
    >
      <div style={{ padding: "0.5rem" }}>
        <Descriptions bordered size="small" labelStyle={{ textAlign: "center", height: cellHeight }}>
          <Descriptions.Item
            label="Created"
            labelStyle={{ color: softTextColor }}
            contentStyle={{
              padding: "0 1rem",
              width: "10rem",
            }}
            span={3}
          >
            <div>{contract.time.toLocaleString()}</div>
          </Descriptions.Item>
          <Descriptions.Item
            label="Creator"
            labelStyle={{ color: softTextColor }}
            contentStyle={{
              padding: "0 1rem",
              height: cellHeight,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
            span={3}
          >
            <CustomAddress fontSize={14} value={contract.creator} />
          </Descriptions.Item>
          {/* <Descriptions.Item
            label="Owner"
            labelStyle={{ color: softTextColor, width: "8rem" }}
            contentStyle={{
              padding: "0 1rem",
              height: cellHeight,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              position: "relative",
            }}
            span={3}
          >
            <CustomAddress fontSize={14} value={owner} />
            {
              // ownerMark
            }
          </Descriptions.Item> */}
        </Descriptions>
      </div>
    </Card>
  );
};

export default ContractItem;
