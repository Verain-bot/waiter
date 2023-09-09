from OTPAuth.urls import URL_FOR_OTPAuth
from api.urls import API_URLS
import json

def makeJSON():
    with open('./urls.json', 'a') as file:
        urls = {
            **URL_FOR_OTPAuth.get_URLS(),
            **API_URLS.get_URLS()
        }

        file.write(json.dumps(urls, indent=4))