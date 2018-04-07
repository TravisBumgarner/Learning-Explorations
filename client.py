import socket


class Client:
    def __init__(
            self,
            host='0.0.0.0',
            port=8000
    ):
        self.socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.host = host
        self.socket.connect((host, port))
        print('Bound to {} on port {}\n'.format(host, port))

    def generate_headers(self, method='GET', path = '/', protocol='HTTP/1.1', headers={}, body=''):
        response = "{} {} {}\r\n".format(method, path, protocol)
        for h in headers.keys():
            response += "{}: {}\r\n".format(h, headers[h])
        response += '\r\n\r\n'
        response += body
        return str.encode(response)

    def pretty_print_message(self, type, message):
        message = message.decode('utf-8').split('\r\n')
        print('[>] {}'.format(type))
        for line in message:
            print('[>]     {}'.format(line))
        print('\n')

    def make_request(self):
        headers = {
            'Host': self.host
        }

        request = self.generate_headers(headers=headers, body='Hello World!')
        self.pretty_print_message('Request', request)

        self.socket.sendall(request)
        response = self.socket.recv(4096)
        self.pretty_print_message('Response', response)
        self.socket.close()


c = Client()
c.make_request()
