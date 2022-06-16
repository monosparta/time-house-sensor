/*
 * @Author: 20181101remon mindy80230@gmail.com
 * @Date: 2022-06-09 11:41:53
 * @LastEditors: 20181101remon mindy80230@gmail.com
 * @LastEditTime: 2022-06-16 15:39:14
 * @FilePath: \time-house-sensor\frontend\my-app\src\pages\components\NumericInput.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useState,useEffect } from "react";
import { Input, Tooltip } from "antd";
const formatNumber = (value) => new Intl.NumberFormat().format(value);

export function NumericInput(props) {
  const { style , value, onChange,front,inputStatus } = props;
        // console.log("?"+value)
    
  const handleChange = (e) => {
    const { value: inputValue } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    if (reg.test(inputValue) || inputValue === '' || inputValue === '-') {
      onChange(inputValue);
    }
  }; 

  let maxLength
  if(front==="+886"){
    maxLength=9
  }

  return (
    <div>
 
      <Input
      status={inputStatus}
       value={value}
        onChange={(e) => {
            onChange(e.target.value.replace(/[^\d.]/g, ""));
            }}
        placeholder="請輸入連絡電話"
         
        maxLength={maxLength}
      />
      {/* {console.log(props)} */}
    </div>
  );
}

export default NumericInput;
