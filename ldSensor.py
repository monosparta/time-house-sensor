from machine import UART
from utime import sleep_ms
uart=UART(2,115200)
uart.init(115200,bits=8,parity=None,stop=1)
uart.write(b'\x55\x5a\x02\xD3\x84')
def ld_state():
    ldData=uart.readline(uart.any())
    sleep_ms(50)
    ldData=ldData.decode("UTF-8")
    ldData=ldData.strip()
    print("LD")
    try:
        if(ldData==""):
            return 0
        else:
            ldStrength=ldData.split(",")
            print(ldStrength)
            ldStrength=ldStrength[1].split(" ")
            if((int(ldStrength[2]))>1000):
                return 1
            else:
                return 0
    except:
        return 0

        
