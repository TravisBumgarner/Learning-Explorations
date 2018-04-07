import os

entry_point = './src'

URLS = {
    '/': 'index.html'
}


def get_body_content(request):
    if request.path in URLS:
        file_name = URLS[request.path]
    else:
        file_name = '404.html'

    file_path = os.path.join(entry_point, file_name)

    with open(file_path) as f:
        body = f.read()

    return body

