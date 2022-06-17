/*
 * @Author: your name
 * @Date: 2022-04-12 12:01:23
 * @LastEditTime: 2022-06-17 11:01:39
 * @LastEditors: 20181101remon mindy80230@gmail.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \time-house-sensor\frontend\my-app\src\pages\index.js
 */

import React, { useEffect, useState } from "react";

import { Layout, Row, Col, Space, Button, Modal, Form } from "antd";
import { Input, Tooltip } from "antd";
import axios from "../Axios.config";
import { HeaderBar } from "./components/HeaderBar";
import { Table, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import { DeleteFilled } from "@ant-design/icons";
import PwdRestForm from "./components/PwdRestForm";
import "./AdminList.css";
const { Column } = Table;
const data = require("../json/admin.json");
const { Content } = Layout;

const AdminList = () => {
  const [seats, setSeats] = useState([]);
  const navigate = useNavigate();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const onFinish = (values, which) => {
    console.log("??"+values.front)
    };
  
  const onCancel = () => {
    setIsModalVisible(false)
  };
  const getSeatsInfo = () => {
    axios.get(`/api/seatsInfo`).then((res) => {
      let tempSeat = res.data.seats;
      tempSeat.splice(4, 0, { state: "null" });
      tempSeat.splice(8, 0, { state: "null" });
      setSeats(tempSeat);
    });
  };

  const register = (e) => {
    console.log("A");
    navigate("/register", { replace: true });
  };

  useEffect(() => {
    getSeatsInfo();
    let timer = setInterval(() => {
      getSeatsInfo();
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <div className="page-container">
        <HeaderBar />
        <Content>
          <div style={{ width: "80vw", margin: "0 auto" }}>
            <Row justify="space-between" style={{ margin: "2vh 0",marginTop:"5vh" }}>
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
                <Button onClick={register} size={"large"} style={{color:"white",background:"#363F4E"}}>
                  <span style={{ fontSize: "14px" }} >ADD</span>
                </Button>
              </Col>
            </Row>
            <Table dataSource={data}>
              <Column title="name" dataIndex="name" key="name" width="30%" />
              <Column title="email" dataIndex="email" key="email" width="30%" />
              <Column title="role" dataIndex="role" key="role" width="30%" />
              <Column
                key="action"
                fixed="right"
                width="10%"
                render={(_, record) => (
                  <Space size="middle">
                    <Button size={"large"} onClick={showModal} style={{background:"#363F4E",color:"white"}}>
                      <span style={{ fontSize: "14px" }}>Reset PassWord</span>
                    </Button>
                    <Button
                      type="link"
                      icon={<DeleteFilled />}
                      size={"large"}
                      style={{border:"none" ,color:"#363F4E"}}
                    />
                  </Space>
                )}
              />
            </Table>

        <PwdRestForm
          visible={isModalVisible}
          onFinish={(e) => onFinish(e)}
          onCancel={onCancel}
        />

          </div>
        </Content>
      </div>
    </div>
  );
};

export default AdminList;
