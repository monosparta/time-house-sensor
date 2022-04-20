/*
 * @Author: your name
 * @Date: 2022-04-20 13:50:21
 * @LastEditTime: 2022-04-20 13:55:25
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \time-house-sensor\frontend\my-app\src\Axios.config.js
 */
import Axios from "axios"
const axios = (baseURL) => {
const instance = Axios.create({
baseURL: 'https://2a83-211-72-239-241.ngrok.io',//back-end
headers: { 'Content-Type': 'application/json' },
timeout: 6000,
});
return instance;
}
export {axios};
export default axios();