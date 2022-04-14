/*
 * @Author: your name
 * @Date: 2022-04-12 12:01:23
 * @LastEditTime: 2022-04-14 11:04:03
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \time-house-sensor\frontend\my-app\src\pages\index.js
 */


import data from '../json/chair1.json';
import React, { useEffect, useState } from "react";
import './index.css';
import { Alert, Layout, Menu, Button, Row, Col, List, Card, Modal, Space, notification } from 'antd';
import { LogoutOutlined, GithubOutlined } from '@ant-design/icons';

import { Chair } from './components/Chair';
const { Header, Content, Footer, Sider } = Layout;

data.splice(4, 0, {});
data.splice(8, 0, {});
const Home = () => {
    const [isModalVisible1, setIsModalVisible1] = useState(false);
    const [isModalVisible2, setIsModalVisible2] = useState(false);

    console.log(data)
    const openNotification = (prop) => {

        if (prop === "office-chair") {
            notification.open({
                message: '使用中',
                description:
                    'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
                onClick: () => {
                    console.log('Notification Clicked!');
                },
            });
        } else if (prop === "chair") {
            notification.open({
                message: '異常',
                description:
                    'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
                onClick: () => {
                    console.log('Notification Clicked!');
                },
            });
        } else if (prop === "c") {
            setIsModalVisible1(true);
        } else if (prop === "d") {
            setIsModalVisible2(true);
        }
    };

    const handleOk = (prop) => {
        if (prop === 1) {
            setIsModalVisible1(false);
            console.log('=== show modal 1===', prop);
        } else if (prop === 2) {
            setIsModalVisible2(false)
            console.log('=== show modal 2===', prop);
        }

    };

    const handleCancel = (prop) => {

        if (prop === 1) {
            setIsModalVisible1(false);
            console.log('=== show modal 1===', prop);
        } else if (prop === 2) {
            setIsModalVisible2(false)
            console.log('=== show modal 2===', prop);
        }
    };
   

    return (
        <div>

            <Header>
                <div className="logo" />
                <Row>
                    <Col span={5} push={11} style={{
                        verticalAlign: 'middle', color: 'white'
                    }}>
                        時光屋座位使用管理系統
                    </Col>
                    <Col span={2} push={17} style={{
                        verticalAlign: 'middle', color: 'white'
                    }}>
                        <Button shape="round" icon={<LogoutOutlined style={{ color: "#eb2f96" }} />} >
                            Logout
                        </Button>
                    </Col>

                </Row>
            </Header>
            <Layout>
                <Sider style={{ backgroundColor: 'blue' }}></Sider>
                <Content>
                    <div className="resume">
                        <Row>
                            {data.map((d) => (
                                <Col span={6}>
                                    {d.id}
                                    <img  src={"../image/" + d.state+".png"} alt=" " onError={(event) => event.target.style.display = 'none'} onClick={() => openNotification(d.state)} />
                                </Col>
                            ))}

                        </Row>
                        {/* 第二版 */}
                        {/* {data.map((data) => (
                            <Col md={{ span: 8 }}>
                                <Chair key={data.id} data={data} />
                                  <img src="../image/office-chair.png" alt="logo" onClick={openNotification} />
                            </Col>
                        ))} */}
                    </div>
                </Content>
            </Layout>

            <Modal title="Basic Modal" visible={isModalVisible1} onOk={() => handleOk(1)} onCancel={() => handleCancel(1)}>
                <p>新位置</p>
                <p>新位置</p>
                <p>Some contents...</p>
            </Modal>
            <Modal title="Basic Modal" visible={isModalVisible2} onOk={() => handleOk(2)} onCancel={() => handleCancel(2)}>
                <p>閒置</p>
                <p>新位置</p>
                <p>Some contents...</p>
            </Modal>
            {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer> */}


        </div>)
}

export default Home