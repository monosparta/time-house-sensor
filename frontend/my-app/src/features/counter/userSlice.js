/*
 * @Author: your name
 * @Date: 2022-04-20 17:25:00
 * @LastEditTime: 2022-05-04 14:46:26
 * @LastEditors: 20181101remon mindy80230@gmail.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \time-house-sensor\frontend\my-app\src\features\counter\userSlice.js
 */
import React, { useState, useEffect } from 'react'
import axios from "../../Axios.config";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk(
  
  "users/login",
  async ({ usernameOrMail, password }, thunkAPI) => {
    
    try {
      var udata = JSON.stringify({
        password: password,
        usernameOrMail: usernameOrMail,
      });

      var config = {
        method: "post",
        url: "/api/login",
        data: udata,
      };

      const response = await axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          let data = "";

          if (response.status === 200) {
            localStorage.setItem("authorized_keys", response.data.token);
            data = response.data;
            console.log("我成功了" + response.data);
            

            return data;
          } else {
            console.log("錯誤哈"+response.data.detail);
            // throw response.data
            return thunkAPI.rejectWithValue(response.data);
          }
        })
        .catch(function (error) {
          console.log("取得錯誤啦哈哈"+error.response.data)
          return thunkAPI.rejectWithValue(error.response.data);
        });
      return response;
    } catch (e) {
      console.log("問號Error", e.response.data);

      thunkAPI.rejectWithValue(e.response.data);
    }
  }
);
export const userSlice = createSlice(
  {
  
  name: "user",
  initialState: {
    usernameOrMail: "",
    password: "",
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
  },
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;

      return state;
    },
  },
  extraReducers: {
    [loginUser.fulfilled]: (state) => {
      console.log("OKK");
      state.isFetching = false;
      state.isSuccess = true;
      return state;
    },
    [loginUser.pending]: (state) => {
      state.isFetching = true;
      console.log("loading");
      return state;
    },
    [loginUser.rejected]: (state, { payload }) => {
      console.log("被拒絕啦"+payload);
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.detail;
      console.log( payload);
      return state;
    },
  },
});

export const { login, logout } = userSlice.actions;
export const userSelector = (state) => state.user;
export const { clearState } = userSlice.actions;
export default userSlice.reducer;
