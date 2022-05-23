/*
 * @Author: your name
 * @Date: 2022-04-12 12:01:23
 * @LastEditTime: 2022-05-04 17:57:07
 * @LastEditors: 20181101remon mindy80230@gmail.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \time-house-sensor\frontend\my-app\src\pages\index.js
 */

import React, { useEffect, useState} from "react";

import {
  Layout,
  Row,
  Col,
  Space,
  Avatar,
} from "antd";

import axios from "../Axios.config";
import { HeaderBar} from "./components/HeaderBar";
import { SeatMap } from "./components/SeatMap";
const { Content, Footer } = Layout;

const Home = () => {

  const [seats, setSeats] = useState([{}]);

  const callSeatApi = () => {
    axios.get(`/api/seatsInfo`).then((res) => {
      let tempSeat = res.data.seats;
      tempSeat.splice(4, 0, { state: "null" });
      tempSeat.splice(8, 0, { state: "null" });
      setSeats(tempSeat);
    });
  };

  useEffect(() => {
    callSeatApi();
    let timer = setInterval(() => {
      callSeatApi();
    }, 5000);
    return () => clearInterval(timer);
  }, []);
 
  return (
    <div>

    <HeaderBar/>
      <Content>
        <div className="seatmap">
          <Row justify="center" align="middle">
            {seats.map((seat, i) => (
              <Col span={6} style={{ alignItems: "center" }}>
                  <SeatMap key={i} seat={seat} callSeatApi={callSeatApi}/>
              </Col>
            ))}
          </Row>
        </div>
      </Content>
      <Footer style={{ textAlign: "center", background: "white" }}>
        <Space className="directions">
          <Avatar
            style={{ color: "#eb2f96" }}
            className="yellow"
            size="small"
          />
          閒置中 &emsp;
          <Avatar className="black" size="small" />
          使用中 &emsp;
          <Avatar className="white" size="small" />
          可使用 &emsp;
          <Avatar className="red" size="small" />
          異常
        </Space>
      </Footer>


    </div>
  );
};

export default Home;
