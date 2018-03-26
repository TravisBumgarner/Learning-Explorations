from config import ACTIVE_NETWORK_ESSID, ACTIVE_NETWORK_PASSWORD


def connect():
    import network
    sta_if = network.WLAN(network.STA_IF)
    if not sta_if.isconnected():
        print('connecting to network...')
        sta_if.active(True)
        sta_if.connect(ACTIVE_NETWORK_ESSID, ACTIVE_NETWORK_PASSWORD)
        while not sta_if.isconnected():
            pass
    print('network config:', sta_if.ifconfig())
