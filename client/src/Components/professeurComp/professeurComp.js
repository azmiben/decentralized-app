import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Menu, Layout, Typography } from "antd";
import { NavLink, Outlet } from "react-router-dom";
import LogoutButton from "../LogoutButton/LogoutButton";


const { Sider, Header } = Layout;
const { Title } = Typography;

class ProfesseurComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: "",
    };
    this.contract = this.props.contract;
    this.accounts = this.props.accounts;
  }

  componentDidMount = async () => {
    try {
      const result = await this.contract.methods
        .professeurName()
        .call({ from: this.accounts[0] });
      this.setState({ result });
    } catch (error) {
      console.error("Error fetching professeurName:", error);
    }
  };

  render() {
    return (
      <>
        <Header
          style={{
            zIndex: 1,
            width: "100%",
            backgroundColor: "#001220",
            position: "fixed",
          }}
        >
          <img
            style={{ float: "left", width: "60px", height: "60px", borderRadius: 50 }}
            alt=""
            src="/favicon.png"
            width="35"
            height="35"
            className="d-inline-block align-top"
          />
          <Title
            level={3}
            style={{
              position: "relative",
              color: "white",
              float: "left",
              top: "15px",
              marginLeft: "7px",
            }}
          >
            ISIMG
          </Title>
          <LogoutButton />
        </Header>
        <Sider
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
            top: "64px",
            bottom: 0,
            backgroundColor: "#001220",
          }}
          width={"270px"}
        >
          <br />
          <br />
          <h4 style={{ color: "white" }}>{this.state.result}</h4>
          <br />
          <Menu theme="dark" mode="inline" style={{ backgroundColor: "#001220" }}>
            <Menu.Divider />
            <Menu.Item key="1">
              <NavLink to="dashboard">
                <h4 style={{ color: "#ffffff" }}>Home</h4>
              </NavLink>
            </Menu.Item>
            <br />
            <Menu.Item key="2">
              <NavLink to="AjouterNote">
                <h4 style={{ color: "#ffffff" }}>ajouter une note </h4>
              </NavLink>
            </Menu.Item>
           
          </Menu>
        </Sider>
        <Outlet />
      </>
    );
  }
}

export default ProfesseurComp;
