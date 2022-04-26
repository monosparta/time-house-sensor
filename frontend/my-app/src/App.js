/*
 * @Author: your name
 * @Date: 2022-04-12 11:08:57
 * @LastEditTime: 2022-04-26 14:49:08
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \time-house-sensor\frontend\my-app\src\App.js
 */
import React from 'react';
import Home from './pages/index';
import Login from './pages/Login';
import logo from './logo.svg';
import './App.css';

import {selectUser} from"./features/counter/userSlice";
import { useSelector } from 'react-redux';


// var user = localStorage.getItem('authorization');
function App() {
        const user=useSelector(selectUser);
        // const user=localStorage.getItem("authorization");
        return (
          <div className="App">
            {user ? (<Home/> ):(<Login/>)}
          </div>
        );
}

export default App;
