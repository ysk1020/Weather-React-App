import React, { useState, useEffect } from "react";

function WeatherApp() {
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("");

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

  const handleSearch = async () => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
    );
    const data = await response.json();
    setWeatherData(data);
  };

  return (
    <div className="md:container md:mx-auto p-64 bg-slate-200">
      <div className="search-bar md:mx-auto">
        <input
          className=" p-2 rounded-lg"
          type="text"
          name="searcbar"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Search..."
        />
        <button className=" p-2 rounded-lg" onClick={handleSearch}>
          Search
        </button>
      </div>
      {weatherData ? (
        <>
          <div className="p-10 rounded-lg ">
            <h1>Weather in {weatherData.name}</h1>
          </div>
          <div className="flex space-x-4">
            <div className="w-10/12 p-16 rounded-lg shadow-lg ">
              {/* <WeatherIcon iconId={weatherData.weather[0].id.toString()} /> */}
              <img
                src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
                alt="Weather icon"
              />
              <p>{weatherData.main.temp}°C</p>
              <p>Feels Like: {weatherData.main.feels_like}°C</p>
              <p>Weather: {weatherData.weather[0].description}</p>
            </div>
            <div className="w-10/12 p-16  rounded-lg shadow-lg ">
              {" "}
              <div className="flex justify-between text-black">
                <p>Sunrise: {weatherData.sys.sunrise}</p>
                <p>Sunset: {weatherData.sys.sunset}</p>
                <p>Humidity: {weatherData.main.humidity}</p>
                <p>Velocity: {weatherData.wind.speed}</p>
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
