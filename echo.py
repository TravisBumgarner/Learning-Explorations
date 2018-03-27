import socket
import network


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

    def listen(self):
        print('Listening...')
        while True:
            try:
                conn, addr = self.socket.accept()
                print('Connection received from {}'.format(addr))

                while True:
                    data = conn.recv(1024)
                    if data:
                        print(data)
            finally:
                conn.close()
                self.socket.close()


class Client:
    def __init__(
            self,
            host='0.0.0.0',
            port=8000
    ):
        self.socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.socket.connect((host, port))
        print('Bound to {} on port {}'.format(host, port))

    def send(self, message):
        self.socket.sendall(message.encode('utf-8'))
