import React, { useEffect, useState } from "react";
import {
  Button,
  Row,
  Col,
  Modal,
  Space,
  Form,
  Input,
  Radio,
  Avatar,
  Select,
  Alert,
} from "antd";
import { UserOutlined, WarningOutlined } from "@ant-design/icons";

import { SendMail } from "./SendMail";
import { NumericInput } from "./NumericInput";
import { useTranslation } from "react-i18next";
export const CollectionCreateForm = ({
  visible,
  onFinish,
  onCancel,
  whichModal,
  chairInfo,
  member,
  isError,
  inputStatus,
  setInputStatus,
  setError,
}) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({
      username: member.name,
      index: chairInfo.id,
    });
  }, [form, member.name, chairInfo.id]);

  // Radio選單
  const [chioces, SetChioces] = useState(1);
  const [value, setValue] = useState(null);

  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    SetChioces(e.target.value);
  };

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        console.log("A" + values);
        console.log(values);
        if (whichModal === 1) {
          if (values.phoneNumber.length < 12) {
            setError(t("enterValidPhone"));
            setInputStatus("error");
            return 0;
          }
          console.log(values.phoneNumber.substr(0, 4));
          if (values.phoneNumber.substr(0, 4) !== "8869") {
            setError(t("enterValidPhone"));
            setInputStatus("error");
            return 0;
          }
        }

        onFinish(values);
        form.resetFields();
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  let ChairId = chairInfo.no;

  if (whichModal === 1) {
    return (
      <Modal
        className="my-modal-class"
        visible={visible}
        cancelText={t("cancel")}
        okText={t("confirm")}
        footer={[
          <Space size="middle">
            <Button
              onClick={handleSubmit}
              style={{ background: "#363F4E", color: "white" }}
              size="large"
            >
              {t("confirm")}
            </Button>
            <Button
              size="large"
              onClick={onCancel}
              style={{ color: "#363F4E" }}
            >
              <b>{t("cancel")}</b>
            </Button>
          </Space>,
        ]}
        onCancel={onCancel}
        closable={false}
      >
        <Row justify="center" align="middle">
          <Space direction="vertical">
            <div className="center">
              <h2 style={{ color: "black" }}>
                {t("seat")}
                {ChairId}-{t("seatIsAvailable")}
              </h2>
            </div>
            <Form
              form={form}
              name="form_in_modal"
              autoComplete="off"
              initialValues={{
                modifier: "public",
              }}
              labelCol={{
                span: 5,
              }}
              wrapperCol={{
                span: 19,
              }}
            >
              {isError ? (
                <>
                  <Alert message={isError} type="error" showIcon />
                  <br />
                </>
              ) : null}
              <Form.Item
                label={t("username")}
                name="username"
                rules={[{ required: true, message: t("enterUserName") }]}
                labelAlign="right"              
                >
                <Input placeholder={t("enterUserName")} />
              </Form.Item>

              <Form.Item
                label={t("phone")}
                name="phoneNumber"
                rules={[{ required: true, message: t("enterPhone") }]}
                labelAlign="right"
              >
                <NumericInput
                  value={value}
                  onChange={setValue}
                  inputStatus={inputStatus}
                />
              </Form.Item>
              <Form.Item
                label={t("mail")}
                name="mail"
                rules={[
                  { type: "email", message: t("formatError") },
                  {
                    required: true,
                    message: t("enterMail"),
                  },
                ]}
                labelAlign="right"
              >
                <Input placeholder={t("enterMail")} />
              </Form.Item>
              <Form.Item name="index" noStyle>
                <Input type="hidden"></Input>
              </Form.Item>
            </Form>
          </Space>
        </Row>
      </Modal>
    );
  } else {
    // 表單二，閒置位置

    return (
      <Modal
        closable={false}
        visible={visible}
        okText={t("confirm")}
        cancelText={t("cancel")}
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
              {t("confirm")}
            </Button>
            <Button onClick={onCancel} size="large">
              <b>{t("cancel")}</b>
            </Button>
          </Space>,
        ]}
        onCancel={onCancel}
      >
        <Row>
          <Col span={24}>
            <h3>{t("updateSeat")}</h3>
            <h4>{t("userInfo")}</h4>
            <hr />
          </Col>
        </Row>
        <SendMail sendMail={member} />
        <Row>
          <Col span={24}>
            <h4>{t("seatInfo")}</h4>
            <hr />
          </Col>
        </Row>

        <Form
          form={form}
          name="form_in_modal"
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 18,
          }}
        >
          <div className="fromcontact">
            <Space
              direction="vertical"
              size="large"
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
                    <span>{t("seatIsIdle")}</span>
                  </Space>
                </Col>
              </Row>

              <Row>
                <Col span={24}>
                  <Space>
                    <Avatar shape="square" icon={<UserOutlined />} />
                    <span>{t("seatIdleTime")}</span>
                    <span style={{ color: "rgba(0, 0, 0, 0.6)" }}>
                      {chairInfo.idleMinutes} min
                    </span>
                  </Space>
                </Col>
              </Row>

              <Form.Item label={t("changeStatus")} 
              name="state" 
              labelAlign="left">
                <Radio.Group onChange={onChange} value={chioces}>
                  <Radio value={0}>{t("inUse")}</Radio>
                  <Radio value={1}>{t("available")}</Radio>
                </Radio.Group>
              </Form.Item>
            </Space>
            <Form.Item name="index" noStyle rules={[{ required: true }]}>
              <Input type="hidden"></Input>
            </Form.Item>
            <Form.Item name="username" noStyle rules={[{ required: true }]}>
              <Input type="hidden" />
            </Form.Item>
          </div>
        </Form>
      </Modal>
    );
  }
};

export default CollectionCreateForm;
