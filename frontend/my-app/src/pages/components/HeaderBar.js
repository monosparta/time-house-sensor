/*
 * @Author: 20181101remon mindy80230@gmail.com
 * @Date: 2022-05-20 13:13:32
 * @LastEditors: 20181101remon mindy80230@gmail.com
 * @LastEditTime: 2022-05-20 16:50:57
 * @FilePath: \time-house-sensor\frontend\my-app\src\pages\components\HeaderBar.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
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
            style={{
              verticalAlign: "middle",
              color: "white",
            }}
          >    
            高階智能座位管理系統
          </Col>
          <Col
            span={2}
            push={18}
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
