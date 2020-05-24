def convert_to_uppercase(c):
    return c if (ord(c) >= ord("A") and ord(c) <= ord("Z")) else chr(ord(c) - 32)

def case_insensitive_compare(s1, s2, mismatch_threshold = 1):
    mismatches = 0
    s1_index = 0
    s2_index = 0

    while s1_index < len(s1) and s2_index < len(s2) and mismatches <= mismatch_threshold:
        print(mismatches, s1_index, s2_index)
        ord1 = convert_to_uppercase(s1[s1_index])
        ord2 = convert_to_uppercase(s2[s2_index])

        if ord1 == ord2:
            s1_index += 1
            s2_index += 1
        
        else:
            ord1_next = convert_to_uppercase(s1[s1_index + 1]) if s1_index < len(s1) - 1 else None
            ord2_next = convert_to_uppercase(s2[s2_index + 1]) if s2_index < len(s2) - 1 else None

            if ord2_next and ord1 == ord2_next:
                mismatches += 1
                s2_index += 1

            elif ord1_next and ord2 == ord1_next:
                mismatches += 1
                s1_index += 1

            else:
                mismatches += 1
    mismatches += (len(s1) - s1_index) + (len(s2) - s2_index)
    return True if mismatches <= mismatch_threshold else False

