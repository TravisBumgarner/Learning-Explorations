import numpy as np
import cv2
from matplotlib import pyplot as plt
from numba import njit

img = cv2.imread('sample.jpg', 1)

LOOK_UP_TABLE = np.array([i for i in range(0,256)])
if(len(LOOK_UP_TABLE) != 256):
    raise ValueError()



def bucketColors(matrix, distinctColorCount):
    bucket_segments = 255 / distinctColorCount
    matrix = np.rint(np.divide(matrix, bucket_segments))
    return matrix.astype(np.uint8)
    # Not fully typed out. Need to figure out how to convert colors. 

buckets = bucketColors(img, 3)



# @njit
# def colorize_buckets(buckets):
#     gameboy = [
#         np.array([15,56,15]), #'0f380f' Black
#         np.array([48,246,35]), #'30f6230' Dark Gray
#         np.array([139,172,15]), #'8bac0f' Light Gray
#         np.array([155,188,15]) # '9bbc0f' White
#     ] 

#     buckets_colorized = []
#     for row in buckets:
#         mod_row = []
#         for cell in row:
#             mod_row.append(gameboy[cell])
#         buckets_colorized.append(mod_row)
#     return buckets_colorized

buckets_colorized = colorize_buckets(buckets)

cv2.imshow('image', buckets_colorized)
cv2.waitKey(0)
cv2.destroyAllWindows()

