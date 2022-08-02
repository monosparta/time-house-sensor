import React, { useEffect, useState } from "react";
import { Form, Input, Button, Checkbox, Row, Col, Alert } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { userSelector, loginUser, clearState } from "../features/userSlice";
import { useTranslation } from "react-i18next";
import "./Login.css";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const { t } = useTranslation();
  const [inputStatus, setInputStatus] = useState("");
  const {  usernameOrMail, password } = useSelector(userSelector);
  const { isFetching, isSuccess, isError, errorMessage } =
    useSelector(userSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (data) => {
    dispatch(loginUser(data));
    console.log("AA" + dispatch(loginUser(data)));
  };

  useEffect(() => {
    if (isError) {
      setInputStatus("error");
      console.log("Error...");
    }
    if (isFetching) {
      dispatch(clearState());
      console.log("Waiting...");
    }
    if (isSuccess) {
      console.log("準備跳轉囉123", isSuccess);
      navigate("/", { replace: true });
      window.location.reload();
      dispatch(clearState());
    }
  }, [isSuccess, isError, isFetching, dispatch, navigate]);

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    navigate("/login");
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
                <h1>  {t("signIn")}</h1>
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
                    <Alert message={errorMessage} type="error" showIcon />
                  ) : null}

                  <Form.Item
                    label={t("account")}
                    name="usernameOrMail"
                    value={usernameOrMail}
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
                      placeholder={t("enterAccount")}
                    />
                  </Form.Item>
                  <Form.Item
                    label={t("pwd")}
                    name="password"
                    value={password}
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
                      placeholder={t("enterPwd")}
                    />
                  </Form.Item>
                  <Form.Item valuePropName="checked" offset="1">
                    <Checkbox className="checkbox-red">{t("keepSignIn")}</Checkbox>
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
                     {t("signInNow")}
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

export default Login;
