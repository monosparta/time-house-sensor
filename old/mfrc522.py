from machine import Pin, SPI
from os import uname

class RC522:

    # PCD: Proximity Coupling Device (RC522 itself)
    PCD_IDLE            = 0x00
    PCD_AUTHENT         = 0x0E
#     PCD_RECEIVE         = 0x08
#     PCD_TRANSMIT        = 0x04
    PCD_TRANSCEIVE      = 0x0C
    PCD_RESETPHASE      = 0x0F
    PCD_CALCCRC         = 0x03

    # PICC: Proximity card （S50 card)
    PICC_REQIDL         = 0x26
    PICC_REQALL         = 0x52
    PICC_ANTICOLL       = 0x93
    PICC_SELECTTAG      = 0x93
    PICC_AUTHENT1A      = 0x60
    PICC_AUTHENT1B      = 0x61
    PICC_READ           = 0x30
    PICC_WRITE          = 0xA0
    PICC_DECREMENT      = 0xC0
    PICC_INCREMENT      = 0xC1
#     PICC_RESTORE        = 0xC2
    PICC_TRANSFER       = 0xB0
#     PICC_HALT           = 0x50

    OK       = 0
    NOTAGERR = 1
    ERR      = 2

    # RC522's registers addresses
#     Reserved00          = 0x00
    CommandReg          = 0x01
    CommIEnReg          = 0x02
#     DivlEnReg           = 0x03
    CommIrqReg          = 0x04
    DivIrqReg           = 0x05
    ErrorReg            = 0x06
#     Status1Reg          = 0x07
    Status2Reg          = 0x08
    FIFODataReg         = 0x09
    FIFOLevelReg        = 0x0A
#     WaterLevelReg       = 0x0B
    ControlReg          = 0x0C
    BitFramingReg       = 0x0D
#     CollReg             = 0x0E
#     Reserved01          = 0x0F

#     Reserved10          = 0x10
    ModeReg             = 0x11
#     TxModeReg           = 0x12
#     RxModeReg           = 0x13
    TxControlReg        = 0x14
    TxAutoReg           = 0x15
#     TxSelReg            = 0x16
#     RxSelReg            = 0x17
#     RxThresholdReg      = 0x18
#     DemodReg            = 0x19
#     Reserved11          = 0x1A
#     Reserved12          = 0x1B
#     MifareReg           = 0x1C
#     Reserved13          = 0x1D
#     Reserved14          = 0x1E
#     SerialSpeedReg      = 0x1F

#     Reserved20          = 0x20
    CRCResultRegM       = 0x21
    CRCResultRegL       = 0x22
#     Reserved21          = 0x23
#     ModWidthReg         = 0x24
#     Reserved22          = 0x25
#     RFCfgReg            = 0x26
#     GsNReg              = 0x27
#     CWGsPReg            = 0x28
#     ModGsPReg           = 0x29
    TModeReg            = 0x2A
    TPrescalerReg       = 0x2B
    TReloadRegH         = 0x2C
    TReloadRegL         = 0x2D
#     TCounterValueRegH   = 0x2E
#     TCounterValueRegL   = 0x2F

