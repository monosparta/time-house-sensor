import React, { useEffect, useState } from "react";
import {
  Button,
  Row,
  Modal,
  Space,
  Form,
  Input,

} from "antd";
export const PwdRestForm = ({ visible, onFinish, onCancel }) => {
  const [form] = Form.useForm();

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        console.log(values);
        onFinish(values);
        form.resetFields();
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

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
          <Button size="large" onClick={onCancel} style={{ color: "#363F4E" }}>
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
            <h2 style={{ color: "black" }}>設定新密碼</h2>
          </div>
          <Form
            form={form}
            name="form_in_modal"
            autoComplete="off"
            labelCol={{
              span: 24,
            }}
            wrapperCol={{
              span: 24,
            }}
          >
            <Form.Item
              label="新密碼"
              name="password"
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
            >
              <Input.Password size="large" placeholder="請輸入密碼" />
            </Form.Item>
            <Form.Item
              name="confirm"
              label="確認密碼"
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
              <Input.Password size="large" placeholder="請輸入密碼" />
            </Form.Item>
          </Form>
        </Space>
      </Row>
    </Modal>
  );
};

export default PwdRestForm;
