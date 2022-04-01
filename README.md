<!--
 * @Author: your name
 * @Date: 2022-04-01 14:53:07
 * @LastEditTime: 2022-04-01 15:16:32
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \time-house-sensor\README.md
-->
# 時光屋座位感測
## 實作方法
1. 利用Sensor偵測到時光屋座位的使用現況並透過MQTT協定傳送資料
![avatar](./img/IotSensor.png)


2. 利用LINE BOT 通知管理員現在有閒置座位
![avatar](./img/LinePushAdmin.png)



## 系統需求
1. Raspberry Pi 3 Model B *10
2. 紅外線感測器 *10
3. 震動感測器模組  *1

## 進行方式
- 第一周
    - 設計Linebot的Wireframe
    - 架設Linebot（至少能主動推播一筆資料）
    - 建立資料庫
    - 建立假資料
    
- 第二周
    - Linebot建好功能選單
    - 樹梅派與Sensor接通
    - 撰寫Sensor資料處理的程式碼
    - 製作Line Bot 圖文選單
- 第三周
    - 測試與比較哪個感測器搭配組合最理想
    - 虛擬機MQTT Broker
    - 架設後端的Server
- 第四周
    - 成果測試（於時光屋架設好設備）
    - 


## 預期達成目標
### 初階
1. 判斷此座位是否已超過半小時無人使用
2. 管理者能夠收到誰的座位已閒置超過30分鐘的通知以及查看目前座位使用狀況
3. Monospace會員能夠查看目前時光屋的座位使用情況
### 進階
1. 判斷此座位目前是誰在使用
