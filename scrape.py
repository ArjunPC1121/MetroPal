import requests
import warnings
import urllib3
import json

warnings.filterwarnings("ignore", category=urllib3.exceptions.InsecureRequestWarning)

url = 'https://english.bmrc.co.in:8282/api/users/fare/get-fare-details'
headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
    'Authorization': 'Bearer 7a3ac55ef3482d34682eb75d52b44f44',
}

# Take input from the user for now
from_station = input('Enter from station code: ')
from_code = input('Enter from station line (1 for purple, 2 for green): ')

to_station = input('Enter to station code: ')
to_code = input('Enter to station line (1 for purple, 2 for green): ')

data = {
    "from":{"value": from_station, "groupId": from_code},
    "to":{"value": to_station, "groupId": to_code}
}

response = requests.post(url, headers=headers, json=data, verify=False)
if response.status_code == 200:
    try:
        response_json = response.json()
    except:
        print('Error while decoding JSON')
        exit()
else:
    print(f'Unable to fetch data: Error {response.status_code}')
    exit()

print('Token value: Rs.', response_json['results']['TValue'])
print('Discounted value: Rs.', response_json['results']['CSCValue'])
print('Group ticket value: Rs.', response_json['results']['GTValue'])
