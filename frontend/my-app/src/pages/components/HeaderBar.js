import React from "react";
import {
  Layout,
  Button,
  Row,
  Col,
} from "antd";

// import { useNavigate } from "react-router-dom";
import { LogoutOutlined } from "@ant-design/icons";
const { Header} = Layout;



export const HeaderBar = () => {
// const navigate = useNavigate();
const handleLogout = (e) => {
  localStorage.removeItem("authorized_keys");
  window.location.reload();
};
  return (
    <div>
      <Header className="black">
        <Row>
          <Col
           sm={{}} md={{}} lg={{span:2,push:1}} xl={{span:3}} xxl={{}}
            style={{
              verticalAlign: "middle",
              color: "white",
            }}
          >    
            高階智能座位管理系統
          </Col>
          <Col
           sm={{}} md={{}} lg={{span:2,offset:18}} xl={{span:3}} xxl={{}}
          
            style={{
              verticalAlign: "middle",
              color: "white",
            }}
          >
            <Button
              style={{ background: "#363F4E", color: "white" }}
              icon={<LogoutOutlined />}
              onClick={(e) => {
                handleLogout(e);
              }}
            >
              LOGOUT
            </Button>
          </Col>
        </Row>
      </Header>
    </div>
  );
};
export default HeaderBar;
