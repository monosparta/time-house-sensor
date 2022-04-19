/*
 * @Author: your name
 * @Date: 2022-04-12 12:01:23
 * @LastEditTime: 2022-04-19 16:44:27
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \time-house-sensor\frontend\my-app\src\pages\index.js
 */

import React, { useEffect, useState } from "react";
// hook useDispatch
import { useDispatch } from 'react-redux';
import { logout } from '../features/counter/userSlice';

import data from '../json/chair1.json';

import { Alert, Layout, Button, Row, Col, Modal, Space, notification, Form, Input, Radio, Badge, Avatar } from 'antd';
import { LogoutOutlined, GithubOutlined ,CheckCircleOutlined ,ExclamationCircleOutlined  } from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;



// REDUX

data.splice(4, 0, {});
data.splice(8, 0, {});

// Modal From結合的Component
const CollectionCreateForm = ({ visible, onCreate, onCancel, a }) => {
    const [form] = Form.useForm();
    // Radio選單
    const [value, setValue] = React.useState(1);
    const onChange = e => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };

    const handleOk = () => {
        form
            .validateFields()
            .then((values) => {
                form.resetFields();
                onCreate(values);
            })
            .catch((info) => {
                console.log('Validate Failed:', info);
            });
    };

    // 依照座位狀態顯示不同類型的選單
    if (a === 1) {
        // 表單一，可使用位置
        return (
            <Modal
                visible={visible}
                okText="Create"
                cancelText="Cancel"
                onCancel={onCancel}
                closable={false}
                footer={[
                    <Button onClick={handleOk}>確定</Button>,
                    <Button onClick={onCancel}>取消</Button>
                ]}
               
            >
                <Row justify="center" align="middle">
                    <Form
                        form={form}
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

        );
    } else {
        // 表單二，閒置位置
        return (
            <Modal
                closable={false}
                visible={visible}
                title="Create a new collection"
                okText="Create"
                cancelText="Cancel"
                width={800}
                cancelButtonProps={true}
                footer={[
                    <Button onClick={handleOk}>確定</Button>,
                    <Button onClick={onCancel}>取消</Button>
                ]}
                onCancel={onCancel}
                // onOk={() => {
                //     form
                //         .validateFields()
                //         .then((values) => {
                //             form.resetFields();
                //             onCreate(values);
                //         })
                //         .catch((info) => {
                //             console.log('Validate Failed:', info);
                //         });
                // }}
            >
                <Row>
                    <Col span={10}>
                        <Space direction="vertical" size="small" >
                            <h2>UserName</h2>
                            <span><LogoutOutlined />連絡電話</span>
                            <span><LogoutOutlined />連絡信箱</span>
                        </Space>
                    </Col>

                    <Col span={1}>
                        <hr />
                    </Col>
                    <Col span={13}>
                        <Form
                            form={form}
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
                                <Radio.Group onChange={onChange} value={value}>
                                    <Radio value={1}></Radio>
                                    <Radio value={2}>B</Radio>
                                </Radio.Group>
                            </Form.Item>

                        </Form>
                    </Col>
                </Row>
            </Modal>

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
    const Action = (prop) => {

        if (prop === "0") {
            notification.open({
                
                message: '座位狀態為使用中',
                className: 'custom-class',
                icon: <CheckCircleOutlined style={{ color: "#C0E54B" }}/>,
                onClick: () => {
                    console.log('Notification Clicked!');
                },
            });
        } else if (prop === "-1") {
            notification.open({
                message: '座位狀態為異常',
                className: 'custom-class',
                icon: <ExclamationCircleOutlined style={{ color: "#FF5A5A" }}/>,
                style: {
                    color: "#FFFFFF"
                },
                onClick: () => {
                    console.log('Notification Clicked!');
                },
            });
        } else if (prop === "1") {
            setIsModalVisible1(true);
            // setIsModalVisible1(true);
        } else if (prop === "2") {
            setIsModalVisible2(true);
        }
    };

    // Redux 將dispatch解出來
    const dispatch = useDispatch();
    

    // 更動state時直接呼叫它，想要選擇的更動規則、想要傳的參數
    const handleLogout = (e) => {
        dispatch(logout())
    }



    return (
        <div>
            <Header className="black">
                <div />
                <Row>
                    <Col style={{
                        verticalAlign: 'middle', color: 'white'
                    }}>
                        時光屋座位使用管理系統
                    </Col>
                    <Col span={2} push={18} style={{
                        verticalAlign: 'middle', color: 'white'
                    }}>
                        <Button shape="round" icon={<LogoutOutlined style={{ color: "#eb2f96" }} />} onClick={(e) => { handleLogout(e); e.preventDefault(); }}>
                            Logout
                        </Button>
                    </Col>
                </Row>
            </Header>

            <Content>
                <div className="resume">
                    <Row>
                        {data.map((d) => (
                            <Col span={6}>
                                <img className="chair" src={"../image/" + d.state + ".png"} alt=" " onError={(event) => event.target.style.display = 'none'} onClick={() => Action(d.state)} />
                                <br />
                                {d.id}
                                <br />
                                <br />
                            </Col>
                        ))}
                    </Row>
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                <Space>
                    <Avatar style={{ color: "#eb2f96" }} className="yellow" size="small" />閒置中 &emsp;
                    <Avatar className="black" size="small" />使用中 &emsp;
                    <Avatar className="white" size="small" />可使用 &emsp;
                    <Avatar className="red" size="small" />異常
                </Space>

            </Footer>

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



        </div>)
}

export default Home