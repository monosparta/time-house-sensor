import React, { useEffect, useState } from "react";
import { Form, Input, Button, Checkbox, Row, Col, Alert } from "antd";
import axios from "../Axios.config";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
const Register = () => {
  const { t } = useTranslation();
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
                {t("project")}
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
          <div className="box">
            <div className="content">
              <div className="form">
                <h1>{t("signUp")}</h1>
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
                    label={t("username")}
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
                      placeholder={t("enterUserName")}
                    />
                  </Form.Item>
                  <Form.Item
                    label={t("mail")}
                    name="mail"
                    rules={[
                      { type: "email", message: t("enterValidMail") },
                      {
                        required: true,
                        message: "",
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      status={inputStatus}
                      placeholder={t("enterMail")}
                    />
                  </Form.Item>
                  <Form.Item
                    label={t("pwd")}
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: t("enterPwd"),
                      },
                    ]}
                  >
                    <Input.Password
                      size="large"
                      status={inputStatus}
                      placeholder={t("enterPwd")}
                    />
                  </Form.Item>
                  <Form.Item
                    name="confirm"
                    label={t("confirmPwd")}
                    dependencies={["password"]}
                    rules={[
                      {
                        required: true,
                        message: t("enterConfirmPwd"),
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("password") === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error(
                             t("notSamePwd")
                            )
                          );
                        },
                      }),
                    ]}
                  >
                    <Input.Password
                      size="large"
                      status={inputStatus}
                      placeholder={t("enterConfirmPwd")}
                    />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      block
                     
                      style={{
                        background: "#363F4E",
                        borderColor: "#363F4E",
                        color: "white",
                      }}
                    >
                      <span>{t("signUpNow")} </span>
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
