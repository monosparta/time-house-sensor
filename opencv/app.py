import cv2
import numpy as np

def detectFace(img):
    filename = img.split(".")[0] # 取得檔案名稱(不添加副檔名)
    img = cv2.imread(img) # 讀取圖檔
    width=int(img.shape[1]/4)
    height= int(img.shape[0]/3)
    newimage=np.array(img)  
    #cv2.rectangle(img, (x, y), (x + h, y + w), color, 2)
    for row in range(3):
        for col in range(4):
            x=(col+1)*width-307
            y=(row+1)*height-295
            cv2.rectangle(newimage, (x,y), (x+307,y+295), (0, 255, 0), 2)
    print(width,height)

    cv2.imwrite(filename + "_face.png", newimage)
detectFace('seat.png')