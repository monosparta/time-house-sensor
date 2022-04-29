/*
 * @Author: your name
 * @Date: 2022-04-12 12:01:23
 * @LastEditTime: 2022-04-29 13:30:56
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \time-house-sensor\frontend\my-app\src\pages\index.js
 */

import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {logout,loginUser,userSelector,clearState,} from "../features/counter/userSlice";
import emailjs from "@emailjs/browser";
import {Layout,Button,Row,Col, Modal,Space,notification,Form,Input,Radio,Avatar,message,Tooltip,InputNumber
} from "antd";
import {
  LogoutOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  MobileOutlined,
  MailOutlined,
} from "@ant-design/icons";
import axios from "../Axios.config";
import { useNavigate } from "react-router-dom";

const { Header, Content, Footer } = Layout;

const sendEmail = (e) => {
  e.preventDefault();
  console.log("e" + e);
  console.log("e.mail" + e.mail);
  emailjs
    .sendForm(
      "service_r37qfj4",
      "template_dgyqrz8",
      e.target,
      "tc62l1C-WQwcxdnGn"
    )
    .then(
      (result) => {
        console.log(result.text);
        message.success("Send email success！", 5);
      },
      (error) => {
        console.log(error.text);
        message.error("An error occurred, please try again", 5);
      }
    );
  e.target.reset();
  e.target.resetFields();
};

// Modal From結合的Component
const CollectionCreateForm = ({
  visible,
  onCreate,
  onCancel,
  whichModal,
  chair,
  member,
}) => {
  const [form] = Form.useForm();

  // Radio選單
  const [chioces, Chioces] = React.useState(1);

  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    Chioces(e.target.value);
  };

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        onCreate(values);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  // 依照座位狀態顯示不同類型的選單
  // https://ant.design/components/form/#components-form-demo-form-in-modal
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
            <div className="center"><h2 style={{ color: "black" }}>座位{chair}-目前為可使用座位</h2></div>
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
                            message: '請輸入聯絡電話',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                            if ((/09\d{8,8}$/.test(value))||!value) {
                                return Promise.resolve();
                        }
                            return Promise.reject(new Error('請輸入有效的電話號碼'));
                            },
                        }),
                ]}
                // helperText={helperTextCorrect}
                >
                <Input maxLength={10} placeholder="請輸入連絡電話"/>
                </Form.Item>
                <Form.Item
                label="聯絡信箱"
                name="mail"
                rules={[{type: 'email',message: '請輸入有效的郵件地址'},{
                required: true,message: '請輸入聯絡用信箱!'}]}
                >
                                <Input placeholder="請輸入聯絡信箱" />
                            </Form.Item>
                <Form.Item name="index" noStyle initialValue={chair}>
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
    var phoneNumber = member.phoneNumber;
    var mail = member.mail;
    return (
      <Modal
        closable={false}
        visible={visible}
        okText="確認"
        cancelText="取消"
        width={500}
        className="idle-modal-class"
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
              {" "}
              <b>取消</b>
            </Button>
          </Space>,
        ]}
        onCancel={onCancel}
      >
        <Row>
          <Col span={11}>
            <form id="contact" ref={form} onSubmit={sendEmail}>
              <Space
                direction="vertical"
                size="small"
                style={{ display: "flex" }}
              >
                <Row>
                  <Col span={10}>
                 
                    <h2>{username}</h2>
                  </Col>
                  <Col span={14}>
                  
                    <input type="hidden" name="username" value={username} />
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                  
                    <span>
                      <MobileOutlined />
                      {phoneNumber}
                    </span>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <span>
                      <MailOutlined /> {mail}
                    </span>
                  </Col>
                  <Col span={14}>
                    {" "}
                    <input type="hidden" name="mail" value={mail} />
                  </Col>
                </Row>
                <Row>
                  <Col offset={4}>
                    <br />
                    <Button type="primary" htmlType="submit">
                      寄送通知
                    </Button>
                  </Col>
                </Row>
              </Space>
            </form>
          </Col>

          <Col span={1}>
            <hr />
          </Col>
          <Col span={12}>
            <h3>座位{chair}-目前為閒置座位</h3>
            閒置時間：
            <Form
              form={form}
              name="form_in_modal"
              initialValues={{
                modifier: "public",
              }}
              labelCol={{
                span: 24,
              }}
              wrapperCol={{
                span: 24,
              }}
            >
              <Form.Item label="狀態更改" name="state">
                <Radio.Group onChange={onChange} value={chioces}>
                  <Radio value={0}>使用中</Radio>
                  <Radio value={1}>可使用</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item name="index" noStyle initialValue={chair}>
                <Input type="hidden"></Input>
              </Form.Item>
              <Form.Item name="username" noStyle initialValue={username}>
                {console.log("取得username" + username)}
                <Input type="hidden"></Input>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Modal>
    );
  }
};

