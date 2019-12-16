import numpy as np
import cv2
from matplotlib import pyplot as plt

img = cv2.imread('sample.jpg', 1)

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
map_color_vectorized = np.vectorize(map_color)


buckets = bucketColors(img, 3)
matrix2 = map_color_vectorized(buckets)
print(type(buckets[0][0]))
# cv2.imwrite('color_img.jpg', matrix2)
# cv2.imshow('image', matrix2)
# cv2.waitKey(0)
# cv2.destroyAllWindows()