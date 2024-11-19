import json
from scrape import get_fare
import time
import random
from pathlib import Path

parent_dir = Path(__file__).resolve().parent
stations_file_path = (parent_dir / '..' / 'data' / 'stations_list.json').resolve()
fares_path = (parent_dir / '..' / 'data' / 'fare_details.json').resolve()
response_path = (parent_dir / '..' / 'data' / 'response_data.json').resolve()


fares_table = {}
responses = []

with open(stations_file_path, 'r') as fil:
    stations = json.load(fil)


stations.sort(key=lambda x: x['vStationCode'])

pairs = 0
n = len(stations)

# Download fares for stations which are missing
with open(fares_path, 'r') as infile:
    fares_table = json.load(infile)

with open(response_path, 'r') as infile:
    responses =  json.load(infile)

for i in range(n):
    for j in range(i+1, n):
        from_station = stations[i]
        to_station = stations[j]

        from_code = from_station['vStationCode']
        from_line = str(from_station['LineID'])


        to_code = to_station['vStationCode']
        to_line = str(to_station['LineID'])

        if from_code in fares_table:
            if to_code in fares_table[from_code]:
                continue

        fare, resp = get_fare(from_code, from_line, to_code, to_line)

        # Save the response data, in case it is to be used in the future
        resp['from_code'] = from_code
        resp['to_code'] = to_code
        responses += [resp]

        if from_code not in fares_table:
            fares_table[from_code] = {}

        fares_table[from_code][to_code] = fare

        # Save every 100 seconds
        if pairs % 100 == 0:
            print('Saving fare details')
            with open(fares_path, 'w') as outfile:
                json.dump(fares_table, outfile, indent=4)

            with open(response_path, 'w') as outfile:
                json.dump(responses, outfile, indent=4)

        pairs += 1


        # Sleep for a random number of seconds so that the API does not block us
        delay = random.randint(5, 10)
        time.sleep(delay)

print('Saving fare details...')
with open(fares_path, 'w') as outfile:
    json.dump(fares_table, outfile, indent=4)

with open(response_path, 'w') as outfile:
    json.dump(responses, outfile, indent=4)

print(f'Downloaded information for {pairs} station pairs')
