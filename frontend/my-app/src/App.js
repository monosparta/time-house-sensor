/*
 * @Author: your name
 * @Date: 2022-04-12 11:08:57
 * @LastEditTime: 2022-05-03 11:08:01
 * @LastEditors: 20181101remon mindy80230@gmail.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \time-house-sensor\frontend\my-app\src\App.js
 */
import React from "react";

import Home from "./pages/index";
import Login from "./pages/Login";
import "./App.css";
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
      <Routes>
        {user ? (
          <Route path="/" element={<Home />} />
        ) : (
          // <Route path="*" element={<Button>sddsd</Button>} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}
        <Route path="/login" index element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
