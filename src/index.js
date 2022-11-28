/// Get current date and time

function dateTime() {
  let now = new Date();
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
  let appDate = `${days[day]}, ${dayMonth}. ${months[month]}  ${hour}:${minutes}`;
  let currentDate = document.querySelector("#current-date");
  currentDate.innerHTML = appDate;
}
dateTime();

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

function CelusToFarenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector("#main-temp");
  let farenheitTemp = temperature.innerHTML;
  temperature.innerHTML = Math.round((farenheitTemp * 9) / 5 + 32);
}
let farenheit = document.querySelector("#fahrenheit-link");
farenheit.addEventListener("click", CelusToFarenheit);

/// Farenheit to Celsius

function FarenheitToCelsius(event) {
  event.preventDefault();
  let temperature = document.querySelector("#main-temp");
  let celsiusTemp = temperature.innerHTML;
  temperature.innerHTML = `21`;
}
let celsius = document.querySelector("#celsius-link");
celsius.addEventListener("click", FarenheitToCelsius);

/// Display searching city and temperature part 2

function locationWeather(response) {
  let currentSearchTemp = document.querySelector("#main-temp");
  let temperature = Math.round(response.data.main.temp);
  currentSearchTemp.innerHTML = `${temperature}`;
  let description = document.querySelector("#decription");
  description.innerHTML = response.data.weather[0].description;
}

///Current geolocation
function myPosition(position) {
  let apiKey = "72bb9dab46b9ec3d65f423c63f27a9b8";
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let urlWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${apiKey}`;
  axios.get(urlWeather).then(showWeather);
}

function showWeather(response) {
  let currentgeoTemp = document.querySelector("#main-temp");
  let temperature = Math.round(response.data.main.temp);
  currentgeoTemp.innerHTML = temperature;
  let currentGeoLocation = document.querySelector("#app-city");
  currentGeoLocation.innerHTML = response.data.name;
  let description = document.querySelector("#decription");
  description.innerHTML = response.data.weather[0].description;
}

function getcurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(myPosition);
}
let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getcurrentLocation);
