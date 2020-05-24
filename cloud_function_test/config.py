import os

from dotenv import load_dotenv
load_dotenv()

project = os.getenv('PROJECT')

settings = {
    project
}