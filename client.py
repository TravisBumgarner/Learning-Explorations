import socket

from utils import pretty_print_message
from constants import ACCEPTED_METHODS, ACCEPTED_PROTOCOLS, ACCEPTED_HEADERS


class Client:
    def __init__(
            self,
            host='0.0.0.0',
            port=8000
    ):
        self.socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.host = host
        self.socket.connect((host, port))
        print('Connected to {}:{}'.format(host, port))

    def format_request(
            self,
            method='GET',
            path='/',
            protocol='HTTP/1.1',
            headers=None,
            body=''
    ):

        if method not in ACCEPTED_METHODS:
            raise ValueError('Invalid Method')

        if protocol not in ACCEPTED_PROTOCOLS:
            raise ValueError('Invalid Protocol')

        for header in headers.keys():
            if header not in ACCEPTED_HEADERS:
                raise ValueError('Invalid Header')

        request = "{} {} {}\r\n".format(method, path, protocol)

        for h in headers.keys():
            request += "{}: {}\r\n".format(h, headers[h])

        request += '\r\n\r\n'
        request += body

        return str.encode(request)

    def make_request(self, path):
        headers = {
            'Host': self.host
        }

        request = self.format_request(headers=headers)
        pretty_print_message('Request', request)

        self.socket.sendall(request)
        response = self.socket.recv(4096)
        pretty_print_message('Response', response)
        self.socket.close()

c = Client(host='0.0.0.0', port=8000)
c.make_request('/')
