lookup = [ "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]

def mod26 (known_pattern, input_str):
    lower_input_str = input_str.lower()
    lower_known_pattern = known_pattern.lower()

    for offset in range(len(lookup)):       
        decrypted_input = ''
        for char in lower_input_str:
            if char not in lookup:
                decrypted_input += char
            else:
                decrypted_input += lookup[(lookup.index(char) + offset) % len(lookup)]
        if lower_known_pattern in decrypted_input:
            return decrypted_input

known_pattern = 'picoCTF'
print(mod26(known_pattern, "cvpbPGS{arkg_gvzr_V'yy_gel_2_ebhaqf_bs_ebg13_nSkgmDJE}"))