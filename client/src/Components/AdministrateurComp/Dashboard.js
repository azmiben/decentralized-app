import React from "react";
import { Card } from "antd";
import "rsuite/styles/index.less";
import logo from './logo.png';
function Dashboard() {
  return (
    <Card
      style={{
        position: "relative",
        width: "80%",
        left: "295px",
        top: "70px",
        borderRadius: "7px",
        opacity:0.7,
      }}
    >
      <h1>Bienvenue Dans ISIMG</h1>
      <br/>
      <br/>
      <br/>

      <img
            style={{ float: "center", width: "900px", height: "600px" }}
            alt=""
            src={logo }
            width="450"
            height="450"
            className="d-inline-block align-top"
      />
    </Card>
  );
}

export default Dashboard;
