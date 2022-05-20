import mfrc522
from machine import Pin
def rfid_id():
    rfid =mfrc522.RC522(0,2,4,5,14)
    (stat,tag_type)=rfid.request(rfid.PICC_REQIDL, 1)
    uid=""
    if(stat==rfid.OK):
        (stat,raw_uid)=rfid.anticoll()
        if (stat==rfid.OK):
            # 8H10D
            uid="%02x%02x%02x%02x" % (raw_uid[3],raw_uid[2],raw_uid[1],raw_uid[0])
            uid=str(int(uid,16))
            for_len=10-len(uid)
            for i in range(for_len):
                uid="0"+uid
    print(uid,stat)
    return uid,stat


