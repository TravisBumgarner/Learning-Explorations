import socket

port = 8001

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
is_no_port = True
while is_no_port:
    try:
        s.bind(('0.0.0.0', port))
        is_no_port = False

    except OSError:
        port += 1

print('listening on port {}'.format(port))
s.listen(5)
while True:
    try:
        conn, addr = s.accept()
        print(conn, addr)
        while True:
            data = conn.recv(1024)
            if data:
                print(data)
    finally:
        conn.close()

s.close()
