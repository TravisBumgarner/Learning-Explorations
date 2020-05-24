def longestPalindrome(s: str) -> str:
    # walk char by char
    # if next char is same letter, use both as center.
    # otherwise use just char index as center
    # walk outwards comparing left and right sides
    # if equal keep going. If not, store string if string longer than current longest
    longest_palindrome = ""
    for center_index, char in enumerate(s):

        if center_index + 1 < len(s) and s[center_index + 1] == char:
            left_index = center_index
            right_index = center_index + 1
        else:
            left_index = center_index
            right_index = center_index

        while True:
            if left_index == 0 or right_index + 1 == len(s) or s[left_index] != s[right_index]:
                break

            if s[left_index] == s[right_index]:
                left_index -= 1
                right_index += 1

        left_index_found = left_index + 1
        right_index_found = right_index - 1
            
        palindrome = s[left_index_found:right_index_found + 1]
        if len(palindrome) > len(longest_palindrome):
                longest_palindrome = palindrome
    return longest_palindrome




def check_palindrome(s, l, r):
    while l > 0 and r + 1 < len(s):
        l_next = l - 1
        r_next = r + 1

        if s[l_next] == s[r_next]:
            l = l_next
            r = r_next
        else:
            break
    return s[l:r+1]

def longest_palindrome_2(s):
        longest_palindrome = ""
        for center_index, char in enumerate(s):
            could_have_two_centers = center_index + 1 < len(s) and char == s[center_index + 1]
            
            p1 = check_palindrome(s, center_index, center_index)
            p2 = check_palindrome(s, center_index, center_index + 1) if could_have_two_centers else ""

            shorter_palindrome, longer_palindrome = sorted([p1, p2], key=len)

            if len(longer_palindrome) > len(longest_palindrome):
                longest_palindrome = longer_palindrome
        return longest_palindrome

    
print(longest_palindrome_2('cbbd'))