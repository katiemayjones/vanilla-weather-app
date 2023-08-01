let now = new Date();

let currently = document.querySelector(".currently");

let currentHours = now.getHours();
let currentMinutes = now.getMinutes().toString().padStart(2, "0");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let currentDay = days[now.getDay()];

currently.innerHTML = `${currentDay}<br/>
${currentHours}:${currentMinutes}`;

function citySearch(event) {
  event.preventDefault();
  let query = document.querySelector("#search-city-input");
  let cityName = document.querySelector(".cityName");
  let iconElement = document.querySelector("#main-icon");
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${query.value}&key=e70e93a38oe24fbbd3ata4d913b05868&units=metric`;

  cityName.innerHTML = `${query.value}`;
  axios.get(apiUrl).then(showTemperature);
}

function showTemperature(response) {
  console.log(response);

  let temperature = document.querySelector("#currentTempC");
  let temperatureElementC = Math.round(response.data.temperature.current);
  let cityName = document.querySelector(".cityName");
  let nameChange = response.data.city;
  let iconElement = document.querySelector("#main-icon");

  cityName.innerHTML = `${nameChange}`;
  temperature.innerHTML = `${temperatureElementC}`;
  iconElement.setAttribute("src", `${response.data.condition.icon_url}`);
}

let formInput = document.querySelector("#search-city-input");
formInput.addEventListener("submit", citySearch);

let searchButton = document.querySelector(".searchButton");
searchButton.addEventListener("click", citySearch);

function getPosition(position) {
  console.log(position);
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  let locationApiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=e70e93a38oe24fbbd3ata4d913b05868&units=metric`;
  axios.get(locationApiUrl).then((response) => {
    let temperature = document.querySelector("#currentTempC");
    let temperatureElementC = Math.round(response.data.temperature.current);
    let cityName = document.querySelector(".cityName");
    let nameChange = response.data.city;
    let iconElement = document.querySelector("#main-icon");
    let weatherCurrently = document.querySelector(".weatherCurrently");

    weatherCurrently.innerHTML = `${response.data.condition.description}`;
    cityName.innerHTML = `${nameChange}`;
    temperature.innerHTML = `${temperatureElementC}`;
    iconElement.setAttribute("src", `${response.data.condition.icon_url}`);
  });
}

navigator.geolocation.getCurrentPosition(getPosition);
