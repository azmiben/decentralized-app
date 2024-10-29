import { Button, message } from "antd";
import React from "react";
import "antd/dist/antd.css";
import { useNavigate } from "react-router-dom";
import {
  LogoutOutlined,
  UserAddOutlined,
  DashboardOutlined,
} from "@ant-design/icons";

function LogoutButton() {
  const navigate = useNavigate();
  const logout = async () => {
    setTimeout(() => {
      message.success("Déconnecté !");
      localStorage.clear();
    }, 1000);
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };
  return (
    <Button shape="circle" size="large" style={{ float: "right", marginTop: "18px" }} onClick={logout}>
      <LogoutOutlined size={100} />
    </Button>
  );
}

export default LogoutButton;
