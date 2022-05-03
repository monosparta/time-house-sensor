import React, { useState, useEffect } from 'react'
import { Form, Input, Button, Checkbox, Row, Col, message,Alert } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { login, userSelector, loginUser, clearState } from '../features/counter/userSlice';
import './Login.css';
import { useNavigate } from 'react-router-dom';
const Login = () => {


    const { usernameOrMail, password } = useSelector(userSelector);
    const { isFetching, isSuccess, isError, errorMessage } = useSelector(userSelector);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onFinish = async (data) => {
        dispatch(loginUser(data));
        console.log("AA"+dispatch(loginUser(data)));
    };

    useEffect(() => {

        if (isError) {
            // dispatch(clearState());
            console.log("Error...");
        }
        if (isFetching) {
            dispatch(clearState());
            console.log("Waiting...");
        }
        if (isSuccess) {
            console.log("準備跳轉囉123",isSuccess)
            navigate('/');
            dispatch(clearState());
            

        }

    }, [isSuccess, isError]);

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
                        <div className='image'>
                            <img src={"../image/logo.png"} alt="logo"></img>
                        </div>
                    </div>
                </Col>
                <Col span={16}>
                    <div class="box">
                        <div class="content">
                            <div class="form">
                                <br />
                                <h1>Sign In</h1>
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
                                {console.log("前"+isError)}
                                        {isError ?
                                            <Alert message={errorMessage} type="error" showIcon/> : null
                                            }
                                            {console.log("後"+isError)}
                                    <Form.Item
                                        label="帳號 Username or Email"
                                        name="usernameOrMail"
                                        value={usernameOrMail}
                                        rules={[
                                            {
                                                required: true,
                                                message: '請輸入您的帳號或信箱!',
                                            },
                                        ]}
                                    >
                                        <Input size="large" placeholder="請輸入帳號" />
                                    </Form.Item>
                                    <Form.Item
                                        label="密碼 Password"
                                        name="password"
                                        value={password}
                                        rules={[
                                            {
                                                required: true,
                                                message: '請輸入您的密碼!',
                                            },
                                        ]}
                                    >
                                        <Input.Password size="large" placeholder="請輸入密碼" />
                                    </Form.Item>
                                     <Form.Item
                                      
                                        valuePropName="checked"
                                        offset="1"
                                    >
                                        <Checkbox  className='checkbox-red'>保持登入</Checkbox>
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