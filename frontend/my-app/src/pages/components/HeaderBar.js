/*
 * @Author: 20181101remon mindy80230@gmail.com
 * @Date: 2022-05-20 14:46:28
 * @LastEditors: MING-CHUNLee mindy80230@gmail.com
 * @LastEditTime: 2022-08-25 11:56:28
 * @FilePath: \time-house-sensor\frontend\my-app\src\pages\components\HeaderBar.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, {  useState } from "react";
import { Layout, Row, Col, Menu, Dropdown, Button, Space,notification } from "antd";
import { useNavigate } from "react-router-dom";

import { GlobalOutlined, RedoOutlined,ExclamationCircleOutlined,CheckCircleOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import axios from "../../Axios.config";
const { Header } = Layout;

export const HeaderBar = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [renewMessage, setRenewMessage] = useState('');
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
    } else if (e === "syncMembers") {
      var config = {
        method: "post",
        url: "/api/auth/isAdmin/syncMembers",
        headers: {
          authorization: `Bearer ` + localStorage.getItem("authorized_keys"),
        },
      };

      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          setRenewMessage("success")
  
        })
        .catch(function (error) {
          setRenewMessage("failed")
          console.log(error);
        });

        if(renewMessage!==""){
          notification.open({
            message:  t("syncMembers")+t(renewMessage),
            className: "custom-class",
            icon: renewMessage==="success"?<CheckCircleOutlined style={{ color: "#C0E54B" }} />:<ExclamationCircleOutlined style={{ color: "#FF5A5A" }} />,
            onClick: () => {
              console.log("Notification Clicked!");
            },
          });
        }

    } else {
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
            sm={{ span: 11 }}
            md={{ span: 22 }}
            lg={{ span: 7 }}
            xl={{ span: 7 }}
            xxl={{ span: 7 }}
            style={{
              color: "white",
            }}
          >
            <Space>
              {t("project")}
              <Button
                icon={<RedoOutlined />}
                key="logout"
                onClick={() => User("syncMembers")}
              >
                {t("renew")}
              </Button>
            </Space>
          </Col>

          <Col push={11}>
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
