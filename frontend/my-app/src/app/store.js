/*
 * @Author: your name
 * @Date: 2022-04-12 10:25:02
 * @LastEditTime: 2022-04-25 10:46:18
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \my-app\src\store.js
 */
import { configureStore } from '@reduxjs/toolkit'
// import counterReducer from '../features/counter/counterSlice'
import userReducer from '../features/counter/userSlice';
export default configureStore({
  reducer: {
    user: userReducer,
  },
})