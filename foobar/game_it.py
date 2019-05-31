from time import sleep
from pyautogui import typewrite, press 
from random import random

while(True):
    typewrite('b')
    sleep(random())
    press('backspace')
    sleep(random())

    if(random() > 0.95):
        time.sleep(random() * 60)