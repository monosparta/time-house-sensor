/*
 * @Author: your name
 * @Date: 2022-04-12 12:01:23
 * @LastEditTime: 2022-04-12 14:50:36
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \time-house-sensor\frontend\my-app\src\pages\index.js
 */
/*
 * @Author: your name
 * @Date: 2022-03-21 11:55:18
 * @LastEditTime: 2022-03-31 16:58:41
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \myresume\src\pages\Home\index.js
 */


import React, { useEffect, useState } from "react";
// import './index.css';
import { Alert, Layout, Menu, Breadcrumb, Row,Col } from 'antd';

const { Header, Content, Footer } = Layout;

const Home = () => {

    const style = {
        backgroundColor: 'red',
        font: 'inherit',
        
      };
    // 工作經驗對話框的

    return (
        <div className="resume">
            
            <Header>
                <div className="logo" />
                <Row>
               


                        <Col span={6} push={10} style={{
                                verticalAlign: 'middle', color:'white'
                        }}>
                        時光屋座位使用管理系統
                        </Col>
               
                </Row>
            </Header>
            <Content style={{ padding: '0 50px' }}>
                <div className="site-layout-content">Content</div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>


        </div>)
}

export default Home