import time
import pyautogui
import random

while(True):
    pyautogui.typewrite('b')
    time.sleep(random.random())
    pyautogui.press('backspace')
    time.sleep(random.random())

    if(random.random() > 0.95):
        time.sleep(random.random()* 60)

