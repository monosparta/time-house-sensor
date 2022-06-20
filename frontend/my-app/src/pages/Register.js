import React, { useEffect, useState } from "react";
import { Form, Input, Button, Checkbox, Row, Col, Alert } from "antd";
import { useDispatch, useSelector } from "react-redux";
import axios from "../Axios.config";
import "./Login.css";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [inputStatus, setInputStatus] = useState("");
  const [isError, setError] = useState(null);
  const navigate = useNavigate();

  const onFinish = async (data) => {
    console.log(data);
    var udata = JSON.stringify({
      "username": data.name,
      "mail": data.mail,
      "password": data.password
    });
    
    var config = {
      method: 'post',
      url: '/api/auth/isAdmin/admin',
      headers: { 
        authorization: `Bearer ` + localStorage.getItem("authorized_keys"),
      },
      data : udata
    };
    
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data.detail));
      setError(null);
      navigate("/",{ replace: true });
    })
    .catch(function (error) {
      console.log("新增失敗"+error.response.data.detail)
      setError(error.response.data.detail)
    });
  };
  
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  
  };
  return (
    <div>
      <Row>
        <Col
          xs={{ span: 0 }}
          sm={{ span: 0 }}
          md={{ span: 8 }}
          lg={{ span: 8 }}
          className="Color box"
        >
        <div className="box">
            <div className="logo">
              <h2 style={{ color: "white", display: "block" }}>
                高階智能座位管理系統
              </h2>
              <img src={"../image/logo.png"} alt="logo"></img>
            </div>
          </div>
        </Col>
        <Col
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 16 }}
          lg={{ span: 16 }}
        >
          <div class="box">
            <div class="content">
              <div class="form">
                <h1>Sign up</h1>
                <Form
                  name="basic"
                  labelCol={{
                    span: 24,
                  }}
                  wrapperCol={{
                    span: 24,
                  }}
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={(e) => {
                    onFinish(e);
                  }}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                >
                   {isError ? (
                   <><Alert message={isError} type="error" showIcon /><br/></> 
                  ) : null}
                  <Form.Item
                    label="名稱 UserName"
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "",
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      status={inputStatus}
                      placeholder="請輸入名稱"
                    />
                  </Form.Item>
                  <Form.Item
                    label="信箱 Mail"
                    name="mail"
                    rules={[
                      { type: "email", message: "請輸入有效的郵件地址" },
                      {
                        required: true,
                        message: "",
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      status={inputStatus}
                      placeholder="請輸入信箱"
                    />
                  </Form.Item>
                  <Form.Item
                    label="密碼 Password"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "",
                      },
                    ]}
                  >
                    <Input.Password
                      size="large"
                      status={inputStatus}
                      placeholder="請輸入密碼"
                    />
                  </Form.Item>
                  <Form.Item
                    name="confirm"
                    label="Confirm Password"
                    dependencies={["password"]}
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: "Please confirm your password!",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("password") === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error(
                              "The two passwords that you entered do not match!"
                            )
                          );
                        },
                      }),
                    ]}
                  >
                    <Input.Password
                      size="large"
                      status={inputStatus}
                      placeholder="請輸入密碼"
                    />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      block
                      size="large"
                      style={{
                        background: "#363F4E",
                        borderColor: "#363F4E",
                        color: "white",
                      }}
                    >
                      <span style={{ fontSize: "1.7vh" }}>立即註冊 </span>
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Register;
