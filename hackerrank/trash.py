def count_substring(string, sub_string):
    count = 0
    i = 0

    while i < len(string) - 1:
        index_found = string[i:].find(sub_string)
        # print(index_found)
        if (index_found == -1):
            print('break')
            break
        else:
            i = index_found + 1
            count += 1
    
    return count

print('count', count_substring('ABCDCDC', 'CDC'))