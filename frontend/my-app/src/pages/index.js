/*
 * @Author: your name
 * @Date: 2022-04-12 12:01:23
 * @LastEditTime: 2022-04-22 18:26:29
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \time-house-sensor\frontend\my-app\src\pages\index.js
 */

import React, { useEffect, useState } from "react";
// hook useDispatch
import { useDispatch } from 'react-redux';
import { logout } from '../features/counter/userSlice';
import { Layout, Button, Row, Col, Modal, Space, notification, Form, Input, Radio, Avatar } from 'antd';
import { LogoutOutlined, CheckCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import axios from "../Axios.config";

const { Header, Content, Footer } = Layout;




// Modal From結合的Component
const CollectionCreateForm = ({ visible, onCreate, onCancel, whichModal, chair, member }) => {
    const [form] = Form.useForm();

    // Radio選單
    const [chioces, Chioces] = React.useState(1);

    const onChange = e => {
        console.log('radio checked', e.target.value);
        Chioces(e.target.value);
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
    // https://ant.design/components/form/#components-form-demo-form-in-modal
    if (whichModal === 1) {
        // 表單一，可使用位置
        return (
            <Modal
                className="my-modal-class"
                visible={visible}
                cancelText="　取消　"
                okText="　確認　"
                footer={[
                    <Button onClick={handleOk} style={{ background: "#363F4E", color: "white" }} size='large'>
                        確認
                    </Button>,
                    <Button
                        size='large'
                        onClick={onCancel}
                    >
                        取消
                    </Button>,

                ]}

                onCancel={onCancel}
                closable={false}


            >
                <Row justify="center" align="middle">
                    <h2 style={{ color: "black" }}>座位{chair}-目前為可使用座位</h2>
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
                            <Input placeholder="請輸入名稱" />
                        </Form.Item>
                        <Form.Item
                            label="連絡電話"
                            name="phoneNumber"
                            rules={[{ required: true, message: '請輸入聯絡用電話' }]}
                        >
                            <Input placeholder="請輸入連絡電話" />
                        </Form.Item>
                        <Form.Item
                            label="聯絡信箱"
                            name="mail"
                            rules={[{ required: true, message: '請輸入聯絡用信箱' }]}
                        >
                            <Input placeholder="請輸入聯絡信箱" />
                        </Form.Item>
                    </Form>
                </Row>
            </Modal>

        );
    } else {
        // 表單二，閒置位置
        var username = "";
        username = member.name;
        // {console.log(typeof(username))}
        var phoneNumber = member.phoneNumber;

        var mail = member.mail;
        return (
            <Modal
                closable={false}
                visible={visible}
                okText="確認"
                cancelText="取消"
                width={800}
                className="my-modal-class"
                cancelButtonProps={true}
                footer={[
                    <Button onClick={handleOk} style={{ background: "#363F4E", color: "white" }} size='large'>確定</Button>,
                    <Button onClick={onCancel} size="large">取消</Button>
                ]}
                onCancel={onCancel}
            >
                <Row>
                    <Col span={10}>
                        <Space direction="vertical" size="small" >
                            <h2>{username}</h2>
                            <span><LogoutOutlined />連絡電話：<span>{phoneNumber}</span></span>

                            <span><LogoutOutlined />連絡信箱：<span>{mail}</span></span>
                            <Button style={{ color: "#5CB4FD" }}></Button>
                        </Space>
                    </Col>

                    <Col span={1}>
                        <hr />
                    </Col>
                    <Col span={13}>

                        <h3>座位{chair}-目前為閒置座位</h3>
                        閒置時間：
                        <Form
                            form={form}
                            name="form_in_modal"
                            initialValues={{
                                modifier: 'public',
                            }}
                            labelCol={{
                                span: 24,
                            }}
                            wrapperCol={{
                                span: 24,
                            }}

                        >
                            <Form.Item
                                label="狀態更改"
                                name="state"
                            >
                                <Radio.Group onChange={onChange} value={chioces}>
                                    <Radio value={1}>使用中</Radio>
                                    <Radio value={0}>可使用</Radio>
                                </Radio.Group>
                            </Form.Item>

                            <Form.Item
                                name="index"
                                noStyle
                                initialValue={chair}
                            >
                                <Input type="hidden"></Input>
                            </Form.Item>
                            <Form.Item
                                name="username"
                                noStyle
                                initialValue={username}
                            >
                                <Input type="hidden"></Input>
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
    const [selectedChair, setSelectedChair] = useState("");
    const [user, setUser] = useState({});


    // useEffect(() => {
    //     console.log('嗨@@@@Received values of form2: ', vacantSeatUser);
    // }, [vacantSeatUser]);

    const onCreate = (values, a) => {

        if (a === 1) {

            var data = JSON.stringify({
                "username": values.username,
                "mail": values.mail,
                "phoneNumber": values.phoneNumber
            });

            var config = {
                method: 'post',
                url: '/api/auth/admin/addUser',
                headers: {
                    Authorization: `Bearer ` + localStorage.getItem('authorization'),

                },
                data: data
            };

            axios(config)
                .then(function (response) {
                    console.log(JSON.stringify(response.data));
                })
                .catch(function (error) {
                    console.log(error);
                });

            setIsModalVisible1(false);
        } else {
            console.log('哪裡錯誤 ', values.index);
            console.log('哪裡錯誤 ', values.state);
            console.log('哪裡錯誤阿使用者名稱 ', values.username);
            var data = JSON.stringify({
                "seat": {
                    "index": values.index,
                    "state": values.state,
                },
                "username": values.username
            });

            var config = {
                method: 'put',
                url: '/api/auth/admin/seatState',
                headers: {
                    Authorization: `Bearer ` + localStorage.getItem('authorization'),
                },
                data: data
            };

            axios(config)
                .then(function (response) {
                    console.log(JSON.stringify(response.data));
                })
                .catch(function (error) {
                    console.log(error);
                });

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
    const Action = (prop, chair) => {
        console.log("椅子" + chair);
        if (prop === 0) {
            notification.open({

                message: '座位狀態為使用中',
                className: 'custom-class',
                icon: <CheckCircleOutlined style={{ color: "#C0E54B" }} />,
                onClick: () => {
                    console.log('Notification Clicked!');
                },
            });
        } else if (prop === -1) {
            notification.open({
                message: '座位狀態為異常',
                className: 'custom-class',
                icon: <ExclamationCircleOutlined style={{ color: "#FF5A5A" }} />,
                style: {
                    color: "#FFFFFF"
                },
                onClick: () => {
                    console.log('Notification Clicked!');
                },
            });
        } else if (prop === 1) {
            setIsModalVisible1(true);
            setSelectedChair(chair);
        } else if (prop === 2) {
            // 因為位置的緣故有新增空格，因此需要使用filter來比對裡面的東西
            const result = seats.filter(s =>
                s.id == chair);
            console.log("得到結果了嗎", result[0].memberId);
            axios.get('/api/auth/admin/memberInfo', {
                params: {
                    memberId: result[0].memberId
                }, headers:
                {
                    Authorization: `Bearer ` + localStorage.getItem('authorization')
                }
            })
                .then(function (res) {
                    console.log("我要得到使用者資料" + res.data.member.name);
                    setUser(res.data.member)
                })
                .catch(function (error) {
                    console.log(error);
                });
            setIsModalVisible2(true);
            setSelectedChair(chair);
        }
    };

    // Redux 將dispatch解出來
    const dispatch = useDispatch();

    // 更動state時直接呼叫它，想要選擇的更動規則、想要傳的參數
    const handleLogout = (e) => {
        // localStorage.clear();
        localStorage.removeItem('authorization');
        dispatch(logout())
    };


    const [seats, setSeats] = useState([{}]);

    const callApi=()=>{
        console.log("TEST");
        axios.get(`/api/seatsInfo`)
                .then(res => {
                    console.log(res.data)
                    let tempSeat = res.data.seats;
                    console.log(tempSeat)
                    tempSeat.splice(4, 0, {});
                    tempSeat.splice(8, 0, {});
                    console.log(tempSeat)
                    setSeats(tempSeat);
                })
    }
    useEffect(() => {
        callApi();
        let timer = setInterval(() => {
            callApi();
            // axios.get(`/api/seatsInfo`)
            //     .then(res => {
            //         let tempSeat = Object.values(res.data.seats);
            //         tempSeat = tempSeat.splice(4, 0, {});
            //         tempSeat = tempSeat.splice(8, 0, {});
            //         setSeats(tempSeat);

            //     })
        }, 10000)
        return ()=>clearInterval(timer);
    }, []);





    return (
        <div>
            <Header className="black">
                <div className="" />
                <Row>
                    <Col style={{
                        verticalAlign: 'middle', color: 'white'
                    }}>
                        時光屋座位使用管理系統
                    </Col>
                    <Col span={2} push={18} style={{
                        verticalAlign: 'middle', color: 'white'
                    }}>
                        <Button style={{ background: "#363F4E", color: "white" }} icon={<LogoutOutlined />} onClick={(e) => { handleLogout(e); }}>
                            LOGOUT
                        </Button>
                    </Col>
                </Row>
            </Header>

            <Content>
                <div className="resume">
                    <Row>

                        {seats.map((seat) => (
                            <Col span={6}>
                                <img className="chair" src={"../image/" + seat.state + ".png"} alt=" " onClick={() => Action(seat.state, seat.id)} />
                                <br />
                                {seat.id}
                                <br />
                                <br />
                            </Col>
                        ))}
                    </Row>
                </div>
            </Content>
            <Footer style={{ textAlign: 'center', background: "white" }}>
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
                whichModal={1}
                chair={selectedChair}
                member={""}
            />

            <CollectionCreateForm
                visible={isModalVisible2}
                // onCreate={onCreate}
                onCreate={(e) => onCreate(e, 2)}
                onCancel={() => onCancel(2)}
                whichModal={2}
                chair={selectedChair}
                member={user}
            />



        </div>)
}

export default Home