/*
 * @Author: your name
 * @Date: 2022-04-25 10:35:01
 * @LastEditTime: 2022-04-25 11:11:31
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \time-house-sensor\frontend\my-app\src\pages\components\SendMail.js
 */

// import React, { useRef } from 'react';
// import emailjs from '@emailjs/browser';
// import { message,Row, Col,Button,Space,Input } from 'antd';



// export const SendMail = () => {
// const form = useRef();
// const sendEmail = (e) => {
//     e.preventDefault();

//     emailjs.sendForm('service_r37qfj4', 'template_72iytmh', e.target, 'tc62l1C-WQwcxdnGn')
//     .then((result) => {
//         console.log(result.text);
//         message.success('Send email success！', 5);
//     }, (error) => {
//         console.log(error.text);
//         message.error('An error occurred, please try again',5);
//     });
//     e.target.reset();
//     e.target.resetFields();
    

// };

// return (
//     <form id="contact" ref={form} onSubmit={sendEmail}>
//       {/* <Col span={10}>
//                         <Space direction="vertical" size="small" >
//                             <h2>{username}</h2>
//                             <span><LogoutOutlined />連絡電話：<span>{phoneNumber}</span></span>

//                             <span><LogoutOutlined />連絡信箱：<span>{mail}</span></span>
//                             <Button style={{ color: "#5CB4FD" }}></Button>
//                         </Space>
//         </Col> */}
//     <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
//         <Row>
//             <Col span={10}> <label>username</label></Col>
//             <Col span={14}> <Input type="hidden" name="user_name" placeholder="Your Name"/></Col>
//         </Row>
//         <Row>
//             <Col span={10}><label>Email</label></Col>
//             <Col span={14}> <Input type="email" name="user_email" placeholder="Your Email"/></Col>
//         </Row>
//         <Row>
//             <Col span={10}>  <label>Message</label></Col>
//             <Col span={14}><TextArea showCount maxLength={400} name="message"/></Col>
//         </Row>
//         <Button type="primary" htmlType="submit" >
//                 Send
//         </Button>
//         </Space>
//     </form>
// );
// };


