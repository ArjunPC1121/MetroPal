from typing import List
import os
import json

with open('data/stations_list.json', 'r', encoding='utf-8') as stations_file:
    stations = json.load(stations_file)
    stations = sorted(stations, key=lambda d: d['vStationName'])

station_codes = {station['vStationCode'] for station in stations}

with open('data/fare_details.json', 'r') as fare_file:
    fares = json.load(fare_file)


def get_all_stations() -> List[dict]:
    """
    Returns all the stations as a list of dictionaries
    """
    return stations


def get_station_detailed(station_code: str) -> dict | None:
    """
    Returns None if the station is not found, otherwise station details as a dictionary
    """
    for station in stations:
        station_c = station.get("vStationCode")
        if station_c == station_code:
            return station
    return None


def get_fare(from_station_code: str, to_station_code: str) -> float | None:
    """
    If the station codes are valid, return the fare as a number, otherwise return None
    """
    if not (from_station_code in station_codes and to_station_code in station_codes):
        return None
    
    if from_station_code == to_station_code:
        return 0
    
    try:
        return fares[from_station_code][to_station_code]
    except:
        return fares[to_station_code][from_station_code]

