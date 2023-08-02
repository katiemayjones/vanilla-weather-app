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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let shortDays = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat "];

  return shortDays[day];
}

function showForecast(coordinates) {
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=e70e93a38oe24fbbd3ata4d913b05868&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row align-items-center">`;

  {
    response.data.daily.forEach(function (forecastDay) {
      forecastHTML =
        forecastHTML +
        `<div class="col"> 
          <div class="weatherForecast" id="forecast">
            <img src="${forecastDay.condition.icon_url}"
              width="48"
            />  
            <h4 class="forecastDay">
              ${formatDay(
                forecastDay.time
              )} <br /><span id="maxForecast">${Math.round(
          forecastDay.temperature.maximum
        )}</span>°
              <span id="minForecast">${Math.round(
                forecastDay.temperature.minimum
              )}</span>°
            </h4>
        </div>
      </div>`;
    });
  }

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function citySearch(event) {
  event.preventDefault();
  let query = document.querySelector("#search-city-input");
  let cityName = document.querySelector(".cityName");
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${query.value}&key=e70e93a38oe24fbbd3ata4d913b05868&units=metric`;

  cityName.innerHTML = `${query.value}`;
  axios.get(apiUrl).then((currentWeatherResponse) => {
    let coordinates = currentWeatherResponse.data.coordinates;

    let forecastApiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=e70e93a38oe24fbbd3ata4d913b05868&units=metric`;
    axios.get(forecastApiUrl).then((forecastResponse) => {
      showTemperature(currentWeatherResponse);
      displayForecast(forecastResponse);
    });
  });
}
function showTemperature(response) {
  let temperature = document.querySelector("#currentTempC");
  let cityName = document.querySelector(".cityName");
  let nameChange = response.data.city;
  let iconElement = document.querySelector("#main-icon");
  let weatherCurrently = document.querySelector(".weatherCurrently");
  let humidity = document.querySelector("#current-humidity");
  let windspeed = document.querySelector("#current-wind");

  celciusTemperature = response.data.temperature.current;

  windspeed.innerHTML = Math.round(`${response.data.wind.speed}`);
  humidity.innerHTML = Math.round(`${response.data.temperature.humidity}`);
  weatherCurrently.innerHTML = `${response.data.condition.description}`;
  cityName.innerHTML = `${nameChange}`;
  temperature.innerHTML = Math.round(celciusTemperature);
  iconElement.setAttribute("src", `${response.data.condition.icon_url}`);
}

let formInput = document.querySelector("#search-city-input");
formInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
  }
});

let searchButton = document.querySelector(".searchButton");
searchButton.addEventListener("click", citySearch);

function getPosition(position) {
  console.log(position);
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  let locationApiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=e70e93a38oe24fbbd3ata4d913b05868&units=metric`;
  axios.get(locationApiUrl).then((response) => {
    let temperature = document.querySelector("#currentTempC");
    let cityName = document.querySelector(".cityName");
    let nameChange = response.data.city;
    let iconElement = document.querySelector("#main-icon");
    let weatherCurrently = document.querySelector(".weatherCurrently");
    let humidity = document.querySelector("#current-humidity");
    let windspeed = document.querySelector("#current-wind");
    celciusTemperature = response.data.temperature.current;

    windspeed.innerHTML = Math.round(`${response.data.wind.speed}`);
    humidity.innerHTML = Math.round(`${response.data.temperature.humidity}`);
    weatherCurrently.innerHTML = `${response.data.condition.description}`;
    cityName.innerHTML = `${nameChange}`;
    temperature.innerHTML = Math.round(celciusTemperature);
    iconElement.setAttribute("src", `${response.data.condition.icon_url}`);
    showForecast(response.data.coordinates);
  });
}

navigator.geolocation.getCurrentPosition(getPosition);

function showFahren(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#currentTempC");
  celciusLink.classList.remove("active");
  fahrenLink.classList.add("active");
  let fahrenTemperature = (celciusTemperature * 9) / 5 + 32;

  currentTemp.innerHTML = Math.round(fahrenTemperature);
}

function showCelcius(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#currentTempC");
  celciusLink.classList.add("active");
  fahrenLink.classList.remove("active");
  currentTemp.innerHTML = Math.round(celciusTemperature);
}
let celciusTemperature = null;

let fahrenLink = document.querySelector("#fahren-link");
let celciusLink = document.querySelector("#celcius-link");

celciusLink.addEventListener("click", showCelcius);
fahrenLink.addEventListener("click", showFahren);
