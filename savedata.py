import os
import json

def write(topic,payload):
    f=open("temporarydata.txt","a")
    f.write("{},{}\n".format(topic,payload))
    f.close()
def read():
    data=""
    f=open("temporarydata.txt","r")
    data=f.readlines()
    f.close()
    f=open("temporarydata.txt","w")
    f.close()
    return data;
def deleteRepeat(topic):
    lineList=[]
    f=open("temporarydata.txt","r")
    while True:
        line=f.readline()
        if not line:
            print("EOF")
            break;
        elif topic in line:
            pass
        else:
            lineList.append(line)
    f.close()
    f=open("temporarydata.txt","w")
    for i in lineList:
        f.write(i)
    f.close()

