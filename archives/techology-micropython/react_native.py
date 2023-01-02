import socket
import ujson
import network
from machine import Pin
from time import sleep



def blink(blink_count):
    p0 = Pin(0, Pin.OUT)
    for i in range(0, blink_count):
        p0.value(1)
        sleep(0.1)
        p0.value(0)
        sleep(0.1)


# Server only runs on esp2866
class Server:

    def __init__(
            self,
            host='',  # Empty string so we can receive requests from other computers, use 0.0.0.0 for localhost
            desired_port=8000,
            max_listen_queue=5
    ):

        self.socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

        is_no_port = True
        while is_no_port:
            try:
                self.socket.bind((host, desired_port))
                is_no_port = False
                if not host:
                    sta_if = network.WLAN(network.STA_IF)
                    host = sta_if.ifconfig()[0]
                print('Bound to {} on port {}'.format(host, desired_port))

            except OSError:
                desired_port += 1

        self.socket.listen(max_listen_queue)
        self.listen()

    def listen(self):
        print('Listening...')
        while True:
            try:
                conn, addr = self.socket.accept()
                print('Connection received from {}'.format(addr))

                while True:
                    request = conn.recv(1024)
                    if request:
                        print('Request Received {}'.format(request))
                        self.process_request(request)

            finally:
                conn.close()
                self.socket.close()

    def process_request(self, request):
        data = request.decode('utf-8').split('\r\n')
        if data[0] == 'POST / HTTP/1.1':
            print(data[-1])
            post_data = ujson.loads(data[-1])
            print(type(post_data))
            print(post_data)
            print(post_data['blink_count'])
            blink(int(post_data['blink_count']))



