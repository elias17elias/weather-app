async function getWeather(location) {
    temp.style.display = "none";
    city.style.display = "none";
    icon.style.display = "none";
    description.style.display = "none";
    weatherContainer.style.display = "flex";
    loader.style.display = "block";
    if (input.value != "") window.localStorage.setItem("city", input.value);
    apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=7495ae5b93298e48d3cf3310908474e0`;
    try {
        let data = await fetch(apiUrl);
        data = await data.json();
        if (data.cod !== 200) {
            throw new Error(data.message);
        }
        description.style.display = "block";
        temp.style.display = "block";
        city.innerHTML = data.name;
        icon.style.display = "inline";
        temp.innerHTML = Math.round(data.main.temp - 273);
        description.innerHTML = data.weather[0].description;
        icon.setAttribute("src", `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
    } catch (error) {
        console.error("Weather API Error:", error.message);
        city.innerHTML = `Error: ${error.message}`;
        city.style.color = "red";
        setTimeout(() => {
            city.style.color = "white";
        }, 2000);
    } finally {
        city.style.display = "block";
        loader.style.display = "none";
    }
}

const loader = document.getElementById("loader");
const weatherContainer = document.querySelector(".weather-container");
const temp = document.querySelector(".temp");
const city = document.querySelector("h1");
const input = document.querySelector("[type='text']");
const search = document.querySelector("[type='submit']");
const icon = document.querySelector("img");
const description = document.querySelector(".description");

if (window.localStorage.getItem("city")) {
    getWeather(window.localStorage.getItem("city"));
}

search.onclick = function () {
    getWeather(input.value);
};
