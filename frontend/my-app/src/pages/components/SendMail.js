/*
 * @Author: your name
 * @Date: 2022-04-25 10:35:01
 * @LastEditTime: 2022-04-25 11:11:31
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \time-house-sensor\frontend\my-app\src\pages\components\SendMail.js
 */

import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { Button, Row, Col, Space, Avatar, message } from "antd";
import { UserOutlined, EditOutlined } from "@ant-design/icons";
export const SendMail = ({sendMail}) => {
  var username = sendMail.name;
  console.log("??/"+Object.values(sendMail))
  var phoneNumber = sendMail.phoneNumber;
  var mail = sendMail.mail;
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();
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

  return (
    <div>
      <form id="fromcontact" ref={form} onSubmit={sendEmail}>
        <Space direction="vertical" size="small" style={{ display: "flex" }}>
          <Row>
            <Col span={24}>
              <Space>
                <Avatar shape="square" icon={<UserOutlined />} />
                <span>{username}</span>{" "}
                <input type="hidden" name="username" value={username} />
              </Space>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Space>
                <Avatar shape="square" icon={<UserOutlined />} />
                <span>{phoneNumber}</span>
              </Space>
            </Col>
          </Row>
          <Row>
            <Col span={17}>
              <Space>
                <Avatar shape="square" icon={<UserOutlined />} />
                <span>{mail}</span>{" "}
                <input type="hidden" name="mail" value={mail} />
              </Space>
            </Col>
            <Col span={5} offset={2}>
              <Button type="primary" htmlType="submit">
                <EditOutlined style={{ color: "#1976D2" }} />
                寄送通知
              </Button>
            </Col>
          </Row>
        </Space>
      </form>
    </div>
  );
};

export default SendMail;
