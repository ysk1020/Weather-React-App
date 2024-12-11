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
  function convertToRealTime(unixTimestamp) {
    const date = new Date(unixTimestamp * 1e3);
    const localized = date.toLocaleTimeString([], "en-US");
    return localized;
  }

  return (
    <div className="md:container md:mx-auto p-64 bg-slate-200">
      <div className="md:container md:mx-auto search-bar  flex items-center justify-center space-x-5 ">
        <input
          className=" p-2 rounded-lg w-2/4 "
          type="text"
          name="searcbar"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Search..."
        />

        <button
          className=" p-2 rounded-lg bg-lime-500 hover:bg-slate-600"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      {weatherData ? (
        <>
          <div className="p-10 rounded-lg ">
            <h1>
              Weather in {weatherData.name}, {weatherData.sys.country}
            </h1>
          </div>
          <div className="flex space-x-4">
            <div className="w-10/12 p-16 rounded-lg shadow-lg ">
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
              <div className="grid grid-cols-3 gap-6 place-content-evenly text-black">
                <div className="flex flex-col">
                  <p>{weatherData.main.temp_max}°C</p>
                  <p>High</p>
                </div>
                <div className="flex flex-col">
                  <p>{weatherData.main.humidity}</p>
                  <p>Humidity</p>
                </div>
                <div className="flex flex-col">
                  <p>{convertToRealTime(weatherData.sys.sunrise)}</p>
                  <p>Sunrise</p>
                </div>

                <div className="flex flex-col">
                  <p>{weatherData.main.temp_min}°C</p>
                  <p>Low</p>
                </div>

                <div className="flex flex-col">
                  <p>{weatherData.wind.speed} km/h</p>
                  <p>Velocity</p>
                </div>
                <div className="flex flex-col">
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

export default WeatherApp;
