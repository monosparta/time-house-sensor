import React, { useState } from 'react'
import { Form, Input, Button, Checkbox, Row, Col } from 'antd';
import { useDispatch } from 'react-redux';
import { login } from '../features/counter/userSlice';
import './Login.css';



const Login = () => {

    const [name, setName] = useState("");
    const [pwd, setPwd] = useState("");

    const dispatch = useDispatch();

    const onFinish = async (e) => {

        console.log(e);
        dispatch(
            login(
                {
                    name: e.name,
                    pwd: e.pwd,
                    loggedIn: true,
                }
            )
        )

    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
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
                                    onFinish={(e) => { onFinish(e); e.preventDefault(); }}
                                    // useForm.js:884 TypeError: e.preventDefault is not a function
                                    // https://ithelp.ithome.com.tw/articles/10245434
                                    onFinishFailed={onFinishFailed}
                                    autoComplete="off"
                                >
                                    <Form.Item
                                        label="帳號 Usernamer or Email"
                                        name="name"
                                        value={name}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your username!',
                                            },
                                        ]}
                                    >
                                        <Input placeholder="請輸入帳號"/>
                                    </Form.Item>
                                    <Form.Item
                                        label="密碼 Password"
                                        name="pwd"
                                        value={pwd}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your password!',
                                            },
                                        ]}
                                    >
                                        <Input.Password placeholder="請輸入密碼"/>
                                    </Form.Item>

                                    <Form.Item
                                        name="remember"
                                        valuePropName="checked"
                                        offset="1"
                                    >
                                        <Checkbox  className='checkbox-red'>保持登入</Checkbox>
                                    </Form.Item>

                                    <Form.Item

                                    >
                                        <Button type="primary" htmlType="submit" block  size='large' style={{ background: "#363F4E", borderColor: "#363F4E" }}>
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