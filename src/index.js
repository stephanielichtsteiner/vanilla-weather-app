function displayTemperature(response){
    console.log(response.data);
let temperatureElement = document.querySelector("#temperature");
let cityElement = document.querySelector("#city");
let descriptionElement = document.querySelector("#description");
let feltTemperature = document.querySelector("#felt-temperature");
let windSpeed = document.querySelector("#wind-speed");
let humidity = document.querySelector("#humidity");
temperatureElement.innerHTML = Math.round(response.data.main.temp);
cityElement.innerHTML = response.data.name;
descriptionElement.innerHTML = response.data.weather[0].description;
feltTemperature.innerHTML = Math.round(response.data.main.feels_like);
windSpeed.innerHTML = Math.round(response.data.wind.speed);
humidity.innerHTML = response.data.main.humidity;
}


let apikey = "c3e2e398dc000b29ea3b92e856aeecfa";
let apiurl =`https://api.openweathermap.org/data/2.5/weather?q=brugg&appid=${apikey}&units=metric`;

axios.get(apiurl).then(displayTemperature);