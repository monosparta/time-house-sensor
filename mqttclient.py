import machine
from umqttsimple import MQTTClient
import readrfid
import infrared
import json
from utime import sleep_ms
import savedata
import os
import network
import time
import wifi
import ntptime

SERVER = '10.2.10.131'
client = MQTTClient('umqtt_client',SERVER,1883,'seat1','seat1')
oldCard="" 
cntIdleTime=0
cntUseTime=0
notificationState=0
nowState=[]
def RFID_MQTT(cardId):
    now='%04d-%02d-%02d %02d:%02d:%02d' %(time.localtime()[0],time.localtime()[1],time.localtime()[2],time.localtime()[3],time.localtime()[4],time.localtime()[5])
    payload={'time':now,'cardId':cardId,'index':1}
    return payload

def IR_MQTT(seatState):
    now='%04d-%02d-%02d %02d:%02d:%02d' %(time.localtime()[0],time.localtime()[1],time.localtime()[2],time.localtime()[3],time.localtime()[4],time.localtime()[5])
    payload={'time':now,'seatUseState':seatState,'index':1}
    return payload

def Error(sensorName):
    now='%04d-%02d-%02d %02d:%02d:%02d' %(time.localtime()[0],time.localtime()[1],time.localtime()[2],time.localtime()[3],time.localtime()[4],time.localtime()[5])
    payload={'time':now,'errorMessage':"sensor error",'sensorName':sensorName,'index':1}
    return payload

def detectsensor(client):
    global cntUseTime,cntIdleTime,notificationState,nowState,oldCard
    client.connect(False)
    (userCardId,UseStat)=readrfid.rfid_id()
    seatState=infrared.infrared_state()
    if(seatState):
        cntUseTime=cntUseTime+1
    else:
        cntIdleTime=cntIdleTime+1
    if(UseStat==2):
        if(client.connect()=="error"):
            savedata.deleteRepeat("Error,")
            savedata.write("Error",json.dumps(Error("RFID")))
        else:
            client.publish("Error", json.dumps(Error("RFID")))
        print("Error Topic")
    if(UseStat==0):
        if(oldCard!=userCardId):
            nowState=[]
            if(client.connect()=="error"):
                savedata.deleteRepeat("RFID,")
                savedata.write("RFID",json.dumps(RFID_MQTT(userCardId)))
            else:
                client.publish("RFID", json.dumps(RFID_MQTT(userCardId)))
            print("RFID Topic")
            oldCard=userCardId
    if((cntUseTime+cntIdleTime)==6):
        if(len(nowState)>=30):
            del nowState[0]
        if(cntUseTime>4):
            nowState.append(1)
        else:
            nowState.append(0)                
        cntIdleTime=0
        cntUseTime=0
    if(len(nowState)>=3):
        compute=nowState[-3:]
        computeUse=compute.count(1)
        if(notificationState==1 and computeUse==3):
            notificationState=0
            nowState=[]
            if(client.connect()=="error"):
                savedata.write("IR",json.dumps(IR_MQTT(1)))
            else:
                client.publish("IR", json.dumps(IR_MQTT(1)))
            print("IR Topic 1")
    if(len(nowState)==30):
        computeThirtyUse=nowState.count(0)
        if(notificationState==0 and computeThirtyUse>=27 ):
            notificationState=1
            if(client.connect()=="error"):
                savedata.write("IR",json.dumps(IR_MQTT(0)))
            else:
                client.publish("IR", json.dumps(IR_MQTT(0)))
            print("IR Topic 0")
    print(userCardId)
    print(seatState)
    print(cntIdleTime)
    print(cntUseTime)
    print(nowState)

def wificonnect(client):
    sta = network.WLAN(network.STA_IF)
    print('connecting to network...')
    sta.active(True)
    sta.connect(wifi.ssid, wifi.password)
    print('network config:', sta.ifconfig())
    client.connect(False)
    while True:a
        ntptime.settime()
        if(sta.isconnected()):
            print("has wifi")
            try:
                detectsensor(client)
                client.check_msg()
                data=savedata.read()
                print(data)
                for i in data:
                    linedata=i.strip().split(',',1)
                    client.publish(linedata[0], linedata[1])
            except OSError as e:
                print("reconncting")
                client.connect(False)
                print("reconected")
        else:
            print("hasn't wifi")
            try:
                detectsensor(client)
                client.check_msg()
            except OSError as e:
                print("reconncting")
                client.connect(False)
                print("reconected")
        time.sleep(10)

wificonnect(client)