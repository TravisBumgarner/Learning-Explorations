def pretty_print_message(type, message):
    message = message.decode('utf-8').strip().split('\r\n')
    print('\n[>] {}'.format(type))
    for line in message:
        print('[>]     {}'.format(line))


class Request:
    def __init__(self, request_byte_str):
        raw_request = request_byte_str.decode('utf-8').strip().split('\r\n\r\n')
        if len(raw_request) == 2:
            headers, self.body = raw_request
        else:
            headers = raw_request[0]
            self.body = ''

        headers = headers.split('\r\n')

        request_line = headers[0]
        self.method, self.path, self.protocol = request_line.split(' ')

        raw_headers = headers[1:]
        self.headers = {}
        for h in raw_headers:
            k, v = h.split(': ')
            self.headers[k] = v
