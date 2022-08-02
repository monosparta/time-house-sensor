/*
 * @Author: 20181101remon mindy80230@gmail.com
 * @Date: 2022-05-20 14:46:28
 * @LastEditors: 20181101remon mindy80230@gmail.com
 * @LastEditTime: 2022-07-28 12:15:20
 * @FilePath: \time-house-sensor\frontend\my-app\src\pages\components\HeaderBar.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from "react";
import { Layout, Row, Col, Menu, Dropdown, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { GlobalOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

const { Header } = Layout;

export const HeaderBar = () => {
  const navigate = useNavigate();
  const { t,i18n } = useTranslation();


  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng.key);
  };
  const path = window.location.pathname === "/adminList" ? 1 : 0;
  const User = (e) => {
    console.log("click ", e);
    if (e === "logout") {
      localStorage.removeItem("authorized_keys");
      window.location.reload();
    } else if (e === "adminList") {
      navigate("/" + e, { replace: true });
    }else{
      navigate("/", { replace: true });
    }
  };
  const menu = (
    <Menu mode="horizontal" defaultSelectedKeys={[""]} onClick={changeLanguage}>
      
        <Menu.Item key="en">{t("en")}</Menu.Item>
        <Menu.Item key="zh-tw">{t("tw")}</Menu.Item>
        <Menu.Item key="de">{t("de")}</Menu.Item>
    </Menu>
  );
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
            {t("project")}
          </Col>

          <Col push={12}>
            <Row justify="end">
              <Col>
                {path ? (
                  <Button type="link" key="/" block onClick={() => User("/")}>
                    {t("home")}
                  </Button>
                ) : (
                  <Button
                    type="link"
                    key="adminList"
                    block
                    onClick={() => User("adminList")}
                  >
                  {t("adminList")}
                  </Button>
                )}
              </Col>
              <Col>
                <Dropdown
                  overlay={menu}
                  trigger={["click"]}
                  placement="bottomRight"
                >
                  <div onClick={(e) => e.preventDefault()}>
                    <Button
                      type="link"
                      key="logout"
                      block
                      icon={<GlobalOutlined />}
                    >
                    {t("ln")}
                    </Button>
                  </div>
                </Dropdown>
              </Col>
              <Col>
                <Button
                  type="link"
                  key="logout"
                  block
                  onClick={() => User("logout")}
                >
                {t("logout")}
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
