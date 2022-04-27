import React, { useState, useEffect } from 'react'
import { Form, Input, Button, Checkbox, Row, Col } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { login, userSelector, loginUser, clearState } from '../features/counter/userSlice';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import axios from "../Axios.config";
import toast from 'react-hot-toast';
const Login = () => {


    const { usernameOrMail, password } = useSelector(userSelector);
    const { isFetching, isSuccess, isError, errorMessage } = useSelector(userSelector);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onFinish = async (data) => {
        dispatch(loginUser(data));
    };

    useEffect(() => {

        if (isError) {

            toast.error(errorMessage);

            dispatch(clearState());

        }

        if (isSuccess) {

            dispatch(clearState());

            navigate('/');

        }

    }, [isError, isSuccess]);

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        navigate('/login');
    };
    return (
        <div>
            <Row>
                <Col span={8} className="Color box">
                    <div className='logo'>
                        <h2 style={{ color: "white" }}  >時光屋座位管理系統</h2>
                        <img src={"../image/logo.png"} alt="logo"></img>
                    </div>

                </Col>
                <Col span={16}>
                    <div class="box">
                        <div class="content">
                            <div class="form">
                                <h3>Sign In</h3>
                                <Form

                                    name="basic"
                                    labelCol={{
                                        span: 24,
                                    }}
                                    wrapperCol={{
                                        span: 24,
                                    }}
                                    initialValues={{
                                        remember: true,
                                    }}
                                    onFinish={(e) => { onFinish(e); }}
                                    // useForm.js:884 TypeError: e.preventDefault is not a function
                                    // https://ithelp.ithome.com.tw/articles/10245434
                                    onFinishFailed={onFinishFailed}
                                    autoComplete="off"
                                >
                                    <Form.Item
                                        label="帳號 Usernamer or Email"
                                        name="usernameOrMail"
                                        value={usernameOrMail}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your username!',
                                            },
                                        ]}
                                    >
                                        <Input placeholder="請輸入帳號" />
                                    </Form.Item>
                                    <Form.Item
                                        label="密碼 Password"
                                        name="password"
                                        value={password}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your password!',
                                            },
                                        ]}
                                    >
                                        <Input.Password placeholder="請輸入密碼" />
                                    </Form.Item>
                                    <Form.Item
                                    >
                                        <Button type="primary" htmlType="submit" block size='large' style={{ background: "#363F4E", borderColor: "#363F4E" }}>
                                            立即登入
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default Login