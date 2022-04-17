/*
 * @Author: your name
 * @Date: 2022-04-12 11:08:57
 * @LastEditTime: 2022-04-12 16:34:34
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \time-house-sensor\frontend\my-app\src\App.js
 */
import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './pages/index'
import Login from './pages/Login';
import Logout from './pages/components/Logout';
import { useSelector } from 'react-redux';
import {selectUser} from"./features/counter/userSlice";

function App() {
  const user=useSelector(selectUser);

  return (
    <div className="App">
      {user ? <Logout/> :<Login/>}
   
    </div>
  );
}

export default App;
