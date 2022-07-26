/*
 * @Author: 20181101remon mindy80230@gmail.com
 * @Date: 2022-05-20 14:46:28
 * @LastEditors: 20181101remon mindy80230@gmail.com
 * @LastEditTime: 2022-07-25 13:33:57
 * @FilePath: \time-house-sensor\frontend\my-app\src\pages\components\HeaderBar.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from "react";
import { Layout, Row, Col, Menu, Dropdown, Button } from "antd";

import { useNavigate } from "react-router-dom";
import { GlobalOutlined  } from "@ant-design/icons";
const { Header } = Layout;

export const HeaderBar = () => {
  const navigate = useNavigate();
  const path = window.location.pathname === "/adminList" ? 1 : 0;
  const User = (e) => {
    console.log("click ", e);
    if (e === "logout") {
      localStorage.removeItem("authorized_keys");
      window.location.reload();
    } else if (e === "adminList") {
      navigate("/" + e, { replace: true });
    } else {
      navigate("/", { replace: true });
    }
  };
  // const menu = (
  //   <Menu mode="horizontal" defaultSelectedKeys={[""]} onClick={User}>
  //     {path ? (
  //       <Menu.Item key="/">管理頁面</Menu.Item>
  //     ) : (
  //       <Menu.Item key="adminList">管理者列表</Menu.Item>
  //     )}

  //     <Menu.Item key="logout">登出帳號</Menu.Item>
  //   </Menu>
  // );

  return (
    <div>
      <Header className="black">
        <Row>
          <Col
            sm={{ span: 10 }}
            md={{ span: 20 }}
            lg={{ span: 6 }}
            xl={{ span: 6 }}
            xxl={{ span: 6 }}
            style={{
              verticalAlign: "middle",
              color: "white",
            }}
          >
            高階智能座位管理系統
          </Col>

          <Col push={12}>
            <Row justify="end">
              <Col>
                {path ? (
                  <Button type="link" key="/" block onClick={() => User("/")} >
                    主頁面
                  </Button>
                ) : (
                  <Button
                    type="link"
                    key="adminList"
                    block
                    onClick={() => User("adminList")}
                  >
                    管理頁面
                  </Button>
                )}
              </Col>
              <Col >
            <Button
              type="link"
              key="logout"
              block
              onClick={() => User("logout")}
              icon={<GlobalOutlined />}
            >
              語系切換
            </Button>
          </Col>
          <Col >
            <Button
              type="link"
              key="logout"
              block
              onClick={() => User("logout")}
            >
              登出
            </Button>
          </Col>
            </Row>
          </Col>
         
        </Row>
      </Header>
    </div>
  );
};
export default HeaderBar;
