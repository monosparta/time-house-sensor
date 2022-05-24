<!--
 * @Author: your name
 * @Date: 2022-04-01 14:53:07
 * @LastEditTime: 2022-04-01 17:03:34
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \time-house-sensor\README.md
-->
# 時光屋座位感測

## 系統需求
> 基本運作之硬體配備需求
<table>
  <tr>
    <th>設備</th>
    <th>規格</th>
  </tr>
  <tr>
    <td colspan="2" align='center' valign="middle">電腦裝置</td>

  </tr>
  <tr>
    <td>中央處理器CPU</td>
    <td>Intel core i5以上</td>
  </tr>
  <tr>
    <td>記憶體 RAM</td>
    <td>16GB</td>
  </tr>
<tr>
    <td>硬碟</td>
    <td>1TB</td>
  </tr>
      <tr>
    <td colspan="2" align='center' valign="middle">其他裝置</td>
  </tr>
    <tr>
    <td>開發板</td>
    <td>ESP8266</td>
  </tr>
       <tr>
    <td>網路連線</td>
    <td>區域網路</td>
  </tr>
</table>

> 開發環境之軟體需求

<table>
  <tr>
    <th>設備</th>
    <th>規格</th>
  </tr>

  <tr>
    <td>作業系統</td>
    <td>Microsoft Windows7 以上</td>
  </tr>
  <tr>
    <td>開發環境</td>
    <td>Python、MicroPython
React、Node.js
</td>
  </tr>
<tr>
    <td>開發工具</td>
    <td>Microsoft Visual Studio
Thonny
</td>
  </tr>
     <tr>
    <td>資料庫</td>
    <td>MySQL</td>
  </tr>
     <tr>
    <td>伺服器</td>
    <td>Apache</td>
  </tr>
</table>

## 實作方法

1.	將HC-SR501人體紅外線感應模組以及RFID-RC522模組連接至ESP8266，利用Thonny Python IDE編寫MicroPython程式，並將程式燒錄至ESP8266
2.	IOT裝置偵測到的資訊經過預處理後，透過MQTT協定傳送給伺服器端
3.	利用 React Redux以及Node.js建立座位後台管理系統，供管理者操作
4.	建立LINE Bot，供管理者及使用者查看目前座位使用圖
5.	利用Python的Pillow模組繪製座位使用圖


## 進行方式

- 硬體使用方式 
1.	當使用者要使用座位時，需先插卡。 
2.	當使用者要離開座位時，需先拔卡。    
-	軟體使用方式 
    -	管理者
    1. 管理者的LINE User ID需先存入資料庫。
    2. 管理者需要加入官方LINE Bot帳號。 
    3. 管理者加入官方LINE Bot帳號後，可以查看目前時光屋的座位使用圖、進入座位後台管理系統以及接收座位閒置的推播通知。 
    4. 當有座位閒置30分鐘以上時，會主動推播閒置通知給管理者的LINE帳號。
    5. 當管理者收到推播通知後，可以進入座位後台管理系統來查看目前此閒置座位的使用者資訊，供管理者通知使用者處理座位閒置的問題。當管理者座位閒置問題處理完畢後，管理者可以做座位狀態的改變，如座位閒置狀態改為座位使用中或座位可使用。
    - 使用者
    1. 使用者需要加入官方LINE Bot帳號。 
    2. 使用者加入官方LINE Bot帳號後，可以查看目前時光屋的座位使用圖。


## issue1（假設插卡情況）
1.座位<b>未</b>插卡,紅外線<b>未</b>偵測到人,桌上<b>未</b>有物品
- 可使用的空座位

2.座位<b>有</b>插卡,紅外線<b>未</b>偵測到人,桌上<b>未</b>有物品
- 超過30分鐘後，將通報閒置座位給管理員
> 情境１：在MonoSpace中但沒有坐在時光屋的座位
> 情境２：使用完畢座位但忘記將卡片帶離
> 情境３：暫時離開座位上廁所

3.座位<b>未</b>插卡,紅外線<b>有</b>偵測到人,桌上<b>未/有</b>物品
- 可使用座位，需要處理：請未登記的使用者插卡記名或禮讓座位
> 情境1：無意間霸佔位子的使用者


4.座位<b>未</b>插卡,紅外線<b>未</b>偵測到人,桌上<b>有</b>物品
- 可使用座位，需要處理，使用LINE Bot 通報遺留物品
> 情境1：上位使用者忘記帶走自己的物品
> 情境2：外出處理事情將東西遺留在座位


5.座位<b>有</b>插卡,紅外線<b>有</b>偵測到人,桌上<b>未/有</b>物品
- 正被使用中的位置


## 預期達成目標
- 短期計畫：測試HC-SR501人體紅外線感應模組最佳的擺放角度與數量，思索實名制座位可否不局限於ID卡記名，擴展其他種類的器材，如手機NFC等，並盡可能完善本服務的使用者座位使用情境處理。
- 中期計畫：將現有的系統加入座位彈性預約機制，使用者可以事先預約自己想要的座位及時間，如果預約時間到了而使用者尚未出現，座位會保留10分鐘，保留時間過後若使用者還未到現場的話則自動釋出，藉此提供更完善的服務，以及完善LINE Bot 選單中的使用者【回報座位狀態】功能，讓使用者與管理員的溝通更加緊密。
- 長期計畫：開發自動化電源控制系統，通過讀卡設備來辨別使用者是否已抵達現場，如果使用者已抵達現場並且插卡，則該台電腦設備便會供電，若使用者抽卡離開座位後則自動斷電。




