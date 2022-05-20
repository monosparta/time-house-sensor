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
    payload={'cardId':cardId,'index':5}
    return payload

def IR_MQTT(seatState):
    payload={'seatUseState':seatState,'index':4}
    return payload

def Exception_MQTT():
    payload={'seatUseState':1,'index':5}
    return payload

def Error(sensorName):
    payload={'errorMessage':"sensor error",'sensorName':sensorName,'index':5}
    return payload
# **************************************#
# Global variables and constants:
SERVER = '10.2.10.131'
client = MQTTClient('umqtt_client',SERVER,1883,'admin','admin')
UPDATE_TIME_INTERVAL = 10000 # in ms unit
last_update = time.ticks_ms()
oldCard="" #
cntIdleTime=0
cntUseTime=0
notificationState=0
nowState=[]

# **************************************#
# Main loop:
while True:
    if time.ticks_ms() - last_update >= UPDATE_TIME_INTERVAL:
        (userCardId,UseStat)=readrfid.rfid_id()
        seatState=infrared.infrared_state()
        client.connect()
        if(seatState):
            cntUseTime=cntUseTime+1
        else:
            cntIdleTime=cntIdleTime+1
        if(UseStat==2):
            client.publish("Error", json.dumps(Error("RFID")))
            print("Error Topic")
        #elif(UseStat==1):
            #if(len(nowState)>=3):
                #cntUseTimes=0
                #compute=nowState[-3:]
                #computeUse=compute.count(1)
                #if(computeUse==3):
                    #client.publish("Exception", json.dumps(Exception_MQTT()))
                    #print("Exception Topic")
        else:
            if(oldCard!=userCardId):
                nowState=[]
                client.publish("RFID", json.dumps(RFID_MQTT(userCardId)))
                print("RFID Topic")
                oldCard=userCardId
        if((cntUseTime+cntIdleTime)==6):
            if(len(nowState)==2):
                del nowState[0]
            if(cntUseTime>4):
                nowState.append(1)
            else:
                nowState.append(0)                
            cntIdleTime=0
            cntUseTime=0
        if(len(nowState)==2):
            cntUseTimes=0
            compute=nowState[-2:]
            computeUse=compute.count(1)
            if(notificationState==1 and computeUse==2):
                notificationState=0
                nowState=[]
                client.publish("IR", json.dumps(IR_MQTT(1)))
                print("IR Topic 1")
        if(len(nowState)>=2):
            computeTen=nowState[-2:]
            computeTenUse=computeTen.count(0)
            if(computeTenUse>=1):
                #computeThirty=nowState
                #computeThirtyUse=computeThirty.count(0)
                if(notificationState==0 ):
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


