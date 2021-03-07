const weather = document.querySelector(".weather");

const API_KEY = "5a7c85663cb261afe0fe73c48e1f4536";

function saveCoords(coords) {
    localStorage.setItem("coords", JSON.stringify(coords));
}

function getWeather(latitude, longtitude) {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longtitude}&appid=${API_KEY}&units=metric`
    )
        .then(function(response) {
            return response.json();
        })
        .then(function(json) {
            const temp = json.main.temp;
            const place = json.name;
            weather.innerText = `${temp}°C @ ${place}`;
        });
}

function handleGeoSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coords = {
        latitude,
        longitude
    };
    saveCoords(coords);
    getWeather(latitude, longitude);
}

function handleGeoError() {
    console.log("Error");
}

function askCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
    const loadedCoords = localStorage.getItem("coords");
    if(loadedCoords == null) {
        askCoords();
    }
    else {
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}

function init() {
    loadCoords();
}

init();