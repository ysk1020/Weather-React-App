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
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
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
    <div>
      {weatherData ? (
        <div>
          <p>Location: {weatherData.name}</p>
          <p>Temperature: {weatherData.main.temp} C</p>
          <p>
            Weather:
            {weatherData.weather[0].description}
          </p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default WeatherApp;
