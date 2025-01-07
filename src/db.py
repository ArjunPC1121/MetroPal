from typing import List

stations = [
    {
        "vStationName": "Whitefield",
        "vStationCode": "WHTM",
        "vStationNameK": "ವೈಟ್‌ಫೀಲ್ಡ್\r\n",
        "color_code": "purple",
    },
    {
        "vStationName": "Channasandra",
        "vStationCode": "UWVL",
        "vStationNameK": "ಚನ್ನಸಂದ್ರ\r\n",
        "color_code": "purple",
    },
    {
        "vStationName": "Kadugodi Tree Park",
        "vStationCode": "KDGD",
        "vStationNameK": "ಕಾಡುಗೋಡಿ ಟ್ರೀ ಪಾರ್ಕ್\n",
        "color_code": "purple",
    },
]

station_codes = {"WHTM", "UWVL", "KDGD"}


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
    
    return 20
