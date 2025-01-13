let metroStations = [];

function populateDropdown(inputType, metroStations) {
    const list = document.getElementById(inputType + "DropdownList");
    list.innerHTML = '';

    // Get the selected line value
    const lineDropdown = document.getElementById(inputType + "Line");
    const line = lineDropdown.value.toLowerCase(); // Green or Purple

    let flag = 0;
    if (line === "green") flag = 2;  // 2 for Green Line
    if (line === "purple") flag = 1; // 1 for Purple Line

    let filtered = false;

    for (let i = 0; i < metroStations.length; i++) {
        const item = document.createElement("div");
        item.textContent = metroStations[i].vStationName;

        // Apply the line filtering
        if (flag === 1 && metroStations[i].LineID !== 1) {
            item.style.display = "none";
        } else if (flag === 2 && metroStations[i].LineID !== 2) {
            item.style.display = "none";
        } else {
            item.style.display = "block";
            filtered = true;
        }
        item.style.borderColor="2px solid black";
        item.style.margin="5px";
        item.style.borderRadius="5px"
        // Set background color based on line
        if (metroStations[i].LineID === 1) {
            item.style.backgroundColor = "purple";
            
        } else {
            item.style.backgroundColor = "green";
        }

        item.onclick = function () {
            document.getElementById(inputType + "DropdownInput").value = metroStations[i].vStationName;
            list.style.display = "none"; // Hide dropdown after selection
        };

        list.appendChild(item);
    }

    // If no items are visible after filtering, show "No stations found"
    if (!filtered) {
        const noResultsItem = document.createElement("div");
        noResultsItem.textContent = "No stations found";
        list.appendChild(noResultsItem);
    }
}

function showDropdown(inputType) {
    document.getElementById(inputType + "DropdownList").style.display = "block";
}

function filterList(inputType) {
    const input = document.getElementById(inputType + "DropdownInput").value.toLowerCase();
    const items = document.querySelectorAll("#" + inputType + "DropdownList div");

    for (let i = 0; i < items.length; i++) {
        const value = items[i].textContent.toLowerCase();
        if (value.includes(input)) {
            items[i].style.display = "block";
        } else {
            items[i].style.display = "none";
        }
    }
}

document.addEventListener("DOMContentLoaded", function () {
    console.log('Getting stations list');
    fetch('/api/v1/stations')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Got response ${response.status} from server`);
            }
            return response.json();
        })
        .then(json => {
            metroStations = json;
            populateDropdown('source', metroStations);
            populateDropdown('destination', metroStations);
        })
        .catch(err => {
            alert(`Error while getting stations list ${err}`);
        });
        // Add event listeners to dropdowns to re-trigger the population
        document.getElementById("sourceLine").addEventListener("change", function () {
            populateDropdown('source', metroStations);
        });
        document.getElementById("destinationLine").addEventListener("change", function () {
            populateDropdown('destination', metroStations);
        });

});

document.addEventListener("click", function (event) {
    const list_area = document.querySelector(".dropdown-container");
    const list_area2 = document.querySelector(".dropdown-container2");

    if (!list_area.contains(event.target)) {
        document.getElementById("sourceDropdownList").style.display = "none";
    }
    if (!list_area2.contains(event.target)) {
        document.getElementById("destinationDropdownList").style.display = "none";
    }
});

function fareDisplay() {
    const sourceStation = document.getElementById("sourceDropdownInput").value;
    const destinationStation = document.getElementById("destinationDropdownInput").value;

    const displayArea = document.getElementById("fareCalculated");

    if (sourceStation && destinationStation) {
        const srcStation = metroStations.filter(station => station.vStationName === sourceStation);
        const dstStation = metroStations.filter(station => station.vStationName === destinationStation);

        if (srcStation.length === 0 || dstStation.length === 0) {
            displayArea.innerHTML = 'Source or destination station does not exist';
        } else {
            const srcStationCode = srcStation[0].vStationCode;
            const dstStationCode = dstStation[0].vStationCode;

            fetch(`/api/v1/fare?from=${srcStationCode}&to=${dstStationCode}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Got response ${response.status} from server`);
                    }
                    return response.json();
                })
                .then(json => {
                    displayArea.innerHTML = `Fare: Rs. ${json['fare']}`;
                })
                .catch(err => {
                    displayArea.innerHTML = 'Error while getting fare details from server';
                    console.log(err);
                });
        }
    } else {
        displayArea.innerHTML = 'Please select both source and destination stations.';
    }
}

function stationDisplay() {
    window.location.href = "/station";
}
