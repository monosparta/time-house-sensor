/*
 * @Author: your name
 * @Date: 2022-04-20 17:25:00
 * @LastEditTime: 2022-04-26 15:09:08
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \time-house-sensor\frontend\my-app\src\features\counter\userSlice.js
 */
import { createSlice } from '@reduxjs/toolkit';
export const userSlice = createSlice({
    name: 'user',
    initialState: {
      user: null,
    },
    reducers: {
      login: (state,action) => {
        state.user=action.payload;
        
      },
        logout:(state)=>{
          localStorage.clear();
          state.user=null;
    },
    },
  });

  export const {login,logout}=userSlice.actions;

  export const selectUser =(state)=>state.user.user;

  export default userSlice.reducer;
