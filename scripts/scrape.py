import requests
from typing import Any, Tuple
import warnings
import urllib3

warnings.filterwarnings("ignore", category=urllib3.exceptions.InsecureRequestWarning)

api_url = 'https://english.bmrc.co.in:8282/api/users/fare/get-fare-details'
headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
    'Authorization': 'Bearer 7a3ac55ef3482d34682eb75d52b44f44',
}

def get_fare(from_station: str, from_code: str, to_station: str, to_code: str) -> Tuple[float, Any]:
    data = {
        "from":{"value": from_station, "groupId": from_code},
        "to":{"value": to_station, "groupId": to_code}
    }

    response = requests.post(api_url, headers=headers, json=data, verify=False)
    if response.status_code == 200:
        try:
            response_json = response.json()
        except:
            print('Error while decoding JSON')
            return -1, None
    else:
        print(f'Unable to fetch data: Error {response.status_code}')
        return -1, None

    return response_json['results']['TValue'], response_json

if __name__ == '__main__':
    from_station = input('Enter from station code: ')
    from_code = input('Enter from station line (1 for purple, 2 for green): ')

    to_station = input('Enter to station code: ')
    to_code = input('Enter to station line (1 for purple, 2 for green): ')

    fare, _ = get_fare(from_station, from_code, to_station, to_code)
    print('Fare: Rs.', fare)

