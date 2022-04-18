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

                    <h2 style={{color:"while"}}  >時光屋座位管理系統</h2>
                    <img src={"../image/logo.png"} alt="logo"></img>
                </Col>
                <Col span={16}>
                    <div class="box">
                        <div class="content">
                            <Form
                                name="basic"
                                labelCol={{
                                    span: 5,
                                }}
                                wrapperCol={{
                                    span: 19,
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
                                    label="name"
                                    name="name"
                                    value={name}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your username!',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="pwd"
                                    name="pwd"
                                    value={pwd}
                                    // onChange={(e)=>setName(e.target.value)}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your password!',
                                        },
                                    ]}
                                >
                                    <Input.Password />
                                </Form.Item>

                                <Form.Item
                                    name="remember"
                                    valuePropName="checked"
                                    wrapperCol={{
                                        offset: 8,
                                        span: 16,
                                    }}
                                >
                                    <Checkbox>Remember me</Checkbox>
                                </Form.Item>

                                <Form.Item
                                    wrapperCol={{
                                        offset: 8,
                                        span: 16,
                                    }}
                                >
                                    <Button type="primary" htmlType="submit">
                                        Submit
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                </Col>
            </Row>

        </div>
    )
}

export default Login