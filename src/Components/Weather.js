import React, { useState, useEffect } from "react";

function WeatherApp() {
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLat(position.coords.latitude);

      setLon(position.coords.longitude);
    });
  });

  useEffect(() => {
    if (lat && lon) {
      const fetchData = async () => {
        try {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&exclude=hourly,daily&appid=${process.env.REACT_APP_API_KEY}`
          );

          const data = await response.json();

          setWeatherData(data);

          console.log(data);
        } catch (err) {
          console.error("Failed to fetch weather data", err);
        }
      };

      fetchData();
    }
  }, [lat, lon]);

  return (
    <div className="md:container md:mx-auto p-64 bg-slate-200">
      {weatherData ? (
        <>
          <div className="">
            <h1>Location: {weatherData.name}</h1>
          </div>
          <div className="flex space-x-4">
            <div className="w-1/2 p-16 rounded-lg shadow-lg ">
              <p>Temperature: {weatherData.main.temp} C</p>
              <p>Feels Like: {weatherData.main.feels_like} C</p>
            </div>
            <div className="w-1/2 p-16  rounded-lg shadow-lg ">
              {" "}
              <div className="flex justify-between text-black">
                <p>Weather: {weatherData.weather[0].description}</p>
                <p>Sunrise: {weatherData.sys.sunrise}</p>
                <p>Sunset: {weatherData.sys.sunset}</p>
                <p>Humidity: {weatherData.main.humidity}</p>
                <p>Wind Velocity: {weatherData.wind.speed}</p>
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

export default WeatherApp;
