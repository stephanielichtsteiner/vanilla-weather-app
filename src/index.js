function formatDate(timestamp){
let date = new Date(timestamp);

let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[date.getDay()];
return `${day} ${formatHours(timestamp)}`;
}

function formatHours(timestamp){
    let date = new Date(timestamp);
let hours = date.getHours();
if (hours < 10){
    hours = `0${hours}`;
}
let minutes = date.getMinutes();
if (minutes < 10){
    minutes = `0${minutes}`;
}
    return `${hours}:${minutes}`;
}

function displayTemperature(response){
let temperatureElement = document.querySelector("#temperature");
let cityElement = document.querySelector("#city");
let descriptionElement = document.querySelector("#description");
let feltTemperature = document.querySelector("#felt-temperature");
let windSpeed = document.querySelector("#wind-speed");
let humidity = document.querySelector("#humidity");
let dateElement = document.querySelector("#date");
let iconElement = document.querySelector("#icon");

celsiusTemperature = response.data.main.temp;

temperatureElement.innerHTML = Math.round(celsiusTemperature);
cityElement.innerHTML = response.data.name;
descriptionElement.innerHTML = response.data.weather[0].description;
feltTemperature.innerHTML = Math.round(response.data.main.feels_like);
windSpeed.innerHTML = Math.round(response.data.wind.speed);
humidity.innerHTML = response.data.main.humidity;
dateElement.innerHTML = formatDate(response.data.dt * 1000);
iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
iconElement.setAttribute("alt", response.data.weather[0].description);
}

function displayForecast(response){
    let forecastElement = document.querySelector("#forecast");
    let forecast = null;
    forecastElement.innerHTML = '';

for (let index = 0; index < 6; index++){
    forecast = response.data.list[index];
forecastElement.innerHTML += `
    <div class="col-2">
      <div class="card saturday " style="">
        <h3>${formatHours(forecast.dt * 1000)}</h3>
        <div class="card-body">
        <div class="row text-center">
        <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" />
        </div>
            <p class="card-text"> ${Math.round(forecast.main.temp_max)}°C | ${Math.round(forecast.main.temp_min)}°C</p>
        </div>
    </div>
</div>
    `;
}
}

function search(city){
let apikey = "c3e2e398dc000b29ea3b92e856aeecfa";
let apiurl =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;

axios.get(apiurl).then(displayTemperature);

apiurl =`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apikey}&units=metric`;
axios.get(apiurl).then(displayForecast);
}

function handleSubmit(event){
    event.preventDefault();
    let cityNameElement = document.querySelector("#city-name");
search(cityNameElement.value);
}

function displayFahrenheitTemperature(event){
    event.preventDefault();
    let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event){
    event.preventDefault();
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
        let temperatureElement = document.querySelector("#temperature");
        temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#search");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("Berlin");
