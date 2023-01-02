import numpy as np
import cv2

from utilities import text


def edge_detection(filename_input, filename_output, edge_threshold):
    image = cv2.imread(filename_input, 0)
    image_width, image_height = image.shape

    y = np.zeros((image_width - 1, image_height))
    for row_index in range(0, len(image) - 1):
        y[row_index] = image[row_index + 1, :] - image[row_index, :]

    x = np.zeros((image_width, image_height - 1)).T
    for column_index in range(0, len(image) - 1):
        x[column_index] = image[:, column_index + 1] - image[:, column_index]

    x = x.T
    x_width, x_height = x.shape
    y_width, y_height = y.shape

    output_width = min(x_width, y_width)
    output_height = min(x_height, y_height)

    subset_y = y[0:output_width, 0:output_height]
    subset_x = x[0:output_width, 0:output_height]

    magnitude = (subset_x ** 2 + subset_y ** 2) ** 0.5
    magnitude = np.where(magnitude > edge_threshold, 0, 255).astype(int)
    magnitude = text(magnitude, "Edge Detection")
    cv2.imwrite(filename_output, magnitude)


edge_detection("./sample4.jpg", "./output.jpg", edge_threshold=5)

