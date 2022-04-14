/*
 * @Author: your name
 * @Date: 2022-04-14 13:49:04
 * @LastEditTime: 2022-04-14 13:50:16
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \time-house-sensor\frontend\my-app\src\pages\components\CollectionCreateForm.js
 */

import { Alert, Layout, Button, Row, Col, Modal, Space, notification, Form, Input } from 'antd';
const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
    const [form] = Form.useForm();
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
        <Row  justify="center" align="middle">
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
                    name="username"
                    rules={[{ required: true, message: '請輸入聯絡用信箱' }]}
                >
                    <Input />
                </Form.Item>
            </Form>
            </Row>
        </Modal>
    );
};

export default CollectionCreateForm