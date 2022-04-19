#! /usr/bin/python

import os
import sys
import socket
import time

host = "saturn.picoctf.net"
port = 52524

remote_ip = socket.gethostbyname(host)

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

s.connect((remote_ip, port))
score = 0

while True:
    message = s.recv(1024).decode("utf-8") 
    # if not message:
    #     continue

    
    print("Message Received:", message, sep="\r\n")

    if 'Welcome challenger' in message or 'Please put in a valid number' in message or "Play again?" in message:
        print("Sending, 1")
        s.send(b'1\r\n')
        score = 0
    elif 'Please make your selection' in message:
        print("Sending, rock")
        s.send(b'rock\r\n')
    else:
        print("Unhandled message")
    time.sleep(1)

