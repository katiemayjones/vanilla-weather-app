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

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Wed", "Thurs", "Fri", "Sat", "Sun"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2"> 
          <div class="weatherForecast" id="forecast">
            <img
              src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/broken-clouds-day.png"
              width="48"
            />
            <h4 class="forecastDay">
              ${day} <br /><span id="maxForecast">12</span>°
              <span id="minForecast">12</span>°
            </h4>
        </div>
      </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function citySearch(event) {
  event.preventDefault();
  let query = document.querySelector("#search-city-input");
  let cityName = document.querySelector(".cityName");
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${query.value}&key=e70e93a38oe24fbbd3ata4d913b05868&units=metric`;

  cityName.innerHTML = `${query.value}`;
  axios.get(apiUrl).then(showTemperature);
}

displayForecast();

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
