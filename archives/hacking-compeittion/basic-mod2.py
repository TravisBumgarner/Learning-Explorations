message = [350,372,192,354,139,337,67,311,392,338,241,414,180,277,379,294,128,117,250,404,336,350,386 ]

LOOKUPS = [None, 'a' , 'b' , 'c' , 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '_']


def modular_inverse(value, mod_value):
    for i in range(mod_value):
        result = value * i % mod_value
        if result == 1:
            return i


def mod_x_decode(message, mod_value):
    modded = [i % mod_value for i in message]
    modded_inverse = [modular_inverse(j, mod_value) for j in modded]
    chars = ''.join([LOOKUPS[k] for k in modded_inverse])
    print(chars)

mod_value = 41

mod_x_decode(message, mod_value)

