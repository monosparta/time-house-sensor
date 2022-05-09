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
const { Header, Content, Footer } = Layout;

// Modal From結合的Component
const CollectionCreateForm = ({
  visible,
  onFinish,
  onCancel,
  whichModal,
  chairInfo,
  member,
}) => {
  const [form] = Form.useForm();

  // Radio選單
  const [chioces, Chioces] = React.useState(1);

  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    // Chioces(e.target.value);
    Chioces(e.target.value);
  };

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        onFinish(values);
        form.resetFields();
        console.log("是否能傳送值", values);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  var ChairId = chairInfo.id;

  if (whichModal === 1) {
    // 表單一，可使用位置

    return (
      <Modal
        className="my-modal-class"
        visible={visible}
        cancelText="　取消　"
        okText="　確認　"
        footer={[
          <Space size="middle">
            <Button
              onClick={handleSubmit}
              style={{ background: "#363F4E", color: "white" }}
              size="large"
            >
              確認
            </Button>
            <Button
              size="large"
              onClick={onCancel}
              style={{ color: "#363F4E" }}
            >
              <b>取消</b>
            </Button>
          </Space>,
        ]}
        onCancel={onCancel}
        closable={false}
      >
        <Row justify="center" align="middle">
          <Space direction="vertical">
            <div className="center">
              <h2 style={{ color: "black" }}>座位{ChairId}-目前為可使用座位</h2>
            </div>
            <Form
              form={form}
              name="form_in_modal"
              autoComplete="off"
              initialValues={{
                modifier: "public",
              }}
            >
              <Form.Item
                label="名　　稱"
                name="username"
                rules={[{ required: true, message: "請輸入使用者名稱" }]}
              >
                <Input placeholder="請輸入名稱" />
              </Form.Item>
              <Form.Item
                label="連絡電話"
                name="phoneNumber"
                rules={[
                  {
                    required: true,
                    message: "請輸入聯絡電話",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (
                        (/09\d{8,8}$/.test(value) && value.length == 10) ||
                        !value
                      ) {
                        return Promise.resolve();
                      } else if (value.length != 10) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error("請輸入有效的電話號碼"));
                    },
                  }),
                ]}
              >
                <Input maxLength={10} placeholder="請輸入連絡電話" />
              </Form.Item>
              <Form.Item
                label="聯絡信箱"
                name="mail"
                rules={[
                  { type: "email", message: "請輸入有效的郵件地址" },
                  {
                    required: true,
                    message: "請輸入聯絡用信箱!",
                  },
                ]}
              >
                <Input placeholder="請輸入聯絡信箱" />
              </Form.Item>
              <Form.Item name="index" noStyle initialValue={ChairId}>
                {console.log("座位編號是正確的吧" + ChairId)}
                <Input type="hidden"></Input>
              </Form.Item>
            </Form>
          </Space>
        </Row>
      </Modal>
    );
  } else {
    // 表單二，閒置位置

    var username = "";
    username = member.name;
    return (
      <Modal
        closable={false}
        visible={visible}
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
        <Row>
          <Col span={24}>
            <h3>更新座位</h3>
            <h4>使用者資訊</h4>
            <hr />
          </Col>
        </Row>
        <SendMail sendMail={member} />

        <Row>
          <Col span={24}>
            <h4>座位資訊</h4>
            <hr />
          </Col>
        </Row>

        <Form
          form={form}
          name="form_in_modal"
          initialValues={{
            modifier: "public",
          }}
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 20,
          }}
        >
          <div className="fromcontact">
            <Space
              direction="vertical"
              size="small"
              style={{ display: "flex" }}
            >
              <Row>
                <Col span={5}>
                  <Space>
                    <Avatar shape="square" icon={<UserOutlined />} />
                    <span>{ChairId}</span>
                  </Space>
                </Col>
                <Col span={10}>
                  <Space>
                    <Avatar
                      shape="square"
                      icon={<WarningOutlined style={{ color: "#FB8C00" }} />}
                      style={{ background: "white" }}
                    />

                    <span>目前為閒置座位</span>
                  </Space>
                </Col>
              </Row>

              <Row>
                <Col span={24}>
                  <Space>
                    <Avatar shape="square" icon={<UserOutlined />} />
                    <span>座位剩餘時間</span>{" "}
                    <span style={{ color: "rgba(0, 0, 0, 0.6)" }}>
                      {chairInfo.idleMinutes} min
                    </span>
                  </Space>
                </Col>
              </Row>
            </Space>

            <Form.Item label="狀態更改" name="state">
              <Radio.Group onChange={onChange} value={chioces}>
                <Radio value={0}>使用中</Radio>
                <Radio value={1}>可使用</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item name="index" noStyle initialValue={ChairId}>
              <Input type="hidden"></Input>
            </Form.Item>
            <Form.Item name="username" noStyle initialValue={username}>
              {console.log("取道值可以傳送呒" + username)}
              <Input type="hidden"></Input>
            </Form.Item>
          </div>
        </Form>
      </Modal>
    );
  }
};

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
