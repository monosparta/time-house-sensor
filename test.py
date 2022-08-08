import machine
from umqttSimple import MQTTClient
import readPn532
import ldSensor
import json
from utime import sleep_ms
import saveData
import os
import network
import time
import wifi
import ntptime

client = MQTTClient('umqtt_client',config.PROD_SERVER,config.MQTT_PORT,config.MQTT_USER_NAME,config.MQTT_USER_PASSWORD)
oldCard=""
cntSecondIdleTime=0
cntSecondUseTime=0
cntIdleTime=0
cntUseTime=0
notificationState=0
nowState=[]
def RFID_MQTT(cardId):
    now='%04d-%02d-%02d %02d:%02d:%02d' %(time.localtime()[0],time.localtime()[1],time.localtime()[2],time.localtime()[3],time.localtime()[4],time.localtime()[5])
    payload={'time':now,'cardId':cardId,'index':config.SEAT_INDEX}
    return payload

def IR_MQTT(seatState):
    now='%04d-%02d-%02d %02d:%02d:%02d' %(time.localtime()[0],time.localtime()[1],time.localtime()[2],time.localtime()[3],time.localtime()[4],time.localtime()[5])
    payload={'time':now,'seatUseState':seatState,'index':config.SEAT_INDEX}
    return payload

def Error(sensorName):
    now='%04d-%02d-%02d %02d:%02d:%02d' %(time.localtime()[0],time.localtime()[1],time.localtime()[2],time.localtime()[3],time.localtime()[4],time.localtime()[5])
    payload={'time':now,'errorMessage':"sensor error",'sensorName':sensorName,'index':config.SEAT_INDEX}
    return payload

def detectsensor(client):
    global cntUseTime,cntIdleTime,notificationState,nowState,oldCard,cntSecondIdleTime,cntSecondUseTime
    client.connect(False)
    (userCardId,useStat)=nfcPn532.readPn532()
    seatState=ldSensor.ld_state()
    if(seatState):
        cntSecondUseTime=cntSecondUseTime+1
    else:
        cntSecondIdleTime=cntSecondIdleTime+1
    if(useStat==2):
        if(client.connect()=="error"):
            savedata.deleteRepeat("Error,")
            savedata.write("Error",json.dumps(Error("RFID")))
        else:
            client.publish("Error", json.dumps(Error("RFID")))
        oldCard=""
        cntSecondIdleTime=0
        cntSecondUseTime=0
        cntIdleTime=0
        cntUseTime=0
        notificationState=0
        nowState=[]
        print("Error Topic")
    if(useStat==0):
        if(oldCard!=userCardId):
            nowState=[]
            notificationState=0
            if(client.connect()=="error"):
                savedata.deleteRepeat("RFID,")
                savedata.write("RFID",json.dumps(RFID_MQTT(userCardId)))
            else:
                client.publish("RFID", json.dumps(RFID_MQTT(userCardId)))
            print("RFID Topic")
            oldCard=userCardId
    if((cntSecondUseTime+cntSecondIdleTime)==10):
        if(cntSecondUseTime>4):
            cntUseTime=cntUseTime+1
        else:
            cntIdleTime=cntIdleTime+1
        cntSecondUseTime=0
        cntSecondIdleTime=0
    if((cntUseTime+cntIdleTime)==6):
        if(len(nowState)==3):
            del nowState[0]
        if(cntUseTime>4):
            nowState.append(1)
        else:
            nowState.append(0)                
        cntIdleTime=0
        cntUseTime=0
    if(len(nowState)==3):
        compute=nowState[-1:]
        computeUse=compute.count(1)
        if(notificationState==1 and computeUse==1):
            notificationState=0
            nowState=[]
            if(client.connect()=="error"):
                savedata.write("IR",json.dumps(IR_MQTT(1)))
            else:
                client.publish("IR", json.dumps(IR_MQTT(1)))
            print("IR Topic 1")
    if(len(nowState)==3):
        computeThirtyUse=nowState.count(0)
        if(notificationState==0 and computeThirtyUse>=2 ):
            notificationState=1
            if(client.connect()=="error"):
                savedata.write("IR",json.dumps(IR_MQTT(0)))
            else:
                client.publish("IR", json.dumps(IR_MQTT(0)))
            print("IR Topic 0")
    print(seatState)
    print(nowState)
def wificonnect(client):
    sta = network.WLAN(network.STA_IF)
    print('connecting to network...')
    sta.active(True)
    sta.connect(config.WIFI_SSID, config.WIFI_PASSWORD)
    print('network config:', sta.ifconfig())
    client.connect(False)
    while True:
        try:
            ntptime.settime()
            if(sta.isconnected()):
                try:
                    detectsensor(client)
                    client.check_msg()
                    data=saveData.read()
                    for i in data:
                        linedata=i.strip().split(',',1)
                        client.publish(linedata[0], linedata[1])
                except OSError as e:
                    client.connect(False)
            else:
                try:
                    detectsensor(client)
                    client.check_msg()
                except OSError as e:
                    client.connect(False)
            time.sleep(1)
        except:
            pass
wificonnect(client)

