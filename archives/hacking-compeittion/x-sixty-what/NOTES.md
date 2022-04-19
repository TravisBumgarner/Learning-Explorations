Now that we're in 64-bit, what used to be 4 bytes, now may be 8 bytes.

Jump to the second instruction (the one after the first push) in the flag function, if you're getting mysterious segmentation faults.

Thoughts ->
- Overflow the first buffer, jump to the second function, overflow that buffer, get the flag

aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa -> Good
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa -> Segmentation Fault
...
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa -> Segmentation Fault
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa -> Bus error
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa -> Illegal instruction
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa -> Segmentation fault
... ??? 
Always shows segmentation fault after this point



-> Illegal instruction (core dumped)

ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
-> Segmentation fault (core dumped)

Segmentation Fault (also known as SIGSEGV and is usually signal 11) - You can get this message when the program tries to write/read outside the memory allocated for it or when writing memory which can only be read

Bus Error (also known as SIGBUS and is usually signal 10) - You can encounter this signal error when an invalid pointer is dereferenced i.e when you try to dereference an uninitialised pointer. It is similar to SIGSEGV but the difference is that SIGSEGV indicates an invalid access to valid memory, while SIGBUS indicates an access to an invalid address.

Illegal Instructions (also known as SIGILL and is usually signal 4) - This usually means that your program is trying to execute garbage or a privileged instruction. You might encounter this -
(a.) when you try to execute data
(b.) when you try to execute a corrupted executed file.
(c.) stack overflows
(d.) when the system has trouble running the handler for a signal

On a normal Run, without trying to overflow:
rbp points to:
rbp            0x401340            0x401340 <__libc_csu_init>

When Run with original Exploit String:
`rbp            0x7272727271717171  0x7272727271717171`
Gets overwritten by rrrrqqqq

Sending in 
aaaabbbbccccddddeeeeffffgggghhhhiiiijjjjkkkkllllmmmmnnnnoooopppp
Gives
0x7fa56e00d540 
Gives gibberish

Vuln Starts at 0x4012b2
Flag starts at 0x401236
