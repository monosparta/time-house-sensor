/*
 * @Author: your name
 * @Date: 2022-04-12 12:01:23
 * @LastEditTime: 2022-08-22 13:24:57
 * @LastEditors: MING-CHUNLee mindy80230@gmail.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \time-house-sensor\frontend\my-app\src\pages\index.js
 */

import React, { useEffect, useState } from "react";

import { Layout, Row, Col, Space, Avatar } from "antd";
import axios from "../Axios.config";

import { HeaderBar } from "./components/HeaderBar";
import { SeatMap } from "./components/SeatMap";
import { useTranslation } from "react-i18next";

const { Content, Footer } = Layout;
const Home = () => {
  const { t } = useTranslation();

  const [seats, setSeats] = useState([]);
  const getSeatsInfo = () => {
    axios.get(`/api/seatsInfo`).then((res) => {
      let tempSeat = res.data.seats;
      tempSeat.splice(4, 0, { state: "null" });
      tempSeat.splice(8, 0, { state: "null" });
      setSeats(tempSeat);
    });
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
          <div className="seatmap">
            <Row justify="center" align="middle">
              {seats.map((seat, i) => (
                <Col span={6} style={{ alignItems: "center" }}>
                  <SeatMap key={i} seat={seat} callSeatApi={getSeatsInfo} />
                </Col>
              ))}
            </Row>
          </div>
        </Content>
      </div>
      <Footer style={{ textAlign: "center", background: "white" }}>
          <Space>
            &emsp;
            <Avatar className="white" /> &nbsp;
            <b style={{ fontSize: "24px" }}>{t("available")}</b>
            &emsp;
            <Avatar className="black" /> &nbsp;
            <b style={{ fontSize: "24px" }}>{t("inUse")}</b>
            &emsp;
            <Avatar className="yellow" /> &nbsp;
            <b style={{ fontSize: "24px" }}>{t("idle")}</b>
            &emsp;
            <Avatar className="red" /> &nbsp;
            <b style={{ fontSize: "24px" }}>{t("error")}</b>
          </Space>
    
      </Footer>
    </div>
  );
};

export default Home;
