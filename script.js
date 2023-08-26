const inputBox = document.querySelector(".input-box");
const searchBtn = document.getElementById("searchBtn");
const weather_img = document.querySelector(".weather-img");
const temperature = document.querySelector(".temperature");
const description = document.querySelector(".description");
const humidity = document.getElementById("humidity");
const wind_speed = document.getElementById("wind-speed");

const location_not_found = document.querySelector(".location-not-found");

const weather_body = document.querySelector(".weather-body");

async function checkWeather(city) {
  const api_key = "a6e89acabbmshaf360294fae79e7p156aa6jsn36e367ced5fe";
  const url = `https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${city}`;

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": api_key,
      "X-RapidAPI-Host": "weather-by-api-ninjas.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const weather_data = await response.json();

    if (weather_data.cod === "404") {
      location_not_found.style.display = "flex";
      weather_body.style.display = "none";
      console.log("error");
      return;
    }

    console.log("run");
    location_not_found.style.display = "none";
    weather_body.style.display = "flex";
    temperature.innerHTML = `${Math.round(weather_data.temp)}°C`;
    description.innerHTML = `${weather_data.weather[0].description}`;

    humidity.innerHTML = `${weather_data.humidity}%`;
    wind_speed.innerHTML = `${weather_data.wind_speed}Km/H`;

    switch (weather_data.weather[0].main) {
      case "Clouds":
        weather_img.src = "/assets/cloud.png";
        break;
      case "Clear":
        weather_img.src = "/assets/clear.png";
        break;
      case "Rain":
        weather_img.src = "/assets/rain.png";
        break;
      case "Mist":
        weather_img.src = "/assets/mist.png";
        break;
      case "Snow":
        weather_img.src = "/assets/snow.png";
        break;
    }

    console.log(weather_data);
  } catch (error) {
    console.error(error);
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(inputBox.value);
});
