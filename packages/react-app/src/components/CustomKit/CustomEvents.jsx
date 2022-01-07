import { List, Input, Descriptions } from "antd";
import { useEventListener } from "eth-hooks/events/useEventListener";
const { TextArea } = Input;

/*
  Based on <Events/> from the standard Scaffold-Eth kit

  Width inherited
*/

export default function CustomEvents({
  contracts,
  contractName,
  eventName,
  localProvider,
  mainnetProvider,
  startBlock,
  width,
}) {
  // 📟 Listen for broadcast events
  const events = useEventListener(contracts, contractName, eventName, localProvider, startBlock);

  return (
    <div style={{ width: "100%", margin: "auto", marginTop: 32, paddingBottom: 32 }}>
      <h2>Events:</h2>
      <List
        style={{ backgroundColor: "white" }}
        bordered
        dataSource={events}
        renderItem={item => {
          const { blockNumber, event, eventSignature, args } = item;
          return (
            <List.Item key={item.blockNumber + "_" + item.args.sender + "_" + item.args.purpose}>
              <Descriptions bordered number={1} size="small" title={`${event}`}>
                <Descriptions.Item label="block" span={2} style={{ fontSize: "0.85rem" }}>
                  {blockNumber}
                </Descriptions.Item>
                <Descriptions.Item label="signature" span={3} style={{ fontSize: "0.85rem" }}>
                  {eventSignature}
                </Descriptions.Item>
                <Descriptions.Item label="args" span={3}>
                  <List>
                    {args.map(a => (
                      <List.Item style={{ fontSize: "0.85rem", padding: "0.25rem 2rem" }}>{a.toString()}</List.Item>
                    ))}
                  </List>
                </Descriptions.Item>
              </Descriptions>
            </List.Item>
          );
        }}
      />
    </div>
  );
}
