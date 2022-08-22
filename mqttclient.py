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
import config
import ntptime
client = MQTTClient('umqtt_client',config.PROD_SERVER,config.MQTT_PORT,config.MQTT_USER_NAME,config.MQTT_USER_PASSWORD)
oldCard=""
cntSecondIdleTime=0
cntSecondUseTime=0
cntIdleTime=0
cntUseTime=0
notificationState=0
nowState=[]
def PN532_MQTT(cardId):
    now='%04d-%02d-%02d %02d:%02d:%02d' %(time.localtime()[0],time.localtime()[1],time.localtime()[2],time.localtime()[3],time.localtime()[4],time.localtime()[5])
    payload={'time':now,'cardId':cardId,'index':config.SEAT_INDEX}
    return payload

def LD_MQTT(seatState):
    now='%04d-%02d-%02d %02d:%02d:%02d' %(time.localtime()[0],time.localtime()[1],time.localtime()[2],time.localtime()[3],time.localtime()[4],time.localtime()[5])
    payload={'time':now,'seatUseState':seatState,'index':config.SEAT_INDEX}
    return payload
'''
def Error(sensorName):
    now='%04d-%02d-%02d %02d:%02d:%02d' %(time.localtime()[0],time.localtime()[1],time.localtime()[2],time.localtime()[3],time.localtime()[4],time.localtime()[5])
    payload={'time':now,'errorMessage':"sensor error",'sensorName':sensorName,'index':config.SEAT_INDEX}
    return payload
'''
def Detectsensor(client):
    global cntUseTime,cntIdleTime,notificationState,nowState,oldCard,cntSecondIdleTime,cntSecondUseTime
    client.connect(False)
    (userCardId,useStat)=readPn532.readPn532()
    seatState=ldSensor.ld_state()
    if(seatState):
        cntSecondUseTime=cntSecondUseTime+1
    else:
        cntSecondIdleTime=cntSecondIdleTime+1
    '''
    if(useStat==2):
        if(client.connect()=="error"):
            savedata.deleteRepeat("Error,")
            savedata.write("Error",json.dumps(Error("PN532")))
        else:
            client.publish("Error", json.dumps(Error("PN532")))
        oldCard=""
        cntSecondIdleTime=0
        cntSecondUseTime=0
        cntIdleTime=0
        cntUseTime=0
        notificationState=0
        nowState=[]
        print("Error Topic")
    '''
    if(useStat==0):
        if(oldCard!=userCardId):
            nowState=[]
            notificationState=0
            if(client.connect()=="error"):
                savedata.deleteRepeat("PN532,")
                savedata.write("PN532",json.dumps(PN532_MQTT(userCardId)))
            else:
                client.publish("PN532", json.dumps(PN532_MQTT(userCardId)))
            print("PN532 Topic")
            oldCard=userCardId
    if((cntSecondUseTime+cntSecondIdleTime)==10):
        if(cntSecondUseTime>4):
            cntUseTime=cntUseTime+1
        else:
            cntIdleTime=cntIdleTime+1
        cntSecondUseTime=0
        cntSecondIdleTime=0
    if((cntUseTime+cntIdleTime)==6):
        if(len(nowState)==30):
            del nowState[0]
        if(cntUseTime>4):
            nowState.append(1)
        else:
            nowState.append(0)                
        cntIdleTime=0
        cntUseTime=0
    if(len(nowState)>=5):
        compute=nowState[-5:]
        computeUse=compute.count(1)
        if(notificationState==1 and computeUse>=3):
            notificationState=0
            nowState=[]
            if(client.connect()=="error"):
                savedata.write("LD",json.dumps(LD_MQTT(1)))
            else:
                client.publish("LD", json.dumps(LD_MQTT(1)))
            print("LD Topic 1")
    if(len(nowState)==30):
        computeThirtyUse=nowState.count(0)
        if(notificationState==0 and computeThirtyUse>=27 ):
            notificationState=1
            if(client.connect()=="error"):
                savedata.write("LD",json.dumps(LD_MQTT(0)))
            else:
                client.publish("LD", json.dumps(LD_MQTT(0)))
            print("LD Topic 0")
    print(seatState)
    print(nowState)
def WifiConnect(client):
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
                    Detectsensor(client)
                    client.check_msg()
                    data=saveData.read()
                    for i in data:
                        linedata=i.strip().split(',',1)
                        client.publish(linedata[0], linedata[1])
                except OSError as e:
                    client.connect(False)
            else:
                try:
                    Detectsensor(client)
                    client.check_msg()
                except OSError as e:
                    client.connect(False)
            time.sleep(1)
        except:
            pass
WifiConnect(client)
