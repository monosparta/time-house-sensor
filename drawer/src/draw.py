import os
import requests
from PIL import ImageFont, ImageDraw, Image
from datetime import datetime, timezone, timedelta
import time

currentDir = os.path.dirname(__file__)

rawImgSourceDir = os.path.join(currentDir + "/../private/seats/")
basemapPath = rawImgSourceDir + "basemap-1200x728.png"
warningIconPath = rawImgSourceDir + "warningIcon.png"
warningIcon = Image.open(warningIconPath)

imgDesDir = currentDir + "/../public/img/seats/"
seatsSelfProcessInfo = [
    {"no": None, "rotation": 0},
    {"no": "A1", "rotation": 180},
    {"no": "A2", "rotation": 180},
    {"no": "A3", "rotation": 180},
    {"no": "A4", "rotation": 180},
    {"no": "B1", "rotation": 0},
    {"no": "B2", "rotation": 0},
    {"no": "B3", "rotation": 0},
    {"no": "C1", "rotation": 180},
    {"no": "C2", "rotation": 180},
    {"no": "C3", "rotation": 180}
]
seatsStateInfo = [
    {"path": rawImgSourceDir + "errorSeat-130x130.png",
        "fontColor": (255, 255, 255, 255)},
    {"path": rawImgSourceDir + "usingSeat-130x130.png",
        "fontColor": (255, 255, 255, 255)},
    {"path": rawImgSourceDir + "canUseSeat-130x130.png",
        "fontColor": (0, 0, 0, 255)},
    {"path": rawImgSourceDir + "idleSeat-130x130.png",
        "fontColor": (255, 255, 255, 255)},
]
fontType = ImageFont.truetype(currentDir + "/Roboto/Roboto-Regular.ttf", 18)

seats = []


def drawSeatMapForGeneralLineMember():
    position = [(252, 77), (440, 77), (629, 77), (818, 77),
                (440, 274), (629, 274), (818, 274),
                (440, 381), (629, 381), (818, 381)]
    basemap = Image.open(basemapPath)
    for seat in seats:
        id, state = seat["id"], seat["state"]
        seatImg = Image.open(
            seatsStateInfo[state + 1 if state != 2 else 0+1]["path"])
        seatImg = seatImg.rotate(seatsSelfProcessInfo[id]["rotation"])
        canvas = ImageDraw.Draw(seatImg)
        if seatsSelfProcessInfo[id]["rotation"]:
            canvas.text(
                (55, 75), seatsSelfProcessInfo[id]["no"], seatsStateInfo[state + 1]["fontColor"], fontType)
        else:
            canvas.text(
                (55, 34), seatsSelfProcessInfo[id]["no"], seatsStateInfo[state + 1]["fontColor"], fontType)
        basemap.paste(seatImg, position[id-1], seatImg)

    basemapCanvas = ImageDraw.Draw(basemap)
    utcTime = datetime.utcnow()
    localTIme = utcTime.astimezone(timezone(timedelta(hours=8)))
    localTimeString = localTIme.strftime(
        "%Y/%m/%d %H:%M:%S").replace("-", "/")
    basemapCanvas.text((996, 682), localTimeString, (0, 0, 0, 255), fontType)
    basemap.save(imgDesDir + "seat_map.png")


def drawEachSeatForWeb():
    for seat in seats:
        id, state = seat["id"], seat["state"]
        img = Image.open(seatsStateInfo[state + 1]["path"])
        img = img.rotate(seatsSelfProcessInfo[id]["rotation"])
        canvas = ImageDraw.Draw(img)
        if state == 2:
            if seatsSelfProcessInfo[id]["rotation"]:
                img.paste(warningIcon, (48, 70), warningIcon)
            else:
                img.paste(warningIcon, (48, 29), warningIcon)
        elif seatsSelfProcessInfo[id]["rotation"]:
            canvas.text(
                (55, 75), seatsSelfProcessInfo[id]["no"], seatsStateInfo[state + 1]["fontColor"], fontType)
        else:
            canvas.text(
                (55, 34), seatsSelfProcessInfo[id]["no"], seatsStateInfo[state + 1]["fontColor"], fontType)
        img = img.resize((180, 180))
        img.save(imgDesDir + str(id) + ".png")


while True:
    try:
        response = requests.get(
            "http://" + os.getenv("EXPRESS_SERVER") + ":" + os.getenv("EXPRESS_PORT") + "/api/seatsInfo")
    except requests.exceptions.ConnectionError:
        continue
    seats = response.json()["seats"]

    drawEachSeatForWeb()
    drawSeatMapForGeneralLineMember()
    time.sleep(1.39)
