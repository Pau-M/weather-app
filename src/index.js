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
  return `${days[day]}, ${dayMonth}. ${months[month]}  ${hour}:${minutes}`;
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
  return `${days[day]}, ${dayMonth}. ${months[month]}  ${hour}:${minutes}`;
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
}
let city = document.querySelector("#city-search");
city.addEventListener("submit", cityName);

/// Celsius to Farenheit
let celsiusTemperature = null;

function CelusToFarenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector("#main-temp");

  let farenheitTemp = Math.round((celsiusTemperature * 9) / 5 + 32);

  temperature.innerHTML = farenheitTemp;
  celsius.classList.remove("active");
  farenheit.classList.add("active");
}
let farenheit = document.querySelector("#fahrenheit-link");
farenheit.addEventListener("click", CelusToFarenheit);

/// Farenheit to Celsius

function FarenheitToCelsius(event) {
  event.preventDefault();
  celsius.classList.add("active");
  farenheit.classList.remove("active");
  let temperature = document.querySelector("#main-temp");
  temperature.innerHTML = Math.round(celsiusTemperature);
}
let celsius = document.querySelector("#celsius-link");
celsius.addEventListener("click", FarenheitToCelsius);

/// Display searching city and temperature part 2

function locationWeather(response) {
  console.log(response.data);
  let location = document.querySelector("#app-city");
  location.innerHTML = response.data.name;
  let currentSearchTemp = document.querySelector("#main-temp");
  let temperature = Math.round(response.data.main.temp);
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
}

///Current geolocation
function myPosition(position) {
  let apiKey = "72bb9dab46b9ec3d65f423c63f27a9b8";
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let urlWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${apiKey}`;
  axios.get(urlWeather).then(locationWeather);
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
  temperature.innerHTML = Math.round(celsiusTemperature);
  let unit = document.querySelector("#unit");
  unit.style.display = "inline";
  let newUnits = document.querySelector("#test");
  newUnits.innerHTML = null;
}
let temperatureRadio = document.querySelector("#temp-radio");
temperatureRadio.addEventListener("change", backToTemperature);

/// precipitation button radio
let humidity = null;

function showHumidity(event) {
  event.preventDefault();
  let locationHumidity = document.querySelector("#main-temp");
  locationHumidity.innerHTML = `${humidity}`;
  let unit = document.querySelector("#unit");
  unit.style.display = "none";
  let humUnit = document.querySelector("#test");
  humUnit.innerHTML = "%";
}

let precipitationRadio = document.querySelector("#precipitation-radio");
precipitationRadio.addEventListener("change", showHumidity);

///wind button radio
let windSpeed = null;

function showWind(event) {
  event.preventDefault();
  let locationWind = document.querySelector("#main-temp");
  locationWind.innerHTML = `${windSpeed}`;
  let unit = document.querySelector("#unit");
  unit.style.display = "none";
  let windUnit = document.querySelector("#test");
  windUnit.innerHTML = "km/h";
}

let windRadio = document.querySelector("#wind-radio");
windRadio.addEventListener("change", showWind);
