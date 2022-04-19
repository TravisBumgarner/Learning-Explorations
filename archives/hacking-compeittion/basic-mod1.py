x = [128,63,131,198,262,110,309,73,276,285,316,161,151,73,219,150,145,217,103,226,41,255,]

LOOKUPS = ['a' , 'b' , 'c' , 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '_']

def mod_37(inputs):
    modded = [i % 37 for i in inputs]
    chars = ''.join([LOOKUPS[j] for j in modded])
    print(chars)

mod_37(x)