/*
 * @Author: your name
 * @Date: 2022-04-12 15:37:44
 * @LastEditTime: 2022-04-13 11:55:23
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \time-house-sensor\frontend\my-app\src\pages\components\Chair.js
 */

import { Alert, Layout, Menu, Button, Row, Col, List, Card, Modal, Space, notification } from 'antd';
const { Meta } = Card;


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
const Chair =(prop)=>{
 
    return (
                <div>
                    <img src="../image/office-chair.png" alt="logo" onClick={openNotification} />
                </div>
            )
}

export default Chair