import React, { useContext } from "react";
import { softTextColor, primaryColor, cardGradient, cardGradient2, mediumButtonMinWidth } from "../../styles";
import { useContractReader } from "eth-hooks";
import { Button, Card, Descriptions } from "antd";
import CustomAddress from "../CustomKit/CustomAddress";
import { ArrowsAltOutlined, UserOutlined } from "@ant-design/icons";
import { useContractLoader } from "eth-hooks";
import { getContractConfigWithInjected } from "../../helpers/getContractConfigWithInjected";
import { AppContext, LayoutContext } from "../../App";

const ContractItem = ({ openContract, contract }) => {
  const { localChainId, localProvider, userAddress, injectableAbis } = useContext(AppContext);
  const abi = injectableAbis.YourContract;
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

  const { widthAboveContractItemFit } = useContext(LayoutContext);

  const cellHeight = "2.5rem";
  const descriptionSpan = widthAboveContractItemFit ? 0 : 3;

  return (
    <Card
      size="small"
      style={{ background: cardGradient2 }}
      className="hoverableLight"
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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              justifyContent: "space-between",
              flexWrap: "wrap",
              flex: "66%",
            }}
          >
            <div
              style={{
                fontSize: "1.125rem",
                fontWeight: 400,

                // color: softTextColor,
              }}
            >
              {contract.name}
            </div>
            <CustomAddress fontSize={18} value={contract.address} />
          </div>
          <Button
            size="large"
            style={{
              fontSize: "1rem",

              width: mediumButtonMinWidth,
            }}
            onClick={() => openContract(contract)}
          >
            Open <ArrowsAltOutlined />
          </Button>
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
            }}
            span={descriptionSpan}
          >
            <div className="mono-nice">{contract.time.toLocaleString()}</div>
          </Descriptions.Item>
          <Descriptions.Item
            label="By"
            labelStyle={{ color: softTextColor }}
            contentStyle={{
              padding: "0 1rem",
              height: cellHeight,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
            span={descriptionSpan}
          >
            <CustomAddress fontSize={14} value={contract.creator} />
          </Descriptions.Item>
          {/* <Descriptions.Item
            label="Owner"
            labelStyle={{ color: softTextColor }}
            contentStyle={{
              padding: "0 1rem",
              height: cellHeight,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              position: "relative",
            }}
            span={descriptionSpan}
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
