import numpy as np
import cv2

from utilities import text


def generate_cross_fade(window_size, image_size, reverse=False):
    flat_slope_width = int((image_size - window_size) / 2)
    slope_start = flat_slope_width
    slope_end = image_size - flat_slope_width

    window = np.array([(i + 1) / window_size for i in range(0, window_size)])

    padding = window_size % 2
    zeros = np.zeros(padding + flat_slope_width)
    ones = np.ones(flat_slope_width)
    gradient = np.concatenate((zeros, window, ones), axis=0)
    gradient = np.flip(gradient) if reverse else gradient
    return gradient


def prepare_image(filename):
    image = cv2.imread(filename)
    image = cv2.cvtColor(image, cv2.COLOR_RGB2GRAY)
    return image


def cross_fade(filename_left, filename_right, filename_out, window_size):
    left_image = prepare_image(filename_left)
    right_image = prepare_image(filename_right)

    left_width, left_height = left_image.shape
    right_width, right_height = right_image.shape

    if left_height != left_width and right_height != right_width:
        raise ValueError("Doesn't support non square images. Meh.")

    if left_height != right_height and left_width != right_width:
        raise ValueError("Width and height of each image must be equal.")

    left_linear_weight = generate_cross_fade(
        window_size=window_size, image_size=left_width
    )
    right_linear_weight = generate_cross_fade(
        window_size=window_size, image_size=right_width, reverse=True
    )

    left_image = left_image * left_linear_weight
    right_image = right_image * right_linear_weight

    merged = left_image + right_image
    merged2 = text(merged, "Cross Fade")
    cv2.imwrite(filename_out, merged2)


cross_fade("./sample4.jpg", "./sample4.jpg", "./output.jpg", window_size=100)

