/*
 * @Author: your name
 * @Date: 2022-04-20 13:50:21
 * @LastEditTime: 2022-08-22 11:05:18
 * @LastEditors: MING-CHUNLee mindy80230@gmail.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \time-house-sensor\frontend\my-app\src\Axios.config.js
 */
import Axios from "axios";
const axios = (baseURL) => {
  const instance = Axios.create({
    baseURL:process.env.REACT_APP_BASEURL, 


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
