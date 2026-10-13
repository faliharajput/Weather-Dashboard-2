const API_KEY = "3c96069c8391a03ca2a49b808558e956";

const searchForm = document.getElementById("searchForm");
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

// Weather information elements
const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const weatherDescription = document.getElementById("weatherDescription");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("windSpeed");
const feelsLike = document.getElementById("feelsLike");
const weatherIcon = document.getElementById("weatherIcon");
const message = document.getElementById("message");
console.log({
    cityName,
    temperature,
    weatherDescription,
    humidity,
    windSpeed,
    feelsLike,
    weatherIcon,
    message
});
// Fetch weather data
async function getWeather(city) {
    if (!city || !city.trim()) {
        message.textContent = "Please enter a city name.";
        return;
    }

    if (API_KEY === "YOUR_API_KEY") {
        message.textContent = "Please add your OpenWeatherMap API key.";
        return;
    }

    message.textContent = "Loading weather...";
    searchBtn.disabled = true;

    try {
        const url =
            `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city.trim())}&appid=${API_KEY}&units=metric`;

        const response = await fetch(url);
        const data = await response.json();

        console.log("API Status:", response.status);
        console.log("Weather Data:", data);

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error("City not found. Please check the spelling.");
            }

            if (response.status === 401) {
                throw new Error("API key is invalid or not activated yet.");
            }

            throw new Error(data.message || "Unable to fetch weather.");
        }

        // Update city and weather information
        cityName.textContent = `${data.name}, ${data.sys.country}`;
        temperature.textContent = `${Math.round(data.main.temp)}°C`;
        weatherDescription.textContent = data.weather[0].description;
        humidity.textContent = `${data.main.humidity}%`;
        windSpeed.textContent = `${data.wind.speed} m/s`;
        feelsLike.textContent = `${Math.round(data.main.feels_like)}°C`;

        // Display the weather icon
        weatherIcon.src =
            `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

        weatherIcon.alt = data.weather[0].description;

        message.textContent = "";
    } catch (error) {
        console.error("Weather Error:", error);
        message.textContent = error.message;
    } finally {
        searchBtn.disabled = false;
    }
}

// Search weather when the form is submitted
searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    getWeather(cityInput.value);
});

// Load Karachi weather when the page opens
getWeather("Karachi");