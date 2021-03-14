function formatDate(timestamp){
let date = new Date(timestamp);
let hours = date.getHours();
if (hours < 10){
    hours = `0${hours}`;
}
let minutes = date.getMinutes();
if (minutes < 10){
    minutes = `0${minutes}`;
}
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
let day = days[date.getDay()];
return `${day} ${hours}:${minutes}`;
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
temperatureElement.innerHTML = Math.round(response.data.main.temp);
cityElement.innerHTML = response.data.name;
descriptionElement.innerHTML = response.data.weather[0].description;
feltTemperature.innerHTML = Math.round(response.data.main.feels_like);
windSpeed.innerHTML = Math.round(response.data.wind.speed);
humidity.innerHTML = response.data.main.humidity;
dateElement.innerHTML = formatDate(response.data.dt * 1000);
iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
iconElement.setAttribute("alt",response.data.weather[0].description);
}


let apikey = "c3e2e398dc000b29ea3b92e856aeecfa";
let city = "kiev";
let apiurl =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;

axios.get(apiurl).then(displayTemperature);