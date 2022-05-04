/*
 * @Author: your name
 * @Date: 2022-04-20 13:50:21
 * @LastEditTime: 2022-05-04 11:06:25
 * @LastEditors: 20181101remon mindy80230@gmail.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \time-house-sensor\frontend\my-app\src\Axios.config.js
 */
import Axios from "axios";
const axios = (baseURL) => {
  const instance = Axios.create({
    baseURL: "https://2b19-211-72-239-241.ngrok.io", 
    // baseURL: "http://localhost:3000", //back-end

    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
    },
   
  });
  return instance;
};
export { axios };
export default axios();
