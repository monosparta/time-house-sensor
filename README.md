# nfcPn532.py
PN532 的 library
# umqttsimple.py
MQTT 的 library
# ldSensor.py
1. 輸出資料
<img width="580" alt="image" src="https://user-images.githubusercontent.com/97736504/185836556-b99b91d8-9d20-461d-ac3b-bead0aeb8441.png">

2. 針對資料做解析，來取得最後的那一串數字，如果數字大於 **1000** 就辨別為有人
# readPn532.py
1. 使用 SPI 通訊協定
2. 透過 read_passive_target() 來獲取卡號資料，如果取得的資料是空值，代表讀卡機沒讀到卡，非空值代表有讀到卡
3. 因讀出來的卡號為 UID，要轉成一般的 USB 讀卡機卡號，使用 **8H10D** 的轉碼方式，[轉碼參考資料](https://www.wanlong168.com.tw/support/id-card.html)
4. zfl() 將卡號補 0 補至 10 碼
# savedata.py
當遇上 Wifi 斷網或 MQTT 斷線時做處理的檔案
1. write() 將資料暫存至 temporarydata.txt
2. deleteRepeat() 處理讀卡的部分，如果本身檔案有儲存過卡號了，就把它刪掉 -> 為了讓資料一直維持在最新狀態
3. read() 讀出所有在 temporarydata.txt 的資料
# mqttclient.py
## 參數
1. oldCard -> 上一次紀錄的卡號(避免一直發送同一個人的卡號)
2. cntSecondIdleTime -> 記錄每10秒的座位閒置次數 
3. cntSecondUseTime -> 記錄每10秒的座位使用次數 
4. cntIdleTime -> 記錄每分鐘的座位閒置次數 
5. cntUseTime -> 記錄每分鐘的座位使用次數 
6. notificationState -> 紀錄是否已發過座位閒置通知(避免一直發送閒置通知) 
7. nowState=[] -> 紀錄最新30分鐘的座位使用狀況，舉例：[0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
## Function
1. wificonnect() 做網路連線
2. detectsensor() 處理 Sensor 的資訊
- 當每10秒內有 > 4 次的 1(有偵測到人)，就判定此區間有在使用座位
- 當每1分鐘內有 > 4 次的 1(有偵測到人)，就判定此分鐘有在使用座位
- 當30分鐘內有 >= 27 次的 0(沒有偵測到人)，就判定此座位已閒置，發 IR Topic(目前時間，seatState=0,index="座位編號")
- 當曾經發送推播通知後，出現連續的5分鐘內 >= 3次偵測到人，就判定此座位的使用者回來了，發 IR Topic(time=目前時間，seatState=1,index=座位編號)
- 當有新的使用者放卡後，發 RFID Topic(time=目前時間，cardId=卡號,index=座位編號)
