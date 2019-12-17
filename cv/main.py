import numpy as np
import cv2
from matplotlib import pyplot as plt

img = cv2.imread('sample.jpg', 0)

LOOK_UP_TABLE = np.array([i for i in range(0,256)])
if(len(LOOK_UP_TABLE) != 256):
    raise ValueError()

#         np.array([15,56,15]), #'0f380f' Black
        # np.array([48,246,35]), #'30f6230' Dark Gray
        # np.array([139,172,15]), #'8bac0f' Light Gray
        # np.array([155,188,15]) # '9bbc0f' White

def bucketColors(matrix, distinctColorCount):
    bucket_segments = 255 / distinctColorCount
    matrix = np.rint(np.divide(matrix, bucket_segments))
    return matrix.astype(np.uint8)
    # Not fully typed out. Need to figure out how to convert colors. 

grayscale_buckets = bucketColors(img, 3)
color_buckets = grayscale_buck`ets[:, :, np.newaxis] * np.ones((667, 1000,3)).astype(np.uint8)

color_buckets = np.where(color_buckets == [0,0,0], np.array([155,188,15]),color_buckets)
color_buckets = np.where(color_buckets == [1,1,1], np.array([48,246,35]),color_buckets)
color_buckets = np.where(color_buckets == [2,2,2], np.array([139,172,15]),color_buckets)
color_buckets = np.where(color_buckets == [3,3,3], np.array([15,56,15]),color_buckets)
cv2.imshow('image', color_buckets.astype(np.uint8))
cv2.waitKey(0)
cv2.destroyAllWindows()

