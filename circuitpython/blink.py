import board
import time
import digitalio

p13 = digitalio.DigitalInOut(board.D13)
p13.switch_to_output()

while True:
    p13.value = True
    time.sleep(1)
    p13.value = False
    time.sleep(1)