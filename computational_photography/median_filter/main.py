import numpy as np
import cv2

filename = 'sample'

image = cv2.imread(f'./{filename}.jpeg', 0)
image[1,2] = 90
image[3,1] = 90
print(image)

def get_average_pixel(image):
    average = int(np.sum(image, axis=None) / image.size)
    return average


def get_median_pixel(image):
    vector = np.copy(image)
    vector.resize(1, vector.size)
    vector.sort()
    return vector[0][int(vector.size / 2)]
    

def kernal_image(image, kernal_size, mode='average'):
    if(mode == 'average'):
        process_kernal = get_average_pixel
    elif(mode == 'median'):
        process_kernal = get_median_pixel
    else:
        raise KeyError('That processing method does not exist.')

    width, height = image.shape
    kernal_image = np.zeros((width + kernal_size * 2, height + kernal_size * 2))
    kernal_image[kernal_size:kernal_size+width,kernal_size:kernal_size + height] = image
    for i in range(kernal_size, width + kernal_size):
        for j in range(kernal_size, height + kernal_size):
            min_x = i-kernal_size
            max_x = i+kernal_size+1
            min_y = j-kernal_size
            max_y = j+kernal_size+1
            kernal = kernal_image[min_x:max_x, min_y:max_y]
            kernal_image[i,j] = process_kernal(kernal)
    return kernal_image[kernal_size:kernal_size+width,kernal_size:kernal_size + height].astype(int)


KERNAL_SIZE = 1
MODE = 'median'
processed_image = kernal_image(image, KERNAL_SIZE, MODE)
print(processed_image)
cv2.imwrite(f'./{filename}_{MODE}.jpeg', processed_image)