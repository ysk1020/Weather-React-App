import React, { useState, useEffect } from "react";
import { fetchWeatherByCoordinates } from "../Service/WeatherServiceAPI";

function Weather({ weatherData, setWeatherData }) {
  const [location, setLocation] = useState({ latitude: null, longitude: null });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
  });

  useEffect(() => {
    if ((location.latitude, location.longitude)) {
      fetchWeatherByCoordinates(location.latitude, location.longitude)
        .then((data) => setWeatherData(data))
        .catch((err) => console.error(err));
    }
  }, [location.latitude, location.longitude]);

  const convertToRealTime = (unixTimestamp) => {
    const date = new Date(unixTimestamp * 1e3);
    const localized = date.toLocaleTimeString([], "en-US");
    return localized;
  };
  //TODO - tailwind better implementation
  return (
    <div className=" flex-auto md:container md:mx-auto px-64">
      {weatherData ? (
        <>
          <div className="p-10 rounded-lg ">
            <h1 className="font-semibold text-4xl">
              {weatherData.name}, {weatherData.sys.country}
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className=" flex items-center space-x-60 w-10/12 p-16 rounded-lg shadow-lg ">
              <img
                src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
                alt="Weather icon"
                className="w-16 h-16"
              />
              <div className="font-semibold">
                <h1 className="text-8xl">{weatherData.main.temp}°C</h1>
                <p className="">Feels Like: {weatherData.main.feels_like}°C</p>
                <p>{weatherData.weather[0].description.toString()}</p>
              </div>
            </div>
            <div className="w-10/12 p-17 rounded-lg shadow-lg font-semibold ">
              {" "}
              <div className="grid grid-cols-3 gap-6 place-content-evenly  text-black">
                <div className="flex flex-col text-lg">
                  <p>{weatherData.main.temp_max}°C</p>
                  <p>High</p>
                </div>
                <div className="flex flex-col text-lg">
                  <p>{weatherData.main.humidity}</p>
                  <p>Humidity</p>
                </div>
                <div className="flex flex-col text-lg">
                  <p>{convertToRealTime(weatherData.sys.sunrise)}</p>
                  <p>Sunrise</p>
                </div>

                <div className="flex flex-col text-lg">
                  <p>{weatherData.main.temp_min}°C</p>
                  <p>Low</p>
                </div>

                <div className="flex flex-col text-lg">
                  <p>{weatherData.wind.speed} km/h</p>
                  <p>Velocity</p>
                </div>
                <div className="flex flex-col text-lg">
                  <p>{convertToRealTime(weatherData.sys.sunset)}</p>
                  <p>Sunset</p>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Weather;
