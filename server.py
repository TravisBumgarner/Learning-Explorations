import socket


class Server:

    def __init__(
            self,
            host='0.0.0.0',  # Empty string so we can receive requests from other computers, use 0.0.0.0 for localhost
            desired_port=8000,
            max_listen_queue=5
    ):

        self.socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

        is_no_port = True
        while is_no_port:
            try:
                self.socket.bind((host, desired_port))
                is_no_port = False
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
        self.socket.close()

    def process_request(self, request):
        request = request.decode('utf-8').strip()

        request = request.split('\r\n\r\n')

        if len(request) == 2:
            headers, body = request
        else:
            headers = request[0]
            body = ''
        headers = headers.split('\r\n')

        request_line = headers[0]
        method, path, protocol = request_line.split(' ')

        raw_headers = headers[1:]
        headers_dict = {}
        for h in raw_headers:
            k, v = h.split(': ')
            headers_dict[k] = v

        print("{}\n{}\n{}\n{}\n{}".format(method, path, protocol, headers_dict, body))
