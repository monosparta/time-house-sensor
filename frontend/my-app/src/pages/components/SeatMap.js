import React, { useState} from "react";
import axios from "../../Axios.config";
import { notification, Tooltip,message } from "antd";
import { Form } from "antd"
import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { CollectionCreateForm } from "./CollectionCreateForm";
const seatState = require("../utils/seatState");
const URL=process.env.REACT_APP_BASEURL;
export const SeatMap = ({ seat,callSeatApi }) => {
  const [isAddSeatModalVisible, setIisAddSeatModalVisible] = useState(false);
  const [isChangeModalVisible, setChangeModalVisible] = useState(false);
  const [selectedChair, setSelectedChair] = useState("");
  const [selecteduser, setSelecteduser] = useState({});
  const [isError, setError] = useState(null);
  const [inputStatus, setInputStatus] = useState("");
  const [form] = Form.useForm();

  const setVisible = (which,chair) => {
    if(which===seatState.AVAILABLE){
      setIisAddSeatModalVisible(true);
      setSelectedChair(chair);
    }else{
      setChangeModalVisible(true);
      setSelectedChair(chair);
    }
  };


  const onFinish = (values, which) => {
    console.log("??"+which)
    


    if (which === seatState.AVAILABLE) {

      if(!values.front){
        values.front="09"
      }
      if ("09" === values.front) {
        if (values.phoneNumber.length < 8 || values.phoneNumber.length > 9) {
          console.log("A");
          setError("請輸入有效的電話號碼");
          setInputStatus("error")
          return 0;
        }
      } else if ("+886" === values.front) {
        if (values.phoneNumber.length < 9) {
          console.log("A");
          setError("請輸入有效的電話號碼");
          setInputStatus("error");
          return 0;
        }
      }

     let data = JSON.stringify({
        username: values.username,
        mail: values.mail,
        phoneNumber: values.front+values.phoneNumber,
      });

      var config = {
        method: "post",
        url: "/api/auth/admin/addUser",
        headers: {
          authorization: `Bearer ` + localStorage.getItem("authorized_keys"),
        },
        data: data,
      };
      console.log("資料確認"+data);
      axios(config)
        .then(function (response) {
          setError(null);
          console.log("成功新增使用者資料")
          var data = JSON.stringify({
            seat: {
              index: values.index,
              state: "0",
            },
            username: values.username,
          });
          setIisAddSeatModalVisible(false);
          console.log("確認更改座位資料"+data)
          putSeatState(data);
        })
        .catch(function (err) {

          console.log("新增失敗"+err.response.data.detail)
            setError(err.response.data.detail)
        });
  
    } else {
      var data = JSON.stringify({
        seat: {
          index: values.index,
          state: values.state.toString(),
        },
        username: values.username,
      });
      putSeatState(data);
      setChangeModalVisible(false);
    }
  };
  const onCancel = (which) => {
    if (which === seatState.AVAILABLE) {
      setIisAddSeatModalVisible(false);
    } else {
      setChangeModalVisible(false);
    }
  };

  const Action = (seat) => {
    var state = seat.state;
    console.log(seat.no)
    if (state === seatState.USING) {
      notification.open({
        message: seat.no+"座位狀態為使用中",
        className: "custom-class",
        icon: <CheckCircleOutlined style={{ color: "#C0E54B" }} />,
        onClick: () => {
          console.log("Notification Clicked!");
        },
      });
    } else if (state === seatState.ERROR) {
      notification.open({
        message: seat.no+" 座位狀態為異常",
        className: "custom-class",
        icon: <ExclamationCircleOutlined style={{ color: "#FF5A5A" }} />,
        style: {
          color: "#FFFFFF",
        },
        onClick: () => {
          console.log("Notification Clicked!");
        },
      });
    } else if (state === seatState.AVAILABLE) {
      setVisible(1,seat);
    } else if (state === seatState.IDLE_TOO_LONG) {
      console.log("我要得到使用者資料" + seat.memberId);
      axios
        .get("/api/auth/admin/memberInfo", {
          params: {
            memberId: seat.memberId,
          },
          headers: {
            authorization: `Bearer ` + localStorage.getItem("authorized_keys"),
          },
        })
        .then(function (res) {
          setSelecteduser(res.data.member);
          form.setFieldsValue({
            username:res.data.member.name
         });
        })
        .catch(function (error) {
          // console.log("我要得到使用者資料" + seat.memberId);
          console.log(error.data.detail);
        });
      setVisible(2,seat);
  
    }
  };

  const putSeatState = (data) => {
    var config = {
      method: "put",
      url: "/api/auth/admin/seatState",
      headers: {
        authorization: `Bearer ` + localStorage.getItem("authorized_keys"),
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
       
        callSeatApi();
      })
      .catch(function (error) {
        message.error('更改座位狀態失敗');
        console.log(error);
  
      });
  };

  return (
    
    <div
      style={{
        alignItems: "center",
        justify: "center",
        textAlign: "center",
      }}
      className="chairBig"
    >
      <Tooltip
        title={
          seat.state === seatState.IDLE_TOO_LONG ? "已閒置 " + seat.idleMinutes + "分鐘" : undefined
        }
        color={"#5F5A60"}
      >
        {seat.state === "null" ? (
          <img
            key={seat.id}
            className="nullchair"
            src={"../image/null.png"}
            alt=" "
          />
        ) : (
          <img
            key={seat.id}
            className="chair"
            src={
              URL+"/api/static/img/seats/" +
              seat.id +
              ".png?date=" +
              new Date()
            }
            alt=" "
            onClick={() => Action(seat)}
          />
        )}
      
        {seat.id === 4 || seat.id === 1 || seat.id === 2 || seat.id === 3 ? (
          <div>
            <br />
            <br />
          </div>
        ) : (
          ""
        )}
         {seat.id === 5 || seat.id === 6 || seat.id === 7 ? (
          <div>
            <br />
          </div>
        ) : (
          ""
        )}
      </Tooltip>


      <CollectionCreateForm
          visible={isAddSeatModalVisible}
          onFinish={(e) => onFinish(e, 1)}
          onCancel={() => onCancel(1)}
          whichModal={1}
          chairInfo={selectedChair}
          member={""}
          isError={isError}
          inputStatus={inputStatus}
        
        />
  
        <CollectionCreateForm
          visible={isChangeModalVisible}
          onFinish={(e) => onFinish(e, 2)}
          onCancel={() => onCancel(2)}
          whichModal={2}
          chairInfo={selectedChair}
          member={selecteduser}
          isError={isError}
          inputStatus={inputStatus}
        />
    </div>
     
  );
};

export default SeatMap;
