# Setup

1. `pip install -r requirements.txt`

# Helpful resources
- [Jetbrains plugin](https://blog.jetbrains.com/pycharm/2018/01/micropython-plugin-for-pycharm/) 
- [Tutorial](https://docs.micropython.org/en/latest/esp8266/esp8266/tutorial/intro.html)
- [Webrepl Repo](https://github.com/micropython/webrepl)

# Helpful Commands
- Setup
    - `esptool.py --port /dev/tty.SLAB_USBtoUART erase_flash`
    - `esptool.py --port /dev/tty.SLAB_USBtoUART --baud 460800 write_flash --flash_size=detect 0 .BIN_PATH`
        - try 115200 if 460800 doesn't work
- Connecting
    - `screen /dev/tty.SLAB_USBtoUART 115200`
- Keyboard shortuts
    - `ctrl + d` soft reset


# Serial
- GPIO1=TX
- GPIO3=RX¡

# webrepl
- Connect to device via wi-fi connection (network pw: `micropythoN` device pw: `happy123`)
- open `/webrepl/webrepl.html`
- code



# Python Modules

## os

- `os.mkdir('dir')`
- `os.remove('data.txt')`
- `os.listdir()`

## network
````
>>> import network
>>> sta_if = network.WLAN(network.STA_IF)
>>> ap_if = network.WLAN(network.AP_IF)

>>> sta_if.active()
False
>>> ap_if.active()
True

>>> sta_if.connect('<your ESSID>', '<your password>') # ESSID is human readable network name

>>> ap_if.ifconfig()
('192.168.4.1', '255.255.255.0', '192.168.4.1', '8.8.8.8')
```