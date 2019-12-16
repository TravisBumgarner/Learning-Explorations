import numpy as np
import cv2
from matplotlib import pyplot as plt

img = cv2.imread('sample.jpg', 0)

def bucketColors(matrix, distinctColorCount):
    bucket_segments = 255 / distinctColorCount
    matrix = np.rint(np.divide(matrix, bucket_segments))
    return matrix.astype(np.uint8)
    # Not fully typed out. Need to figure out how to convert colors. 

def map_color(value):
    gameboy = [
        np.array([15,56,15]), #'0f380f' Black
        np.array([48,246,35]), #'30f6230' Dark Gray
        np.array([139,172,15]), #'8bac0f' Light Gray
        np.array([155,188,15]) # '9bbc0f' White
    ] 
    return gameboy[value]

colorized_array = np.array([])

buckets = bucketColors(img, 3)

mod_bucket = []
for row in buckets:
    mod_row = []
    for cell in row:
        mod_row.append(map_color(cell))
    mod_bucket.append(np.array(mod_row))



cv2.imshow('image', np.array(mod_bucket).astype(np.uint8))
cv2.waitKey(0)
cv2.destroyAllWindows()