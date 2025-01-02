import requests
import time

# Stations list as a paragraph
stations = [
    "Whitefield (Kadugodi)", "Hopefarm", "Channasandra", "Kadugodi Tree Park", "Pattandur Agrahara", 
    "Sri Sathya Sai Hospital", "Nallurhalli", "Kundalahalli", "Seetharamapalya", "Hoodi", 
    "Garudacharpalya", "Singayyanapalya", "Krishnarajapura", "Benniganahalli", "Baiyappanahalli", 
    "Swami Vivekananda Road", "Indiranagar", "Halasuru", "Trinity", "Mahatma Gandhi Road", 
    "Cubbon Park", "Vidhana Soudha", "Sir M. Visveshwaraya", "Nadaprabhu Kempegowda Stn", 
    "Krantiveera Sangolli Rayanna Railway Station", "Magadi Road", "Sri Balagangadharanatha Swamiji Stn", 
    "Vijayanagar", "Attiguppe", "Deepanjali Nagar", "Mysuru Road", "Pantharapalya - Nayandahalli", 
    "Rajarajeshwari Nagar", "Jnanabharathi", "Pattanagere", "Kengeri Bus Terminal", "Kengeri", 
    "Challaghatta", "Madavara", "Chikkabidarakallu", "Manjunath Nagar", "Nagasandra", "Dasarahalli", 
    "Jalahalli", "Peenya Industry", "Peenya", "Goraguntepalya", "Yeshwanthpur", "Sandal Soap Factory", 
    "Mahalakshmi", "Rajajinagar", "Kuvempu Road", "Srirampura", "Mantri Square Sampige Road", "Chickpete", 
    "Krishna Rajendra Market", "National College", "Lalbagh", "South End Circle", "Jayanagar", 
    "Rashtreeya Vidyalaya Road", "Banashankari", "Jaya Prakash Nagar", "Yelachenahalli", "Konankunte Cross", 
    "Doddakallasandra", "Vajarahalli", "Thalaghattapura", "Silk Institute"
]

# Nominatim API endpoint
NOMINATIM_API_URL = "https://nominatim.openstreetmap.org/search"

# Function to fetch coordinates for a station
def get_coordinates(station_name):
    query = f"{station_name} Station Bangalore"  # Exact format
    params = {
        "q": query,  # Query with "Station Bangalore" appended
        "format": "json",
        "limit": 1  # Fetch only the top result
    }
    response = requests.get(NOMINATIM_API_URL, params=params, headers={'User-Agent': 'MetroPal'})
    
    if response.status_code == 200:
        data = response.json()
        if data:
            # Get the first result
            return float(data[0]["lat"]), float(data[0]["lon"])
    return None, None

# Fetch coordinates for the stations
for station in stations:
    lat, lon = get_coordinates(station)
    if lat and lon:
        print(f"{station}: ({lat}, {lon})")
    time.sleep(2)  # Respect API rate limits
