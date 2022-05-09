import React, { useEffect, useState, useRef } from "react";
import axios from "../../Axios.config";
import { notification, Tooltip } from "antd";
import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { CollectionCreateForm } from "./CollectionCreateForm";
export const SeatMap = ({ seat }) => {
  const [isModalVisible1, setIsModalVisible1] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const [selectedChair, setSelectedChair] = useState("");
  const [user, setUser] = useState({});
  const setVisible = (i,chair) => {
    console.log("設定"+chair)
    if(i===1){
      setIsModalVisible1(true);
      setSelectedChair(chair);
    }else{
      setIsModalVisible2(true);
      setSelectedChair(chair);
    }
  };


  const onFinish = (values, a) => {
    console.log("哪裡錯誤阿", values);
    if (a === 1) {
      var data = JSON.stringify({
        username: values.username,
        mail: values.mail,
        phoneNumber: values.phoneNumber,
      });

      var config = {
        method: "post",
        url: "/api/auth/admin/addUser",
        headers: {
          authorization: `Bearer ` + localStorage.getItem("authorized_keys"),
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          console.log("得到座位編號啦" + values.index);
          var data = JSON.stringify({
            seat: {
              index: values.index,
              state: "0",
            },
            username: values.username,
          });
          console.log(JSON.stringify("準備更改狀態囉2" + data));
          callSeatStateApi(data);
        })
        .catch(function (error) {
          console.log(error);
        });
      // 更改狀態
      setIsModalVisible1(false);
    } else {
      console.log("哪裡錯誤阿使用者名稱有得到嗎？？？ ", values);

      var data = JSON.stringify({
        seat: {
          index: values.index,
          state: values.state.toString(),
        },
        username: values.username,
      });
      callSeatStateApi(data);
      console.log("嗨Received values of form2: ", values);
      setIsModalVisible2(false);
    }
  };
  const onCancel = (a) => {
    if (a === 1) {
      setIsModalVisible1(false);
    } else {
      setIsModalVisible2(false);
    }
  };

  const Action = (chair) => {
    var state = chair.state;
    if (state === 0) {
      notification.open({
        message: "座位狀態為使用中",
        className: "custom-class",
        icon: <CheckCircleOutlined style={{ color: "#C0E54B" }} />,
        onClick: () => {
          console.log("Notification Clicked!");
        },
      });
    } else if (state === -1) {
      notification.open({
        message: "座位狀態為異常",
        className: "custom-class",
        icon: <ExclamationCircleOutlined style={{ color: "#FF5A5A" }} />,
        style: {
          color: "#FFFFFF",
        },
        onClick: () => {
          console.log("Notification Clicked!");
        },
      });
    } else if (state === 1) {
      setVisible(1,chair);
    } else if (state === 2) {
      axios
        .get("/api/auth/admin/memberInfo", {
          params: {
            memberId: chair.memberId,
          },
          headers: {
            authorization: `Bearer ` + localStorage.getItem("authorized_keys"),
          },
        })
        .then(function (res) {
          console.log("我要得到使用者資料" + res.data.member.name);
          setUser(res.data.member);
        })
        .catch(function (error) {
          console.log(error);
        });
      setVisible(2,chair);
  
    }
  };

  const callSeatStateApi = (data) => {
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
        window.location.reload();
      })
      .catch(function (error) {
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
          seat.state === 2 ? "已閒置 " + seat.idleMinutes + "分鐘" : undefined
        }
        color={"#5F5A60"}
      >
        {seat.state === "null" ? (
          <img
            key={seat.id}
            className="chair"
            src={"../image/null.png"}
            alt=" "
          />
        ) : (
          <img
            key={seat.id}
            className="chair"
            src={
              "http://localhost:3000/static/img/seats/" +
              seat.id +
              ".png?date=" +
              new Date()
            }
            alt=" "
            onClick={() => Action(seat)}
          />
        )}
        <br />
        {seat.id === 4 || seat.id === 1 || seat.id === 2 || seat.id === 3 ? (
          <div>
            <br />
            <br />
          </div>
        ) : (
          ""
        )}
      </Tooltip>
      <CollectionCreateForm
          visible={isModalVisible1}
          onFinish={(e) => onFinish(e, 1)}
          onCancel={() => onCancel(1)}
          whichModal={1}
          chairInfo={selectedChair}
          member={""}
        />
  
        <CollectionCreateForm
          visible={isModalVisible2}
          onFinish={(e) => onFinish(e, 2)}
          onCancel={() => onCancel(2)}
          whichModal={2}
          chairInfo={selectedChair}
          member={user}
        />
    </div>
     
  );
};

export default SeatMap;
