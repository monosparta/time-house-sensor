from machine import Pin
from utime import sleep_ms
def infrared_state():
    pir = Pin(9,Pin.IN)
    sleep_ms(50)
    return pir.value()
