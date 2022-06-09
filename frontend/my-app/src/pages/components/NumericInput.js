import React, { useState,useEffect } from "react";
import { Input, Tooltip } from "antd";
const formatNumber = (value) => new Intl.NumberFormat().format(value);

export function NumericInput(props) {
  const { style , value, onChange,front } = props;
        // console.log("?"+value)
    
  const handleChange = (e) => {
    const { value: inputValue } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;

    // console.log("?!?"+inputValue)
    // console.log(reg.test(inputValue),inputValue === '',inputValue === '-')
    if (reg.test(inputValue) || inputValue === '' || inputValue === '-') {
      onChange(inputValue);
    }
  }; // '.' at the end or only '-' in the input box.

  let maxLength
  if(front==="09"){
    maxLength=8
  }else{
        maxLength=9
  }
  return (
    <div>
      {/* {console.log("B")} */}
 
      <Input
        // {...props}
       style={style}
       value={value}
        // onChange={handleChange}
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
