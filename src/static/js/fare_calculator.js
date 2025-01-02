const metroStations = [
    "Kengeri", "Kengeri Bus Terminal", "Jnana Bharathi", "Rajarajeshwari Nagar", "Nayandahalli", 
    "Mysore Road", "Attiguppe", "Deepanjali Nagar", "Vijayanagar", "Hosahalli", "Magadi Road", 
    "Kempegowda Station, Majestic", "City Railway Station", "Sir M Visvesvaraya Station, Central College", 
    "Dr. B R Ambedkar Stn., Vidhana Soudha", "Cubbon Park", "Mahatma Gandhi Road", "Trinity", "Halasuru", 
    "Indiranagar", "Swami Vivekananda Road", "Baiyappanahalli", "Nagasandra", "Dasarahalli", 
    "Jalahalli", "Peenya Industry", "Peenya", "Goraguntepalya", "Yeshwanthpur Industry", "Yeshwanthpur", 
    "Sandal Soap Factory", "Mahalakshmi", "Rajajinagar", "Mahakavi Kuvempu Road", "Srirampura", 
    "Mantri Square Sampige Road", "Chickpete", "Krishna Rajendra Market", "National College", 
    "Lalbagh", "South End Circle", "Jayanagar", "Rashtreeya Vidyalaya Road", "Banashankari", 
    "JP Nagar", "Yelachenahalli", "Konanakunte Cross", "Doddakallasandra", "Vajarahalli", 
    "Thalaghattapura", "Silk Institute"
];
metroStations.sort();

function populateDropdown(inputType){
    const list = document.getElementById(inputType+"DropdownList")
    list.innerHTML='';

    for(let i=0;i<metroStations.length;i++){
        const item = document.createElement("div")
        item.textContent=metroStations[i];
        item.onclick= function() {
            document.getElementById(inputType+"DropdownInput").value=metroStations[i];
            list.style.display="none";
        };
        list.appendChild(item);
    }
}
function showDropdown(inputType){
    document.getElementById(inputType+"DropdownList").style.display="block";
    //event.stopPropagation();
}

function filterList(inputType){
    const input = document.getElementById(inputType+"DropdownInput").value.toLowerCase();
    const items = document.querySelectorAll("#"+inputType+"DropdownList div");
    for(let i=0;i<items.length;i++)
    {
        const value = items[i].textContent.toLowerCase();
        if(value.includes(input)){
            items[i].style.display="block";
        }
        else{
            items[i].style.display="none";
        }
    }
}
populateDropdown('source');
populateDropdown('destination');
document.addEventListener("click",function(event){
    const list_area = document.querySelector(".dropdown-container");
    const list_area2 = document.querySelector(".dropdown-container2");
    
    //const input = document.getElementById("dropdownInput");
    if(!list_area.contains(event.target))
    {
        document.getElementById("sourceDropdownList").style.display="none";
    }
    if(!list_area2.contains(event.target))
    {
        document.getElementById("destinationDropdownList").style.display="none";
    }
    
});
function fareDisplay(){
    const displayArea = document.getElementById("fareCalculated");
    displayArea.innerHTML='Fare = x';
}
//document.getElementById("dropdownInput").addEventListener("click",showDropdown)
//document.getElementById("dropdownInput").addEventListener("keyup",filterList)
function stationDisplay(){
    window.location.href="/station"
}