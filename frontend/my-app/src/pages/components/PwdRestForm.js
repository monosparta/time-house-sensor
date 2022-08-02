import React, { useEffect, useState } from "react";
import { Button, Row, Modal, Space, Form, Input } from "antd";
import { useTranslation } from "react-i18next";
export const PwdRestForm = ({ visible, onFinish, onCancel }) => {
  const { t } = useTranslation();
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
          <Button size="large" onClick={onCancel} style={{ color: "#363F4E" }}>
            <b>{t("cancel")}</b>
          </Button>
        </Space>,
      ]}
      onCancel={onCancel}
      closable={false}
    >
      <Row justify="center" align="middle" style={{ display: "flex" }}>
        <Space direction="vertical">
          <div className="center">
            <h2 style={{ color: "black" }}>{t("resetNewPwd")}</h2>
          </div>
          <div>
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
                label={t("newPwd")}
                name="password"
                rules={[
                  {
                    required: true,
                    message: t("enterPwd"),
                  },
                ]}
              >
                <Input.Password size="large" placeholder={t("enterPwd")} />
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
                      return Promise.reject(new Error(t("notSamePwd")));
                    },
                  }),
                ]}
              >
                <Input.Password size="large" placeholder={t("enterConfirmPwd")} />
              </Form.Item>
            </Form>
          </div>
        </Space>
      </Row>
    </Modal>
  );
};

export default PwdRestForm;
