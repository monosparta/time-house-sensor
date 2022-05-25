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
           sm={{span:4,push:1}} md={{span:5,push:2}} lg={{span:5,push:1}} xl={{span:5,push:1}} xxl={{span:6,push:1}}
            style={{
              verticalAlign: "middle",
              color: "white",
            }}
          >    
            高階智能座位管理系統
          </Col>
          <Col
           sm={{span:2,offset:15}} md={{span:2,offset:16}} lg={{span:2,offset:15}} xl={{span:2,offset:15}} xxl={{span:2,offset:15}}
          
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
