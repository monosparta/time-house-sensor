/*
 * @Author: your name
 * @Date: 2022-04-12 12:01:23
 * @LastEditTime: 2022-04-12 16:00:13
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \time-house-sensor\frontend\my-app\src\pages\index.js
 */



import React, { useEffect, useState } from "react";
import './index.css';
import { Alert, Layout, Menu, Button, Row, Col, List, Card } from 'antd';
import { LogoutOutlined, GithubOutlined } from '@ant-design/icons';
const { Header, Content, Footer, Sider } = Layout;

const Home = () => {

    const data = [
        {
            title: 'Title 1',
        },
        {
            title: 'Title 2',
        },
        {
            title: 'Title 3',
        },
        {
            title: 'Title 4',
        },
        {
            title: 'Title 1',
        },
        {
            title: 'Title 2',
        },
        {
            title: 'Title 3',
        },
        {
            title: 'Title 4',
        }, {
            title: 'Title 1',
        },
        {
            title: 'Title 2',
        },
        {
            title: 'Title 3',
        },
        {
            title: 'Title 4',
        },
    ];


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
                <Sider style={{ backgroundColor: 'blue' }}>Sidesddsr</Sider>
                <Content>
                <div className="resume">
                    <List
                        grid={{
                            gutter: 16,
                            xs: 1,
                            sm: 2,
                            md: 4,
                            lg: 4,
                            xl: 4,
                            xxl: 3,
                        }}
                        dataSource={data}
                        renderItem={item => (
                            <List.Item>
                                <Card title={item.title}>Card content</Card>
                            </List.Item>
                        )}
                    />
                   </div>
                    
                </Content>
            </Layout>
            {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer> */}


        </div>)
}

export default Home