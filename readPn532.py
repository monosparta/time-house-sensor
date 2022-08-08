import nfcPn532 as nfc
from machine import Pin, SPI
import time

spi = SPI(1, baudrate=1000000, sck=Pin(18), mosi=Pin(23), miso=Pin(19))
cs = Pin(5, Pin.OUT)
cs.on()
pn532 = nfc.PN532(spi,cs)
ic, ver, rev, support = pn532.get_firmware_version()
print('Found PN532 with firmware version: {0}.{1}'.format(ver, rev))
pn532.SAM_configuration()

def zfl(str, width):
    return '{:0>{w}}'.format(str, w=width)
def readPn532():
    print('Reading...')
    uid = pn532.read_passive_target(timeout=500)
    if uid is None:
        return (uid,1)
    else:
        uidCard=[]
        uidIndex=0
        for i in uid:
            hexCard=zfl(hex(i)[2:], 2)
            uidCard.insert(0,hexCard)
            uidIndex+=1
            if(uidIndex==4):break
        uidCard=zfl(int("".join(uidCard),16), 10)
        return (uidCard,0)