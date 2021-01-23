import time
import board
import digitalio
import adafruit_matrixkeypad
import usb_hid
from adafruit_hid.keyboard import Keyboard
from adafruit_hid.keyboard_layout_us import KeyboardLayoutUS
import adafruit_dotstar

time.sleep(1)  # Sleep for a bit to avoid a race condition on some systems

dot = adafruit_dotstar.DotStar(board.APA102_SCK, board.APA102_MOSI, 1, brightness=0.5)

def change_color(value):
    dot[0] = value          

cols = [digitalio.DigitalInOut(x) for x in (board.D11, board.D12, board.D13)]
rows = [digitalio.DigitalInOut(x) for x in (board.D9, board.D10)]
keys = (
    (0,1,2),
    (3,4,5),
)
keypad = adafruit_matrixkeypad.Matrix_Keypad(rows, cols, keys)

COLORS = [
    (255,   0,   0),
    (  0, 255,   0),
    (  0,   0, 255),
    (255,   0, 255),
    (  0, 255, 255),
    (255, 255,   0),
    (255, 255, 255),
    (  0,   0,   0)
]

all_six_counter = 0
while True:
    was_all_six = False    
    keys = keypad.pressed_keys
    print("counter", all_six_counter, "keys", keys)
    if len(keys) > 0:
        if len(keys) == 6:
            if all_six_counter >= 100:
                dot[0] = COLORS[7]
            else:
                dot[0] = COLORS[6]
            was_all_six = True
            all_six_counter += 1
        else:
            for key in keys:
                dot[0] = COLORS[key]
            was_all_six = False
            all_six_counter = 0