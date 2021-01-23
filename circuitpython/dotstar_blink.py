import board
import time
import digitalio
import adafruit_dotstar

dots = adafruit_dotstar.DotStar(board.APA102_SCK, board.APA102_MOSI, 1, brightness=0.5)
print(dots)
while True:
    dots[0] = (255,255,255,0.2)
    time.sleep(1)
    dots[0] = (0,0,0)
    time.sleep(1)
    


