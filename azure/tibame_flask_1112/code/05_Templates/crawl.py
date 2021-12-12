import requests

url = 'http://127.0.0.1:5000/result'
r = requests.get(url)

print(r.content)