import socket
import json
import network
import ujson

MSG_FORMAT_JSON   = 'JSON'
MSG_FORMAT_STRING = 'STRING'

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
        data_type, raw_data = request.decode('utf-8').split('__')
        if data_type == MSG_FORMAT_STRING:
            print(raw_data)
        elif data_type == MSG_FORMAT_JSON:
            print(raw_data)
            print(type(raw_data))
            print(ujson.loads(raw_data))


class Client:
    def __init__(
            self,
            host='0.0.0.0',
            port=8000
    ):
        self.socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.socket.connect((host, port))
        print('Bound to {} on port {}'.format(host, port))

    def send_str(self, data):
        message = '{}__{}'.format(MSG_FORMAT_STRING, data)
        self.socket.sendall(message.encode('utf-8'))

    def send_json(self, data):
        message = json.dumps(data, sort_keys=True)
        message = '{}__{}'.format(MSG_FORMAT_JSON, data)
        self.socket.sendall(message.encode('utf-8'))
