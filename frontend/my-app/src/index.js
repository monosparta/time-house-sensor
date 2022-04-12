/*
 * @Author: your name
 * @Date: 2022-04-12 10:08:23
 * @LastEditTime: 2022-04-12 13:19:10
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \my-app\src\index.js
 */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Home from './pages/index';
import store from './app/store'
import { Provider } from 'react-redux'
ReactDOM.render(
  // <Provider store={store}>
  //   <App />
  // </Provider>,
    <React.StrictMode>
      <Home/>
    </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