#     Reserved30          = 0x30
#     TestSel1Reg         = 0x31
#     TestSel2Reg         = 0x32
#     TestPinEnReg        = 0x33
#     TestPinValueReg     = 0x34
#     TestBusReg          = 0x35
#     AutoTestReg         = 0x36
#     VersionReg          = 0x37
#     AnalogTestReg       = 0x38
#     TestDAC1Reg         = 0x39
#     TestDAC2Reg         = 0x3A
#     TestADCReg          = 0x3B
#     Reserved31          = 0x3C
#     Reserved32          = 0x3D
#     Reserved33          = 0x3E
#     Reserved34          = 0x3F

    def __init__(self, sck, mosi, miso, rst, cs):

        self.sck = Pin(sck, Pin.OUT)
        self.mosi = Pin(mosi, Pin.OUT)
        self.miso = Pin(miso)
        self.rst = Pin(rst, Pin.OUT)
        self.cs = Pin(cs, Pin.OUT)

        self.rst.value(0)
        self.cs.value(1)

        board = uname()[0]

        if board == 'WiPy' or board == 'LoPy' or board == 'FiPy':
            self.spi = SPI(0)
            self.spi.init(SPI.MASTER, baudrate=1000000, pins=(self.sck, self.mosi, self.miso))
        elif board == 'esp8266':
            self.spi = SPI(baudrate=100000, polarity=0, phase=0, sck=self.sck, mosi=self.mosi, miso=self.miso)
            self.spi.init()
        else:
            raise RuntimeError("Unsupported platform")

        self.rst.value(1)
        self.init()

    def _wreg(self, reg, val):
        '''
        Write a register of RC522
        reg is the address of the register you wish to write
        val is the value you wish to write to reg
        '''
        self.cs.value(0)
        self.spi.write(b'%c' % int(0xff & ((reg << 1) & 0x7e)))
        self.spi.write(b'%c' % int(0xff & val))
        self.cs.value(1)

    def _rreg(self, reg):
        '''
        Read a register of RC522
        reg is the address of the register you wish to read
        '''

        self.cs.value(0)
        self.spi.write(b'%c' % int(0xff & (((reg << 1) & 0x7e) | 0x80)))
        val = self.spi.read(1)
        self.cs.value(1)

        return val[0]

    def _sflags(self, reg, mask):
        '''
        Set some bits to 1 for a register.
        '''
        self._wreg(reg, self._rreg(reg) | mask)

    def _cflags(self, reg, mask):
        '''
        Set some bits to 0 for a register.
        '''
        self._wreg(reg, self._rreg(reg) & (~mask))

    def _tocard(self, cmd, send):
        '''
        Send information to CARD via RC522
        '''

        recv = []
        bits = irq_en = wait_irq = n = 0
        stat = self.ERR

        if cmd == self.PCD_AUTHENT:   # 0x0E  验证密钥
            irq_en = 0x12     # 0001 0010
            wait_irq = 0x10   # 0001 0000
        elif cmd == self.PCD_TRANSCEIVE:   # 0x0C  发送并接收数据
            irq_en = 0x77     # 0111 0111
            wait_irq = 0x30   # 0011 0000

        self._wreg(self.CommIEnReg, irq_en | 0x80)
        self._cflags(self.CommIrqReg, 0x80)
        self._wreg(self.CommandReg, self.PCD_IDLE)
        self._sflags(self.FIFOLevelReg, 0x80)
        
        for c in send:
            self._wreg(self.FIFODataReg, c)
        self._wreg(self.CommandReg, cmd)

        if cmd == self.PCD_TRANSCEIVE:
            self._sflags(self.BitFramingReg, 0x80)

        i = 2000
        while True:
            n = self._rreg(self.CommIrqReg)             
            i -= 1
