/*
 * @Author: your name
 * @Date: 2022-04-12 12:01:23
 * @LastEditTime: 2022-05-04 17:57:07
 * @LastEditors: 20181101remon mindy80230@gmail.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \time-house-sensor\frontend\my-app\src\pages\index.js
 */

import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userSelector, clearState } from "../features/counter/userSlice";
import {
  Layout,
  Button,
  Row,
  Col,
  Modal,
  Space,
  notification,
  Form,
  Input,
  Radio,
  Avatar,
  Tooltip,
} from "antd";
import {
  LogoutOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  UserOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import axios from "../Axios.config";
import { useNavigate } from "react-router-dom";
import { SendMail } from "./components/SendMail";
import { HeaderBar} from "./components/HeaderBar";
import { CollectionCreateForm } from "./components/CollectionCreateForm";
const { Header, Content, Footer } = Layout;

// Modal From結合的Component


const Home = () => {
  const [isModalVisible1, setIsModalVisible1] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const [selectedChair, setSelectedChair] = useState("");
  const [user, setUser] = useState({});

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
  const Action = (chair) => {
    var state = chair.state;
    var chairId = chair.id;

    if (state === 0) {
      notification.open({
        message: "座位狀態為使用中",
        className: "custom-class",
        icon: <CheckCircleOutlined style={{ color: "#C0E54B" }} />,
        onClick: () => {
          console.log("Notification Clicked!");
        },
      });
    } else if (state === -1) {
      notification.open({
        message: "座位狀態為異常",
        className: "custom-class",
        icon: <ExclamationCircleOutlined style={{ color: "#FF5A5A" }} />,
        style: {
          color: "#FFFFFF",
        },
        onClick: () => {
          console.log("Notification Clicked!");
        },
      });
    } else if (state === 1) {
      setIsModalVisible1(true);
      setSelectedChair(chair);
    } else if (state === 2) {
      // 因為位置的緣故有新增空格，因此需要使用filter來比對裡面的東西
      const result = seats.filter((s) => s.id == chairId);
      console.log("得到結果了嗎", result[0].memberId);
      axios
        .get("/api/auth/admin/memberInfo", {
          params: {
            memberId: result[0].memberId,
          },
          headers: {
            authorization: `Bearer ` + localStorage.getItem("authorized_keys"),
          },
        })
        .then(function (res) {
          console.log("我要得到使用者資料" + res.data.member.name);
          setUser(res.data.member);
        })
        .catch(function (error) {
          console.log(error);
        });
      setIsModalVisible2(true);
      setSelectedChair(chair);
    }
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isFetching, isError } = useSelector(userSelector);

  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
  }, []);

  useEffect(() => {
    if (isError) {
      dispatch(clearState());

      navigate("/login");
    }
  }, [isError]);

 
  const [seats, setSeats] = useState([{}]);

  const callSeatApi = () => {
    axios.get(`/api/seatsInfo`).then((res) => {
      console.log(res.data);
      let tempSeat = res.data.seats;
      tempSeat.splice(4, 0, { state: "null" });
      tempSeat.splice(8, 0, { state: "null" });
      console.log(tempSeat);
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
        console.log(JSON.stringify(response.data));
        console.log("有近來更改囉!!!");
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
                <div
                  style={{
                    alignItems: "center",
                    justify: "center",
                    textAlign: "center",
                  }}
                  className="chairBig"
                >
                  <Tooltip
                    title={
                      seat.state === 2
                        ? "已閒置 " + seat.idleMinutes + "分鐘"
                        : undefined
                    }
                    color={"#5F5A60"}
                    key={i}
                  >
                    {seat.state === "null" ? (
                      <img
                        key={seat.id}
                        className="chair"
                        src={"../image/null.png"}
                        alt=" "
                        // onError={i => i.target.style.display='none'}
                      />
                    ) : (
                      <img
                        key={seat.id}
                        className="chair"
                        // "http://localhost:3000/static/img/seats/"
                        // "https://2b19-211-72-239-241.ngrok.io/static/img/seats/"
                        src={
                          "http://localhost:3000/static/img/seats/" +
                          seat.id +
                          ".png?date=" +
                          new Date()
                        }
                        alt=" "
                        onClick={() => Action(seat)}
                        // onError={i => i.target.style.display='none'}
                      />
                    )}
                    <br />
                    {seat.id === 4 ||
                    seat.id === 1 ||
                    seat.id === 2 ||
                    seat.id === 3 ? (
                      <div>
                        <br />
                        <br />
                      </div>
                    ) : (
                      ""
                    )}
                  </Tooltip>
                </div>
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
