# Dotstar

import board
import adafruit_dotstar
import time


dot = adafruit_dotstar.DotStar(board.APA102_SCK, board.APA102_MOSI, 1, brightness=0.5)

def change_color(value):
    dot[0] = value
    time.sleep(1)

while True:
    for a in (0,255):
        for b in (0,255):
            for c in (0,255):
                change_color((a,b,c))