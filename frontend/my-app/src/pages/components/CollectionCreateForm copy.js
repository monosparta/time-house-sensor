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
const { Option } = Select;
export const CollectionCreateForm = ({
  visible,
  onFinish,
  onCancel,
  whichModal,
  chairInfo,
  member,
  isError,
  inputStatus,
}) => {
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
  const [front, setFront] = useState("09");
   
  // const [isError, setError] = useState(null);
  // const [front, setFront] = useState("09");


  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    SetChioces(e.target.value);
  };
  const handleChange = (value) => {
    console.log(value);
    setFront(value);
  };

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        console.log(values);
        console.log("AA" + front);

        // values.front = front;
        console.log(values);
        onFinish(values);
        form.resetFields();
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  let ChairId = chairInfo.no;

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
          </Space>
        ]}
        onCancel={onCancel}
        closable={false}
      >
        <Row justify="center" align="middle">
          <Space direction="vertical" >
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
              {isError ? (
                   <><Alert message={isError} type="error" showIcon /><br/></> 
                  ) : null}
              <Form.Item
                label="名　　稱"
                name="username"
                rules={[{ required: true, message: "請輸入使用者名稱" }]}
              >
                <Input placeholder="請輸入名稱" />
              </Form.Item>
          
              <Form.Item 
                label="電話號碼"
                name="phoneNumber"
                rules={[{ required: true, message: "" }]}>
                
                <Input.Group compact
                      rules={[{ required: true, message: "請輸入連絡電話" }]}>
                    
                  <Form.Item name="front">
                    <Select
                       defaultValue="09"
                      style={{
                        width: "6vw",
                      }}
                      onChange={handleChange}
                    >
                      <Option value="09">09</Option>
                      <Option value="+886">+886</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="phoneNumber"
                    rules={[
                  {    
                    required: true,
                    message: "格式錯誤，請重新輸入!! ", 
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (front === "09") {
                      if (
                        (/d{8,8}$/.test(value) && value.length === 8) ||
                        !value
                      ) {
                        return Promise.resolve();
                      } else if (value.length <= 8) {
                        return Promise.resolve(); 
                      }}else if(front === "+886"){
                        if (
                        (/d{9,9}$/.test(value) && value.length === 9) ||
                        !value
                      ) {
                        return Promise.resolve();
                      } else if (value.length <= 9) {
                        return Promise.resolve(); 
                      }
                      }
                      return Promise.reject(new Error("請輸入有效的電話號碼"));
                    },
                  }),
                ]}
                  >
              
                    <NumericInput
                      front={front}
                      value={value}
                      onChange={setValue}
                      inputStatus={inputStatus}
                    />
                  </Form.Item>
                 
                </Input.Group>
                </Form.Item>
              
              <Form.Item
                label="聯絡信箱"
                name="mail"
                rules={[
                  { type: "email", message: "格式錯誤，請重新輸入!!" },
                  {
                    required: true,
                    message: "請輸入聯絡的郵件地址",
                  },
                ]}
              >
                <Input placeholder="請輸入聯絡信箱" />
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
                    <span>座位剩餘時間</span>
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
