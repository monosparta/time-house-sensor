/*
 * @Author: your name
 * @Date: 2022-04-12 12:01:23
 * @LastEditTime: 2022-06-20 11:18:56
 * @LastEditors: 20181101remon mindy80230@gmail.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \time-house-sensor\frontend\my-app\src\pages\index.js
 */

import React, { useEffect, useState } from "react";

import { Layout, Row, Col, Space, Button, Modal, Result } from "antd";
import axios from "../Axios.config";
import { HeaderBar } from "./components/HeaderBar";
import { Table, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import { DeleteFilled } from "@ant-design/icons";
import PwdRestForm from "./components/PwdRestForm";
import "./AdminList.css";
const { Column } = Table;
const { Content } = Layout;

const AdminList = () => {
  const [admins, setAdmins] = useState([]);
  const [edit, setEdit] = useState();
  const navigate = useNavigate();
  const [ChangePWdModalVisible, setChangePWdModalVisible] = useState(false);
  const [ConfirmDeleteModalVisible, setConfirmDeleteModalVisible] =
    useState(false);
  const showModal = (data, which) => {
    setEdit(data.id);
    console.log(edit);
    if (which === 1) {
      setChangePWdModalVisible(true);
    } else {
      setConfirmDeleteModalVisible(true);
    }
  };

  const onFinish = (values) => {
    console.log("??" + values);
    var udata = JSON.stringify({
      password: values.password,
    });

    var config = {
      method: "put",
      url: "/api/auth/isAdmin/admin/" + edit,
      headers: {
        authorization: `Bearer ` + localStorage.getItem("authorized_keys"),
      },
      data: udata,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        getAdminsInfo();
        setChangePWdModalVisible(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const onCancel = () => {
    setChangePWdModalVisible(false);
    setConfirmDeleteModalVisible(false);
  };
  const handleSubmit = () => {
    console.log("對對對刪爆他");
    Delete(edit);
  };
  const Delete = (data) => {
    var config = {
      method: "delete",
      url: "/api/auth/isAdmin/admin/" + data,
      headers: {
        authorization: `Bearer ` + localStorage.getItem("authorized_keys"),
      },
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        getAdminsInfo();
        setConfirmDeleteModalVisible(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const getAdminsInfo = () => {
    var config = {
      method: "get",
      url: "/api/auth/isAdmin/admins",
      headers: {
        authorization: `Bearer ` + localStorage.getItem("authorized_keys"),
      },
    };

    axios(config)
      .then(function (response) {
        setAdmins(response.data.admins);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const register = (e) => {
    console.log("A");
    navigate("/register", { replace: true });
  };

  useEffect(() => {
    getAdminsInfo();
    let timer = setInterval(() => {
      getAdminsInfo();
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <div className="page-container">
        <HeaderBar />
        <Content>
          <div style={{ width: "80vw", margin: "0 auto" }}>
            <Row
              justify="space-between"
              style={{ margin: "2vh 0", marginTop: "5vh" }}
            >
              <Col
                sm={{ span: 10 }}
                md={{ span: 10 }}
                lg={{ span: 6 }}
                xl={{ span: 6 }}
                xxl={{ span: 6 }}
                style={{
                  verticalAlign: "middle",
                }}
              >
                AdminList
              </Col>
              <Col
                sm={{ span: 4 }}
                md={{ span: 4 }}
                lg={{ span: 2 }}
                xl={{ span: 2 }}
                xxl={{ span: 2 }}
                style={{
                  verticalAlign: "middle",
                  color: "white",
                }}
              >
                <Button
                  onClick={register}
                  size={"large"}
                  style={{ color: "white", background: "#363F4E" }}
                >
                  <span style={{ fontSize: "14px" }}>ADD</span>
                </Button>
              </Col>
            </Row>
            <Table dataSource={admins}>
              <Column
                title="username"
                dataIndex="username"
                key="name"
                width="30%"
              />
              <Column title="mail" dataIndex="mail" key="email" width="30%" />
              <Column title="role" dataIndex="role" key="role" width="30%" />

              <Column
                key="action"
                fixed="right"
                width="10%"
                dataIndex="id"
                render={(_, id) => (
                  <Space size="middle">
                    <Button
                      size={"large"}
                      onClick={() => showModal(id, 1)}
                      style={{ background: "#363F4E", color: "white" }}
                    >
                      <span style={{ fontSize: "14px" }}>Reset PassWord</span>
                    </Button>
                    <Button
                      type="link"
                      icon={<DeleteFilled />}
                      size={"large"}
                      style={{ border: "none", color: "#363F4E" }}
                      onClick={() => showModal(id, 2)}
                    />
                  </Space>
                )}
              />
            </Table>

            <PwdRestForm
              visible={ChangePWdModalVisible}
              onFinish={(e) => onFinish(e)}
              onCancel={onCancel}
            />
          </div>
        </Content>
        <Modal
          closable={false}
          visible={ConfirmDeleteModalVisible}
          okText="確認"
          cancelText="取消"
          width={500}
          className="my-modal-class"
          cancelButtonProps={true}
          footer={[
            <Space size="middle">
              <Button
                onClick={handleSubmit}
                style={{ background: "#363F4E", color: "white" }}
                size="large"
              >
                確定
              </Button>
              <Button onClick={onCancel} size="large">
                <b>取消</b>
              </Button>
            </Space>,
          ]}
          onCancel={onCancel}
        >
          <Result status="warning" title="確認要刪除該管理者嗎" />
        </Modal>
      </div>
    </div>
  );
};

export default AdminList;
