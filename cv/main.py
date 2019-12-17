import numpy as np
import cv2
from matplotlib import pyplot as plt
from imutils.video import VideoStream
import imutils
import time

def bucketColors(matrix, distinctColorCount):
    bucket_segments = 255 / distinctColorCount
    matrix = np.rint(np.divide(matrix, bucket_segments))
    return matrix.astype(np.uint8)
    # Not fully typed out. Need to figure out how to convert colors. 

vs = VideoStream(src=0).start()

time.sleep(2)

WIDTH = 1000
HEIGHT = 667

while True:
    # img = cv2.imread('sample.jpg', 0)
    img = vs.read()
    img = imutils.resize(img, height=HEIGHT, width=WIDTH)
    img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    grayscale_buckets = bucketColors(img, 3)
    color_buckets = grayscale_buckets[:, :, np.newaxis] * np.ones((562, 1000,3)).astype(np.uint8)

    color_buckets = np.where(color_buckets == [0,0,0], np.array([155,188,15]),color_buckets)
    color_buckets = np.where(color_buckets == [1,1,1], np.array([48,246,35]),color_buckets)
    color_buckets = np.where(color_buckets == [2,2,2], np.array([139,172,15]),color_buckets)
    color_buckets = np.where(color_buckets == [3,3,3], np.array([15,56,15]),color_buckets)
    cv2.imshow('image', color_buckets.astype(np.uint8))
    key = cv2.waitKey(1) & 0xFF
    if key == 27:
        break
cv2.destroyAllWindows()

