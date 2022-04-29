import machine
import network
import wifi
from umqttsimple import MQTTClient
import readrfid
import infrared
import time
import json
from utime import sleep_ms
sta = network.WLAN(network.STA_IF)
if not sta.isconnected():
  print('connecting to network...')
  sta.active(True)
  #sta.connect('wifi ssid', 'wifi password')
  sta.connect(wifi.ssid, wifi.password)
  while not sta.isconnected():
    pass
print('network config:', sta.     ifconfig())

def RFID_MQTT(cardId):
    payload={'cardId':cardId,'index':1}
    return payload

def IR_MQTT(seatState):
    payload={'seatUseState':seatState,'index':1}
    return payload

def Exception_MQTT():
    payload={'seatUseState':1,'index':1}
    return payload

def Error(sensorName):
    payload={'errorMessage':"sensor error",'sensorName':sensorName,'index':1}
    return payload

SERVER = '192.168.0.3'
client = MQTTClient('umqtt_client',SERVER,1883,'pi','00010000')
UPDATE_TIME_INTERVAL = 10000 # in ms unit
last_update = time.ticks_ms()
oldCard="" #上一個使用者的卡號
cntIdleTime=0 # 1分鐘內的閒置次數
cntUseTime=0 # 1分鐘內的使用次數
notificationState=0 # 是否已發布此座位閒置
nowState=[] # 此座位30分鐘內的使用狀況

while True:
    if time.ticks_ms() - last_update >= UPDATE_TIME_INTERVAL:
        (userCardId,UseStat)=readrfid.rfid_id() # 卡號，rc522狀態：0-有讀卡 1-沒讀卡 2-資料線被拔
        seatState=infrared.infrared_state() # 座位狀態：0 1
        client.connect()
        if(seatState): 
            cntUseTime=cntUseTime+1
        else:
            cntIdleTime=cntIdleTime+1
        if(UseStat==2): # 資料線被拔，發布Error Topic
            client.publish("Error", json.dumps(Error("RFID")))
            print("Error Topic")
        elif(UseStat==1):# 沒卡卻偵測到人，發布Exception Topic
            if(len(nowState)>=3):
                cntUseTimes=0
                cntIdleTime=0
                compute=nowState[-3:] 
                computeUse=compute.count(1)
                if(computeUse==3):
                    client.publish("Exception", json.dumps(Exception_MQTT()))
                    print("Exception Topic")
        else: # 有卡，並且判斷是否為新的使用者，若為新的使用者，發布RFID Topic
            if(oldCard!=userCardId):
                nowState=[]
                client.publish("RFID", json.dumps(RFID_MQTT(userCardId)))
                print("RFID Topic")
                oldCard=userCardId
        if((cntUseTime+cntIdleTime)==6): # 根據0 1次數，來辨別此分鐘是否有人
            if(len(nowState)>=30):
                del nowState[0]
            if(cntUseTime>4):
                nowState.append(1)
            else:
                nowState.append(0)                
            cntIdleTime=0
            cntUseTime=0
        if(len(nowState)>=3):# 若此座位已閒置30分鐘以上後，偵測到以被使用持續3分鐘，發布IR Topic
            compute=nowState[-3:]
            computeUse=compute.count(1)
            if(notificationState==1 and computeUse==3):
                notificationState=0
                nowState=[]
                client.publish("IR", json.dumps(IR_MQTT(1)))
                print("IR Topic 1")
        if(len(nowState)>=10): # 若此座位已閒置30分鐘以上後，發布IR Topic
            computeTen=nowState[-10:]
            computeTenUse=computeTen.count(0)
            if(computeTenUse>=8):
                computeThirty=nowState
                computeThirtyUse=computeThirty.count(0)
                if(notificationState==0 and computeThirtyUse>=27):
                    notificationState=1
                    client.publish("IR", json.dumps(IR_MQTT(0)))
                    print("IR Topic 0")
        print(userCardId)
        print(seatState)
        print(cntIdleTime)
        print(cntUseTime)
        print(nowState)
        client.disconnect()
        last_update = time.ticks_ms()