#             if ~((i != 0) and ~(n & 0x01) and ~(n & wait_irq)):
            if not ((i != 0) and (not (n & 0x01)) and (not (n & wait_irq))):
                break
        
        self._cflags(self.BitFramingReg, 0x80)
        
        if i != 0:
            
            if (self._rreg(self.ErrorReg) & 0x1B) == 0x00:
                
                stat = self.OK

                if n & irq_en & 0x01:
                    stat = self.NOTAGERR
                elif cmd == self.PCD_TRANSCEIVE:
                    n = self._rreg(self.FIFOLevelReg)
                    lbits = self._rreg(self.ControlReg) & 0x07
                    if lbits != 0:
                        bits = (n - 1) * 8 + lbits
                    else:
                        bits = n * 8

                    if n == 0:
                        n = 1
                    elif n > 16:
                        n = 16

                    for _ in range(n):
                        recv.append(self._rreg(self.FIFODataReg))
            else:
                stat = self.ERR
        
        self._sflags(self.ControlReg, 0x80)
        self._wreg(self.CommandReg, self.PCD_IDLE)

        return stat, recv, bits

    def _crc(self, data):
        '''
        Use RC522 to calculate CRC16
        '''

        self._cflags(self.DivIrqReg, 0x04)
        self._sflags(self.FIFOLevelReg, 0x80)

        for c in data:
            self._wreg(self.FIFODataReg, c)

        self._wreg(self.CommandReg, self.PCD_CALCCRC)

        i = 0xFF
        while True:
            n = self._rreg(self.DivIrqReg)
            i -= 1
            if not ((i != 0) and not (n & 0x04)):
                break

        return [self._rreg(self.CRCResultRegL), self._rreg(self.CRCResultRegM)]

    def init(self):
        self.reset()
        self._wreg(self.TModeReg, 0x8D)
        self._wreg(self.TPrescalerReg, 0x3E)
        self._wreg(self.TReloadRegL, 30)
        self._wreg(self.TReloadRegH, 0)
        self._wreg(self.TxAutoReg, 0x40)
        self._wreg(self.ModeReg, 0x3D)
        self.antenna_on()

    def reset(self):
        self._wreg(self.CommandReg, self.PCD_RESETPHASE)

    def antenna_on(self, on=True):
        if on and ~(self._rreg(self.TxControlReg) & 0x03):
            self._sflags(self.TxControlReg, 0x03)
        else:
            self._cflags(self.TxControlReg, 0x03)

    def request(self, mode, for_using = 0):

        self._wreg(self.BitFramingReg, 0x07)
        (stat, recv, bits) = self._tocard(self.PCD_TRANSCEIVE, [mode])
        
        if for_using == 1:
            return stat, bits
        
        if (stat != self.OK) | (bits != 0x10):
            stat = self.ERR

        return stat, bits

    def anticoll(self):

        ser_chk = 0
        ser = [self.PICC_ANTICOLL, 0x20]

        self._wreg(self.BitFramingReg, 0x00)
        (stat, recv, bits) = self._tocard(self.PCD_TRANSCEIVE, ser)

        if stat == self.OK:
            if len(recv) == 5:
                for i in range(4):
                    ser_chk = ser_chk ^ recv[i]
                if ser_chk != recv[4]:
                    stat = self.ERR
            else:
                stat = self.ERR

        return stat, recv

    def select_tag(self, ser):
        buf = [self.PICC_SELECTTAG, 0x70] + ser[:5]
        buf += self._crc(buf)
        (stat, recv, bits) = self._tocard(self.PCD_TRANSCEIVE, buf)
        return self.OK if (stat == self.OK) and (bits == 0x18) else self.ERR

    def auth(self, mode, addr, keyA, keyB, ser):
        if mode == self.PICC_AUTHENT1A:
            sect = keyA
        elif mode == self.PICC_AUTHENT1B:
            sect = keyB
        else:
            print('Wrong authentication mode!')
            return self.ERR
        return self._tocard(self.PCD_AUTHENT, [mode, addr] + list(sect) + ser[:4])[0]

    def stop_crypto1(self):
        self._cflags(self.Status2Reg, 0x08)

    def read(self, addr):
        data = [self.PICC_READ, addr]
        data += self._crc(data)
        (stat, recv, _) = self._tocard(self.PCD_TRANSCEIVE, data)
        return recv if stat == self.OK else None

    def write(self, addr, data):

        buf = [self.PICC_WRITE, addr]
        buf += self._crc(buf)
        (stat, recv, bits) = self._tocard(self.PCD_TRANSCEIVE, buf)

        if not (stat == self.OK) or not (bits == 4) or not ((recv[0] & 0x0F) == 0x0A):
            stat = self.ERR
        else:
            buf = []
            for i in range(len(data)):
                buf.append(data[i])
            buf += self._crc(buf)
            (stat, recv, bits) = self._tocard(self.PCD_TRANSCEIVE, buf)
            if not (stat == self.OK) or not (bits == 4) or not ((recv[0] & 0x0F) == 0x0A):
                stat = self.ERR

        return stat

    def value(self, mode, addr, data):
        '''
        increment or decrement a block
        mode = 'increment' or 'decrement'
        addr is the block index of the E-Wallet
        data is just the value you want to increment or decrement, LSB comes first
        '''
        
        
        if mode == 'increment':
            mode = self.PICC_INCREMENT
        elif mode == 'decrement':
            mode = self.PICC_DECREMENT

        buf = [mode, addr]
        buf += self._crc(buf)
        (stat, recv, bits) = self._tocard(self.PCD_TRANSCEIVE, buf)

        if not (stat == self.OK) or not (bits == 4) or not ((recv[0] & 0x0F) == 0x0A):
            stat = self.ERR

        if stat == self.OK:
            buf = []
            for i in range(len(data)):
                buf.append(data[i])
            buf += self._crc(buf)
            (stat, recv, bits) = self._tocard(self.PCD_TRANSCEIVE, buf)
        
            if stat != self.ERR:
                stat = self.OK


        if stat == self.OK:
            buf = [self.PICC_TRANSFER, addr]
            buf += self._crc(buf)
            (stat, recv, bits) = self._tocard(self.PCD_TRANSCEIVE, buf)
            
            if not (stat == self.OK) or not (bits == 4) or not ((recv[0] & 0x0F) == 0x0A):
                stat = self.ERR

        return stat

