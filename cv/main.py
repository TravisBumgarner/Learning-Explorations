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

WIDTH = 200
HEIGHT = 112

FRAMES_TO_COUNT = 60
counter = 0
while True:
    if counter == 0:
        start = time.time()
    
    img = vs.read()
    img = imutils.resize(img, height=HEIGHT, width=WIDTH)
    img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    grayscale_buckets = bucketColors(img, 3)
    color_buckets = grayscale_buckets[:, :, np.newaxis] * np.ones((HEIGHT, WIDTH,3)).astype(np.uint8)

    color_buckets = np.where(color_buckets == [0,0,0], np.array([155,188,15]),color_buckets)
    color_buckets = np.where(color_buckets == [1,1,1], np.array([48,246,35]),color_buckets)
    color_buckets = np.where(color_buckets == [2,2,2], np.array([139,172,15]),color_buckets)
    color_buckets = np.where(color_buckets == [3,3,3], np.array([15,56,15]),color_buckets)
    color_buckets = color_buckets.astype(np.uint8)

    # pixel_map = np.array([np.array([15,56,15]), #'0f380f' Black
    #     np.array([48,246,35]), #'30f6230' Dark Gray
    #     np.array([139,172,15]), #'8bac0f' Light Gray
    #     np.array([155,188,15])]) # '9bbc0f' White
    
    # color_buckets = np.take(pixel_map, grayscale_buckets, axis=0).astype(np.uint8)

    img = imutils.resize(color_buckets, height=HEIGHT * 5, width=WIDTH * 5)
    cv2.imshow('image', img)
    key = cv2.waitKey(1) & 0xFF
    if key == 27:
        break

    counter += 1
    if counter == FRAMES_TO_COUNT:
        end = time.time()
        print(f'{FRAMES_TO_COUNT} frames took {end-start}s, or {FRAMES_TO_COUNT / (end-start)} FPS')
        counter = 0

cv2.destroyAllWindows()

