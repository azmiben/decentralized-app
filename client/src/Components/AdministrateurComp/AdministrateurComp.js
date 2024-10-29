import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import { NavLink, Outlet } from "react-router-dom";
import { Layout, Menu, Typography } from "antd";

import LogoutButton from "../LogoutButton/LogoutButton";

const { Sider, Header } = Layout;
const { Title } = Typography;

class AdministrateurComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: "",
    };
  }

  contract = this.props.contract;
  accounts = this.props.accounts;

  componentDidMount = async () => {
    const result = await this.contract.methods
      .AdministrateurName()
      .call({ from: this.accounts[0] });
    this.setState({ result });
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
            style={{ float: "left", width: "60px", height: "60px" ,borderRadius:50}}
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
          <LogoutButton></LogoutButton>
        </Header>
        <Sider
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
            top: "64px",
            bottom: 0,
            backgroundColor:"#001220"
          }}
          width={"255px"}
        >
          <br />
          
          <br />
          <br />
          <h4 style={{ color: "white" }}>{this.state.result}</h4>
          <br />
          <Menu style={{backgroundColor:"#001220"}} theme="dark" mode="inline">
            <Menu.Divider></Menu.Divider>
            <Menu.Item style={{backgroundColor:"#001220"}} key="1" >
              <NavLink style={{backgroundColor:"#001220"}} to="dashboard" />
             <h4 style={{color:"#ffffff"} }>Home</h4>
            </Menu.Item>
            <br />
            <Menu.Item style={{backgroundColor:"#001220"}} key="2" >
              <NavLink style={{backgroundColor:"#001220"}} to="editprofesseur" />
              <h4 style={{color:"#ffffff"} }>professeur</h4>
              
            </Menu.Item>
            <br />
            <Menu.Item style={{backgroundColor:"#001220"}} key="3" >
              <NavLink style={{backgroundColor:"#001220"}} to="editetudiant" />
              <h4 style={{color:"#ffffff"} }>etudiant</h4>
            </Menu.Item>
          </Menu>
        </Sider>
        <Outlet />
      </>
    );
  }
}
export default AdministrateurComp;