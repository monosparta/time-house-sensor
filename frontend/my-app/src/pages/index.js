/*
 * @Author: your name
 * @Date: 2022-04-12 12:01:23
 * @LastEditTime: 2022-04-13 13:45:34
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

const Home = () => {

    const openNotification = () => {
        notification.open({
            message: 'Notification Title',
            description:
                'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
            onClick: () => {
                console.log('Notification Clicked!');
            },
        });
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
                            {console.log(data[0].id)}
                            {console.log(typeof (data))}
                            {console.log(data[0].id)}
                            {data.map((d) => (
                            <Col  span={6}>
                                    {d.id}
                                    {console.log("a"+d+"!!")}
                                    <img src={"../image/"+d.title} alt=" " onClick={openNotification} />
                                {/* <img src="../image/office-chair.png" alt="logo" onClick={openNotification} /> */}
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
            {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer> */}


        </div>)
}

export default Home