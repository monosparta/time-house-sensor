# 時光屋座位感測
## 實作方法
1. Raspberry Pi接上紅外線感測器
2. Raspberry Pi通過MQTT協定將目前紅外線感測器所偵測到的結果發布主題出去
3. 前/後台訂閱主題來接收紅外線感測器的結果
> 前後台使用RN?/React/Flutter?來實作

## 系統需求
1. Raspberry Pi 3 Model B *10
2. 紅外線感測器 *10

## 進行方式

## 預期達成目標
1. 紅外線感測器有80%的成功機率，判斷此座位是否已超過半小時無人
2. 系統後台(管理者)能夠通過顏色亮燈來判斷目前座位使用情況
3. 系統前台(Monospace會員)能夠查看目前時光屋的剩餘空位
4. 系統為跨平台