/// Get current date and time

function dateTime(timestamp) {
  let now = new Date(timestamp);
  let day = now.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let dayMonth = now.getDate();
  let month = now.getMonth();
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }

  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${days[day]}, ${dayMonth}. ${months[month]} <br/> ${hour}:${minutes}`;
}

///default city for weather
function defaultCity(city) {
  let apiKey = "72bb9dab46b9ec3d65f423c63f27a9b8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(locationWeather);
}
defaultCity("Tokyo");
/// timestamp
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let month = date.getMonth();
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return days[day];
  /* return `${days[day]}, ${dayMonth}. ${months[month]}  ${hour}:${minutes}`;*/
}

///Name of the city after searching
function cityName(event) {
  event.preventDefault();
  let cityDisplay = document.querySelector("#search-city-input");
  let currentCity = document.querySelector("#app-city");
  if (cityDisplay.value) {
    currentCity.innerHTML = cityDisplay.value;
  } else {
    currentCity.innerHTML = null;
    alert("Please type a city");
    currentCity.innerHTML = "Nowhere";
  }
  let apiKey =
    "72bb9dab46b9ec3d65f423c63f27a9b8"; /*display searching city and temp part 11*/
  let urlWeather = `https://api.openweathermap.org/data/2.5/weather?q=${cityDisplay.value}&units=metric&appid=${apiKey}`;
  axios.get(urlWeather).then(locationWeather);
  axios.get(urlWeather).then(locationWeather);
  temperatureRadio.checked = true;
}
let city = document.querySelector("#city-search");
city.addEventListener("submit", cityName);

/// Display searching city and temperature part 2

function locationWeather(response) {
  console.log(response.data);
  let location = document.querySelector("#app-city");
  location.innerHTML = response.data.name;
  let currentSearchTemp = document.querySelector("#main-temp");
  let temperature =
    Math.round(response.data.main.temp) + `<span class="units">°C</span>`;
  currentSearchTemp.innerHTML = temperature;
  let description = document.querySelector("#decription");
  description.innerHTML = response.data.weather[0].description;
  let dateElement = document.querySelector("#current-date");
  dateElement.innerHTML = dateTime(response.data.dt * 1000);
  let iconElement = document.querySelector("#main-icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  celsiusTemperature = response.data.main.temp;
  humidity = response.data.main.humidity;
  windSpeed = response.data.wind.speed;

  getForecast(response.data.coord);
}

///Current geolocation
function myPosition(position) {
  let apiKey = "72bb9dab46b9ec3d65f423c63f27a9b8";
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let urlWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${apiKey}`;
  axios.get(urlWeather).then(locationWeather);
  temperatureRadio.checked = true;
}

function getcurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(myPosition);
}
let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getcurrentLocation);
/// temperature button radio

function backToTemperature(event) {
  event.preventDefault();
  let temperature = document.querySelector("#main-temp");
  temperature.innerHTML =
    Math.round(celsiusTemperature) + `<span class="units">°C</span>`;
}
let temperatureRadio = document.querySelector("#temp-radio");
temperatureRadio.addEventListener("change", backToTemperature);

/// precipitation button radio
let humidity = null;

function showHumidity(event) {
  event.preventDefault();
  let locationHumidity = document.querySelector("#main-temp");
  locationHumidity.innerHTML = humidity + `<span class="units">%</span>`;
}

let precipitationRadio = document.querySelector("#precipitation-radio");
precipitationRadio.addEventListener("change", showHumidity);

///wind button radio
let windSpeed = null;

function showWind(event) {
  event.preventDefault();
  let locationWind = document.querySelector("#main-temp");
  locationWind.innerHTML = windSpeed + `<span class="units">km/h</span>`;
}

let windRadio = document.querySelector("#wind-radio");
windRadio.addEventListener("change", showWind);
/// Forecast

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row gx-2 p-2">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
        <div class="col-sm">
                <div class="card forecast text-center shadow-sm border-0">
                  <div class="card-body bg-white p-2">
                    <h5 class="forecast-day-title">${formatDay(
                      forecastDay.dt
                    )}</h5>
                    <img 
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt="" class="weather_icon"
        />
                    <p class="forecast-temperature"><strong>${Math.round(
                      forecastDay.temp.max
                    )}°</strong>/${Math.round(forecastDay.temp.min)}°</p>
                  </div>
                </div>
                </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "7d478f69e1b2f5d563653f13f5f91d76";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
