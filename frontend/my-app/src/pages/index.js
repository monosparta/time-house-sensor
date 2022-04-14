/*
 * @Author: your name
 * @Date: 2022-04-12 12:01:23
 * @LastEditTime: 2022-04-14 16:48:02
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \time-house-sensor\frontend\my-app\src\pages\index.js
 */


import data from '../json/chair1.json';
import React, { useEffect, useState } from "react";
import './index.css';
import { Alert, Layout, Button, Row, Col, Modal, Space, notification, Form, Input } from 'antd';
import { LogoutOutlined, GithubOutlined } from '@ant-design/icons';
const { Header, Content, Footer, Sider } = Layout;

data.splice(4, 0, {});
data.splice(8, 0, {});


const CollectionCreateForm = ({ visible, onCreate, onCancel, a }) => {
    const [form] = Form.useForm();

    if (a == 1) {
        return (
            <Modal
                visible={visible}
                title="Create a new collection"
                okText="Create"
                cancelText="Cancel"
                onCancel={onCancel}
                onOk={() => {
                    form
                        .validateFields()
                        .then((values) => {
                            form.resetFields();
                            onCreate(values);
                        })
                        .catch((info) => {
                            console.log('Validate Failed:', info);
                        });
                }}
            >
                <Row justify="center" align="middle">
                    <Form

                        form={form}
                        // layout="vertical"
                        // labelCol={{ span: 5 }}
                        // wrapperCol={{ span: 19 }}
                        name="form_in_modal"
                        autoComplete="off"
                        initialValues={{
                            modifier: 'public',
                        }}
                    >
                        <Form.Item
                            label="名　　稱"
                            name="username"
                            rules={[{ required: true, message: '請輸入使用者名稱' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="連絡電話"
                            name="phone"
                            rules={[{ required: true, message: '請輸入聯絡用電話' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="聯絡信箱"
                            name="email"
                            rules={[{ required: true, message: '請輸入聯絡用信箱' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Form>
                </Row>
            </Modal>
            // 第二個Modal

        );
    } else {
        return (
            <Modal
                visible={visible}
                title="Create a new collection"
                okText="Create"
                cancelText="Cancel"
                onCancel={onCancel}
                onOk={() => {
                    form
                        .validateFields()
                        .then((values) => {
                            form.resetFields();
                            onCreate(values);
                        })
                        .catch((info) => {
                            console.log('Validate Failed:', info);
                        });
                }}
            >
                <Row justify="center" align="middle">
                    <Form

                        form={form}
                        // layout="vertical"
                        // labelCol={{ span: 5 }}
                        // wrapperCol={{ span: 19 }}
                        name="form_in_modal"
                        autoComplete="off"
                        initialValues={{
                            modifier: 'public',
                        }}
                    >
                        <Form.Item
                            label="名　　稱"
                            name="username"
                            rules={[{ required: true, message: '請輸入使用者名稱' }]}
                        >
                            <Input />
                        </Form.Item>

                    </Form>
                </Row>
            </Modal>
            // 第二個Modal

        );
    }

};


const Home = () => {
    const [isModalVisible1, setIsModalVisible1] = useState(false);
    const [isModalVisible2, setIsModalVisible2] = useState(false);


    const onCreate = (values, a) => {

        if (a === 1) {
            console.log('嗨Received values of form1: ', values);
            setIsModalVisible1(false);
        } else {
            console.log('嗨Received values of form2: ', values);
            setIsModalVisible2(false);
        }


    };
    const onCancel = (a) => {
        if (a == 1) {
            setIsModalVisible1(false);
        } else {
            setIsModalVisible2(false);
        }
    };


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
            // setIsModalVisible1(true);
        } else if (prop === "d") {
            setIsModalVisible2(true);
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
                                    <img src={"../image/" + d.state + ".png"} alt=" " onError={(event) => event.target.style.display = 'none'} onClick={() => openNotification(d.state)} />

                                </Col>
                            ))}
                        </Row>
                    </div>
                </Content>
            </Layout>
            <CollectionCreateForm
                visible={isModalVisible1}
                // onCreate={onCreate}
                onCreate={(e) => onCreate(e, 1)}
                onCancel={() => onCancel(1)}
                a={1}
            />
            <CollectionCreateForm
                visible={isModalVisible2}
                // onCreate={onCreate}
                onCreate={(e) => onCreate(e, 2)}
                onCancel={() => onCancel(2)}
                a={2}
            />
            {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer> */}


        </div>)
}

export default Home