const Home = () => {
  const [isModalVisible1, setIsModalVisible1] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const [selectedChair, setSelectedChair] = useState("");
  const [user, setUser] = useState({});

  const onCreate = (values, a) => {
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
          Authorization: `Bearer ` + localStorage.getItem("authorized_keys"),
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          var data = JSON.stringify({
            seat: {
              index: values.index,
              state: "0",
            },
            username: values.username,
          });
          callSeatStateApi(data);
        })
        .catch(function (error) {
          console.log(error);
        });
      // 更改狀態
      setIsModalVisible1(false);
    } else {
      console.log("哪裡錯誤阿使用者名稱有得到嗎？？？ ", values.username);

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
  const Action = (prop, chair) => {
    console.log("椅子" + chair);
    if (prop === 0) {
      notification.open({
        message: "座位狀態為使用中",
        className: "custom-class",
        icon: <CheckCircleOutlined style={{ color: "#C0E54B" }} />,
        onClick: () => {
          console.log("Notification Clicked!");
        },
      });
    } else if (prop === -1) {
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
    } else if (prop === 1) {
      setIsModalVisible1(true);
      setSelectedChair(chair);
    } else if (prop === 2) {
      // 因為位置的緣故有新增空格，因此需要使用filter來比對裡面的東西
      const result = seats.filter((s) => s.id == chair);
      console.log("得到結果了嗎", result[0].memberId);
      axios
        .get("/api/auth/admin/memberInfo", {
          params: {
            memberId: result[0].memberId,
          },
          headers: {
            Authorization: `Bearer ` + localStorage.getItem("authorized_keys"),
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

  const handleLogout = (e) => {
    localStorage.removeItem("authorized_keys");
    navigate("/login");
  };

  const [seats, setSeats] = useState([{}]);

  const callSeatApi = () => {
    axios.get(`/api/seatsInfo`).then((res) => {
      console.log(res.data);
      let tempSeat = res.data.seats;
      tempSeat.splice(4, 0, {});
      tempSeat.splice(8, 0, {});
      console.log(tempSeat);
      setSeats(tempSeat);
    });
  };

  const callSeatStateApi = (data) => {
    var config = {
      method: "put",
      url: "/api/auth/admin/seatState",
      headers: {
        Authorization: `Bearer ` + localStorage.getItem("authorized_keys"),
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
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
      <Header className="black">
        <div className="" />
        <Row>
          <Col
            style={{
              verticalAlign: "middle",
              color: "white",
            }}
          >
            時光屋座位使用管理系統
          </Col>
          <Col
            span={2}
            push={18}
            style={{
              verticalAlign: "middle",
              color: "white",
            }}
          >
            <Button
              style={{ background: "#363F4E", color: "white" }}
              icon={<LogoutOutlined />}
              onClick={(e) => {
                handleLogout(e);
              }}
            >
              LOGOUT
            </Button>
          </Col>
        </Row>
      </Header>

      <Content>
        <div className="resume">
          <Row justify="center">
            {seats.map((seat, i) => (
              <Col span={6} >
                {console.log("位置更新的狀況" + i, seat.state)}
                <Tooltip
                  title={
                    seat.state === 2
                      ? "已閒置 " + seat.idleTime + "分鐘"
                      : undefined
                  }
                  color={"#5F5A60"}
                  key={i}
                >
                  <img
                    key={seat.id}
                    className="chair"
                    src={
                      "http://localhost:3000/static/img/seats/" +
                      seat.id +
                    ".png?date=" +new Date()
                    }
                    alt=" "
                    onClick={() => Action(seat.state, seat.id)}
                  />
                  <br />
                  <br />
                </Tooltip>
              </Col>
            ))}
          </Row>
        </div>
      </Content>
      <Footer style={{ textAlign: "center", background: "white" }}>
        <Space>
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
        onCreate={(e) => onCreate(e, 1)}
        onCancel={() => onCancel(1)}
        whichModal={1}
        chair={selectedChair}
        member={""}
      />

      <CollectionCreateForm
        visible={isModalVisible2}
        onCreate={(e) => onCreate(e, 2)}
        onCancel={() => onCancel(2)}
        whichModal={2}
        chair={selectedChair}
        member={user}
      />
    </div>
  );
};

export default Home;
