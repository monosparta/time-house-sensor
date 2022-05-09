import React, { useEffect, useState, useRef } from "react";
import axios from "../../Axios.config";
import {
    Layout,
    Row,
    Col,
    Space,
    notification,
    Avatar,
    Tooltip,
  } from "antd";
  import {
    CheckCircleOutlined,
    ExclamationCircleOutlined,
  } from "@ant-design/icons";
export const SeatMap =({seat,setVisible})=> {

   
    const [selectedChair, setSelectedChair] = useState("");
    const [user, setUser] = useState({});
    const [seats, setSeats] = useState([{}]);
    const Action = (chair) => {
        var state = chair.state;
        var chairId = chair.id;
    
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
            setVisible(1);
          setSelectedChair(chair);
        } else if (state === 2) {
          // 因為位置的緣故有新增空格，因此需要使用filter來比對裡面的東西
          const result = seats.filter((s) => s.id == chairId);
          console.log("得到結果了嗎", result[0].memberId);
          axios
            .get("/api/auth/admin/memberInfo", {
              params: {
                memberId: result[0].memberId,
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
            setVisible(2);
            setSelectedChair(chair);
        }
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
                      seat.state === 2
                        ? "已閒置 " + seat.idleMinutes + "分鐘"
                        : undefined
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
                        // "http://localhost:3000/static/img/seats/"
                        // "https://2b19-211-72-239-241.ngrok.io/static/img/seats/"
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
                    {seat.id === 4 ||
                    seat.id === 1 ||
                    seat.id === 2 ||
                    seat.id === 3 ? (
                      <div>
                        <br />
                        <br />
                      </div>
                    ) : (
                      ""
                    )}
                  </Tooltip>
                </div>
  )
}

export default SeatMap