import usb_hid
from adafruit_hid.keyboard import Keyboard
from adafruit_hid.keyboard_layout_us import KeyboardLayoutUS
import time
import board
import digitalio
import adafruit_matrixkeypad
from adafruit_hid.keyboard import Keyboard
from adafruit_hid.keyboard_layout_us import KeyboardLayoutUS
from adafruit_hid.keycode import Keycode
from adafruit_hid.consumer_control import ConsumerControl
from adafruit_hid.consumer_control_code import ConsumerControlCode

kbd = Keyboard(usb_hid.devices)
layout = KeyboardLayoutUS(kbd)


time.sleep(1)  # Sleep for a bit to avoid a race condition on some systems

cols = [digitalio.DigitalInOut(x) for x in (board.D11, board.D12, board.D13)]
rows = [digitalio.DigitalInOut(x) for x in (board.D9, board.D10)]
keys = (
    (0,1,2),
    (3,4,5),
)
keypad = adafruit_matrixkeypad.Matrix_Keypad(rows, cols, keys)

Messages = [
    "ggwp",
    "glhf",
    "I'm playing for picks"
]

while True:
    keys = keypad.pressed_keys
    if keys:
        for key in keys:
            layout.write(Messages[key])
            layout.write('\n')
        time.sleep(0.1)
        