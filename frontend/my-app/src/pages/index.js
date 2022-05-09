/*
 * @Author: your name
 * @Date: 2022-04-12 12:01:23
 * @LastEditTime: 2022-05-04 17:57:07
 * @LastEditors: 20181101remon mindy80230@gmail.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \time-house-sensor\frontend\my-app\src\pages\index.js
 */

import React, { useEffect, useState, useRef } from "react";

import {
  Layout,
  Row,
  Col,
  Space,
  Avatar,
} from "antd";

import axios from "../Axios.config";
import { HeaderBar} from "./components/HeaderBar";
import { CollectionCreateForm } from "./components/CollectionCreateForm";
import { SeatMap } from "./components/SeatMap";
const { Content, Footer } = Layout;

const Home = () => {
  const [isModalVisible1, setIsModalVisible1] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const [selectedChair, setSelectedChair] = useState("");
  const [user, setUser] = useState({});

  const setselectedUser=(user)=>{
    setUser(user);
  }
  const setSelectedChairOfParent = (chair) => {
    setSelectedChair(chair);
  }
  const setVisible = i => {
    if(i==1){
      setIsModalVisible1(true);
    }else{
      setIsModalVisible2(true);
    }
  };
  const onFinish = (values, a) => {
    console.log("哪裡錯誤阿", values);
    if (a === 1) {
      var data = JSON.stringify({
        username: values.username,
        mail: values.mail,
        phoneNumber: values.phoneNumber,
      });

      var config = {
        method: "post",
        url: "/api/auth/admin/addUser",
        headers: {
          authorization: `Bearer ` + localStorage.getItem("authorized_keys"),
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          console.log("得到座位編號啦" + values.index);
          var data = JSON.stringify({
            seat: {
              index: values.index,
              state: "0",
            },
            username: values.username,
          });
          console.log(JSON.stringify("準備更改狀態囉2" + data));
          callSeatStateApi(data);
        })
        .catch(function (error) {
          console.log(error);
        });
      // 更改狀態
      setIsModalVisible1(false);
    } else {
      console.log("哪裡錯誤阿使用者名稱有得到嗎？？？ ", values);

      var data = JSON.stringify({
        seat: {
          index: values.index,
          state: values.state.toString(),
        },
        username: values.username,
      });
      callSeatStateApi(data);
      console.log("嗨Received values of form2: ", values);
      setIsModalVisible2(false);
    }
  };
  const onCancel = (a) => {
    if (a == 1) {
      setIsModalVisible1(false);
    } else {
      setIsModalVisible2(false);
    }
  };
  

  const [seats, setSeats] = useState([{}]);

  const callSeatApi = () => {
    axios.get(`/api/seatsInfo`).then((res) => {
      let tempSeat = res.data.seats;
      tempSeat.splice(4, 0, { state: "null" });
      tempSeat.splice(8, 0, { state: "null" });
      setSeats(tempSeat);
    });
  };

  const callSeatStateApi = (data) => {
    var config = {
      method: "put",
      url: "/api/auth/admin/seatState",
      headers: {
        authorization: `Bearer ` + localStorage.getItem("authorized_keys"),
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        callSeatApi();
      })
      .catch(function (error) {
        console.log(error);
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
                  <SeatMap seat={seat} setVisible={setVisible} setSelectedChairOfParent={setSelectedChairOfParent} setselectedUser={setselectedUser}/>
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

      <CollectionCreateForm
        visible={isModalVisible1}
        onFinish={(e) => onFinish(e, 1)}
        onCancel={() => onCancel(1)}
        whichModal={1}
        chairInfo={selectedChair}
        member={""}
      />

      <CollectionCreateForm
        visible={isModalVisible2}
        onFinish={(e) => onFinish(e, 2)}
        onCancel={() => onCancel(2)}
        whichModal={2}
        chairInfo={selectedChair}
        member={user}
      />
    </div>
  );
};

export default Home;
