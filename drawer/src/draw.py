import os
from dotenv import load_dotenv
import requests
from PIL import ImageFont, ImageDraw, Image
from datetime import datetime, timezone, timedelta
import time

load_dotenv()

currentDir = os.path.dirname(__file__)
rawImgSourceDir = os.path.join(currentDir + "/../../backend/private/seats/")
basemapPath = rawImgSourceDir + "basemap-1200x728.png"
warningIconPath = rawImgSourceDir + "line-warning-35x31.png"
warningIcon = Image.open(warningIconPath)

imgDesDir = currentDir + "/../../backend/public/img/seats/"
seatsSelfProcessInfo = [
    {"rotation": 0},
    {"rotation": 0},
    {"rotation": 0},
    {"rotation": 0},
    {"rotation": 0},
    {"rotation": 180},
    {"rotation": 180},
    {"rotation": 180},
    {"rotation": 0},
    {"rotation": 0},
    {"rotation": 0}
]
seatsStateInfo = [
    {"fontColor": (255, 255, 255, 255)},
    {"fontColor": (255, 255, 255, 255)},
    {"fontColor": (0, 0, 0, 255)},
    {"fontColor": (255, 255, 255, 255)},
]

blackFontColor = (0, 0, 0, 255)
whiteFontColor = (255, 255, 255, 255)
font18Roboto = ImageFont.truetype(
    currentDir + "/Roboto/Roboto-Regular.ttf", 18)
font24Roboto = ImageFont.truetype(
    currentDir + "/Roboto/Roboto-Regular.ttf", 24)


# define static value of Seat
class Seat:
    error = -1
    using = 0
    available = 1
    idle = 2

    lineErrorSeat = Image.open(rawImgSourceDir + "line-error-160x98.png")
    lineUsingSeat = Image.open(rawImgSourceDir + "line-using-160x98.png")
    lineAvailableSeat = Image.open(
        rawImgSourceDir + "line-available-160x98.png")
    lineIdleSeat = Image.open(rawImgSourceDir + "line-idle-160x98.png")
    lineWarningIcon = Image.open(rawImgSourceDir + "line-warning-35x31.png")

    webErrorSeat = Image.open(rawImgSourceDir + "web-error-220x136.png")
    webUsingSeat = Image.open(rawImgSourceDir + "web-using-220x136.png")
    webAvailableSeat = Image.open(
        rawImgSourceDir + "web-available-220x136.png")
    webIdleSeat = Image.open(rawImgSourceDir + "web-idle-220x136.png")
    webWarningIcon = Image.open(rawImgSourceDir + "web-warning-46x41.png")


# draw the seats in web & line
def drawSeat(seat):
    lineSeat, webSeat = [], []
    if seat["state"] == Seat.error:
        lineSeat = Seat.lineErrorSeat.copy()
        webSeat = Seat.webErrorSeat.copy()
    elif seat["state"] == Seat.using:
        lineSeat = Seat.lineUsingSeat.copy()
        webSeat = Seat.webUsingSeat.copy()
    elif seat["state"] == Seat.available:
        lineSeat = Seat.lineAvailableSeat.copy()
        webSeat = Seat.webAvailableSeat.copy()
    else:
        lineSeat = Seat.lineIdleSeat.copy()
        webSeat = Seat.webIdleSeat.copy()
        
    lineSeat = lineSeat.rotate(seatsSelfProcessInfo[seat["id"]]["rotation"])
    webSeat = webSeat.rotate(seatsSelfProcessInfo[seat["id"]]["rotation"])

    lineSeatCanvas = ImageDraw.Draw(lineSeat)
    webSeatCanvas = ImageDraw.Draw(webSeat)

    if seat["state"] == Seat.idle:
        if not seatsSelfProcessInfo[seat["id"]]["rotation"]:
            lineSeat.paste(Seat.lineWarningIcon,
                           (63, 53), Seat.lineWarningIcon)
            webSeat.paste(Seat.webWarningIcon, (87, 75), Seat.webWarningIcon)
        else:
            lineSeat.paste(Seat.lineWarningIcon,
                           (63, 13), Seat.lineWarningIcon)
            webSeat.paste(Seat.webWarningIcon, (87, 19), Seat.webWarningIcon)
    else:
        if not seatsSelfProcessInfo[seat["id"]]["rotation"]:
            lineSeatCanvas.text(
                (70, 59), seat["no"], seatsStateInfo[seat["state"] + 1]["fontColor"], font18Roboto)
            webSeatCanvas.text(
                (95, 83), seat["no"], seatsStateInfo[seat["state"] + 1]["fontColor"], font24Roboto)
        else:
            lineSeatCanvas.text(
                (70, 19), seat["no"], seatsStateInfo[seat["state"] + 1]["fontColor"], font18Roboto)
            webSeatCanvas.text(
                (95, 26), seat["no"], seatsStateInfo[seat["state"] + 1]["fontColor"], font24Roboto)
    return lineSeat, webSeat


basemap = Image.open(basemapPath)
position = [(257, 92),  (443, 92),  (609, 92),  (785, 92),
            (443, 266), (609, 266), (785, 266),
            (443, 381), (609, 381), (785, 381)]
preSeatsState = []
curSeatsState = []

while True:
    try:
        response = requests.get(
            "http://" + os.getenv("EXPRESS_SERVER") + ":" + os.getenv("EXPRESS_PORT") + "/api/seatsInfo")
    except requests.exceptions.ConnectionError:
        continue

    try: 
        curSeatsState = response.json()["seats"]

        for i in range(len(curSeatsState)):
            if preSeatsState == [] or curSeatsState[i]["state"] != preSeatsState[i]["state"]:
                seat = curSeatsState[i]
                lineSeat, webSeat = drawSeat(seat)

                # just save web seat in backend/public/img/seats
                webSeat.save(imgDesDir + str(seat["id"]) + ".png")

                basemap.paste(lineSeat, (position[i][0], position[i][1]), lineSeat)

        basemapCanvas = ImageDraw.Draw(basemap)
        utcTime = datetime.utcnow()
        localTIme = utcTime.astimezone(timezone(timedelta(hours=8)))
        localTimeString = localTIme.strftime(
            "%Y/%m/%d %H:%M:%S").replace("-", "/")
        basemapCanvas.text((996, 682), localTimeString,
                        (0, 0, 0, 255), font18Roboto)
        basemap.save(imgDesDir + "seat_map.png")

        preSeatsState = curSeatsState
        preSeatsState = []
        time.sleep(1.39)
    except Exception as e:
        continue
