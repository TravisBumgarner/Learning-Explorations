import numpy as np
import cv2


def text(image, text):
    font = cv2.FONT_HERSHEY_SIMPLEX
    fontScale = 1
    fontColor = (255, 255, 255)
    lineType = 2
    width, height = image.shape
    image = cv2.putText(
        image, text, (0, height - 10), font, fontScale, fontColor, lineType
    )

    return image
