/*
 * @Author: your name
 * @Date: 2022-04-12 11:08:57
 * @LastEditTime: 2022-07-22 11:14:32
 * @LastEditors: 20181101remon mindy80230@gmail.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \time-house-sensor\frontend\my-app\src\App.js
 */
import React from "react";

import Home from './pages/index';
import Login from './pages/Login';
import Register from "./pages/Register";
import AdminList from "./pages/AdminList";
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";


function App() {
  const user = localStorage.getItem("authorized_keys");

    

        return (
          <Router>
            {
            user ? (
              <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/register" element={<Register/>}/>
              <Route path="/adminList" element={<AdminList/>}/>
              </Routes>
            ) : (
              // <Route path="*" element={<Button>sddsd</Button>} />
              <Routes>
              <Route path="/login" index element={<Login />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
              </Routes>
            )}
        </Router>
        );
}

export default App;
