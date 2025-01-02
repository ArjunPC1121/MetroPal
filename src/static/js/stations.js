// Initialize the map
const map = L.map('map').setView([0, 0], 13); // Default view

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Get user location
navigator.geolocation.getCurrentPosition(async (position) => {
    const { latitude, longitude } = position.coords;

    // Debug: Log user location
    console.log("User Location:", latitude, longitude);

    // Set user's location on the map
    const userMarker = L.marker([latitude, longitude]).addTo(map)
        .bindPopup("You are here.")
        .openPopup();
    map.setView([latitude, longitude], 15);

    // Define metro stations
    const stations = [
        { name: "Whitefield (Kadugodi)", lat: 12.9957428, lon: 77.7579489 },
        { name: "Hopefarm", lat: 12.9873426, lon: 77.7538033 },
        { name: "Channasandra", lat: 12.9873426, lon: 77.7538033 },
        { name: "Kadugodi Tree Park", lat: 12.9856503, lon: 77.7470121 },
        { name: "Pattandur Agrahara", lat: 12.9876393, lon: 77.7377718 },
        { name: "Sri Sathya Sai Hospital", lat: 12.9811949, lon: 77.7275361 },
        { name: "Nallurhalli", lat: 12.9766408, lon: 77.7248845 },
        { name: "Kundalahalli", lat: 12.977594, lon: 77.7155586 },
        { name: "Hoodi", lat: 12.9888029, lon: 77.711326 },
        { name: "Garudacharpalya", lat: 12.9934505, lon: 77.7036768 },
        { name: "Singayyanapalya", lat: 12.9965445, lon: 77.6927176 },
        { name: "Krishnarajapura", lat: 12.9999024, lon: 77.6776703 },
        { name: "Benniganahalli", lat: 12.9965158, lon: 77.6684619 },
        { name: "Baiyappanahalli", lat: 12.9907594, lon: 77.6523612 },
        { name: "Swami Vivekananda Road", lat: 12.9859306, lon: 77.644897 },
        { name: "Indiranagar", lat: 12.9783325, lon: 77.6386612 },
        { name: "Halasuru", lat: 12.9764992, lon: 77.626686 },
        { name: "Trinity", lat: 12.9730218, lon: 77.6170205 },
        { name: "Mahatma Gandhi Road", lat: 12.9755264, lon: 77.6067902 },
        { name: "Cubbon Park", lat: 12.9809575, lon: 77.5975756 },
        { name: "Vidhana Soudha", lat: 12.9787419, lon: 77.5916385 },
        { name: "Nadaprabhu Kempegowda Stn Majestic", lat: 12.9757079, lon: 77.5728757 },
        { name: "Magadi Road", lat: 12.975632, lon: 77.5553523 },
        { name: "Sri Balagangadharanatha Swamiji Stn", lat: 12.9742933, lon: 77.5456215 },
        { name: "Vijayanagar", lat: 12.9709559, lon: 77.5374044 },
        { name: "Attiguppe", lat: 12.9618931, lon: 77.5335788 },
        { name: "Deepanjali Nagar", lat: 12.9520578, lon: 77.5370122 },
        { name: "Pantharapalya - Nayandahalli", lat: 12.9416715, lon: 77.5251166 },
        { name: "Rajarajeshwari Nagar", lat: 12.9365996, lon: 77.5196788 },
        { name: "Jnanabharathi", lat: 12.9354357, lon: 77.5124063 },
        { name: "Pattanagere", lat: 12.9242505, lon: 77.4983509 },
        { name: "Kengeri Bus Terminal", lat: 12.914689, lon: 77.4878557 },
        { name: "Kengeri", lat: 12.9176571, lon: 77.4837568 },
        { name: "Challaghatta", lat: 12.8973539, lon: 77.4612877 },
        { name: "Madavara", lat: 13.0574214, lon: 77.4728055 },
        { name: "Chikkabidarakallu", lat: 13.0523616, lon: 77.4879154 },
        { name: "Nagasandra", lat: 13.0479536, lon: 77.5001422 },
        { name: "Dasarahalli", lat: 13.0432607, lon: 77.5125535 },
        { name: "Jalahalli", lat: 13.0394104, lon: 77.5197351 },
        { name: "Peenya Industry", lat: 13.0363176, lon: 77.5254924 },
        { name: "Peenya", lat: 13.0330189, lon: 77.533201 },
        { name: "Goraguntepalya", lat: 13.0284078, lon: 77.5408961 },
        { name: "Yeshwanthpur", lat: 13.0192211, lon: 77.5532574 },
        { name: "Sandal Soap Factory", lat: 13.0146544, lon: 77.5539839 },
        { name: "Mahalakshmi", lat: 13.0080952, lon: 77.5487134 },
        { name: "Rajajinagar", lat: 13.0005247, lon: 77.5496568 },
        { name: "Kuvempu Road", lat: 12.9985297, lon: 77.5568986 },
        { name: "Srirampura", lat: 12.9965253, lon: 77.5631963 },
        { name: "Mantri Square Sampige Road", lat: 12.9904629, lon: 77.5707293 },
        { name: "Chickpete", lat: 12.9668935, lon: 77.5745663 },
        { name: "Krishna Rajendra Market", lat: 12.9608788, lon: 77.5746578 },
        { name: "National College", lat: 12.9505161, lon: 77.5736794 },
        { name: "Lalbagh", lat: 12.9465265, lon: 77.580016 },
        { name: "South End Circle", lat: 12.9382573, lon: 77.5800556 },
        { name: "Jayanagar", lat: 12.9295069, lon: 77.5801439 },
        { name: "Rashtreeya Vidyalaya Road", lat: 12.921331, lon: 77.5802659 },
        { name: "Banashankari", lat: 12.9152208, lon: 77.573598 },
        { name: "Jaya Prakash Nagar", lat: 12.9074747, lon: 77.5731279 },
        { name: "Yelachenahalli", lat: 12.8960498, lon: 77.5701194 },
        { name: "Doddakallasandra", lat: 12.8846435, lon: 77.5527546 },
        { name: "Vajarahalli", lat: 12.8774369, lon: 77.5447414 },
        { name: "Thalaghattapura", lat: 12.8714097, lon: 77.5383958 },
        { name: "Silk Institute", lat: 12.8617298, lon: 77.5299545 }
    ];
    

    // Find the closest station
    let closestStation = null;
    let minDistance = Infinity;

    stations.forEach(station => {
        const distance = getDistanceFromLatLonInKm(latitude, longitude, station.lat, station.lon);
        console.log(`Distance to ${station.name}: ${distance.toFixed(2)} km`);

        if (distance < minDistance) {
            minDistance = distance;
            closestStation = station;
        }
    });

    // Debug: Log closest station details
    console.log("Closest Metro:", closestStation);

    // Add marker for the closest station
    if (closestStation) {
        L.marker([closestStation.lat, closestStation.lon]).addTo(map)
            .bindPopup(`Closest Station: ${closestStation.name} (${minDistance.toFixed(2)} km)`)
            .openPopup();
    }
}, (error) => {
    console.error("Geolocation Error:", error.message);
    alert("Could not retrieve your location. Please check your location permissions and try again.");
});

// Haversine formula for calculating distances
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180);
}
