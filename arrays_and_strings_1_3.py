"""
Turn a string into a URL with %20 for spaces
"""
def urlify_with_new_string(url,length):
    result = ""
    for index, letter in enumerate(url):
        if index >= length:
            break
        elif letter == " ":
            result += "%20"
        else:
            result += letter
    return result

def urlify_in_place(url,url_length):
    for index in reversed(range(0,url_length)):
        if url[index] == " ":
            url = url[0:index] + "%20" + url[index+1:]
    spaces = True
    while spaces:
        if url[-1] == " ":
            url = url[:-1]
        else:
            spaces = False
    return url

print(urlify_in_place("hello bob how are you doing   ",27))


