import os

from settings import URL_TO_RESOURCE, HTML_ROOT_DIR, HTML_404


def get_body_content(request):
    if request.path in URL_TO_RESOURCE:
        file_name = URL_TO_RESOURCE[request.path]
    else:
        file_name = HTML_404

    file_path = os.path.join(HTML_ROOT_DIR, file_name)

    with open(file_path) as f:
        body = f.read()

    return body

