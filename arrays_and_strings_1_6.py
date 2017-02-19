"""
String Compression
'aaabbc' => a3b2c1
"""

def compress_str(uncompressed_str):
    current_char = uncompressed_str[0]
    count = 1
    compressed_str = ""
    for index, char in enumerate(uncompressed_str[1:]):
        if (char != current_char) or (len(uncompressed_str[1:]) == index):
            #After the or statement is for the end of the string
            #
            compressed_str += current_char + str(count)
            current_char = char
            count = 1
        else:
            count += 1

    return compressed_str if len(compressed_str) < len(uncompressed_str) else uncompressed_str

print(compress_str("aabcccccaaa"))
