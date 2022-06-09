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
        <Row  justify="space-between">
          <Col
          //  sm={{span:4,push:1}} md={{span:5,push:2}} lg={{span:5,push:1}} xl={{span:5,push:1}} xxl={{span:6,push:1}}
             sm={{span:10}} md={{span:10}} lg={{span:6}} xl={{span:6}} xxl={{span:6}} 
          style={{
              verticalAlign: "middle",
              color: "white",
            }}
          >    
            高階智能座位管理系統
          </Col>
          <Col
          //  sm={{span:2,offset:15}} md={{span:2,offset:16}} lg={{span:2,offset:15}} xl={{span:2,offset:15}} xxl={{span:2,offset:15}}
          sm={{span:4}} md={{span:4}} lg={{span:2,}} xl={{span:2,}} xxl={{span:2,}}
            style={{
              verticalAlign: "middle",
              color: "white",
            }}
          >
            <Button
               className="logut"
              icon={<LogoutOutlined />}
              onClick={(e) => {
                handleLogout(e);
              }}
            >
              <span  style={{ fontSize:"14px"}}>LOGOUT</span>
            </Button>
          </Col>
        </Row>
      </Header>
    </div>
  );
};
export default HeaderBar;
