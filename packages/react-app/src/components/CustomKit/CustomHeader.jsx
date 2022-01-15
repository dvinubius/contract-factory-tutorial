import { BlockOutlined } from "@ant-design/icons";
import { PageHeader } from "antd";
import React from "react";

// displays a page header

export default function CustomHeader() {
  return (
    <PageHeader
      title={<div style={{ fontSize: "2rem", transform: "translateY(0.125rem)" }}>🏗</div>}
      subTitle={<div style={{ fontSize: "1.25rem" }}>Scaffold-Eth Factory</div>}
      style={{ cursor: "pointer", display: "flex", alignItems: "center", height: "54px", padding: "1rem" }}
    />
  );
}
