import React, { useState } from "react";
import Weather from "./Components/Weather";
import NavBar from "./Components/NavBar.jsx";
export default function App() {
  const [weatherData, setWeatherData] = useState(null);
  return (
    <div>
      <NavBar setWeatherData={setWeatherData} />
      <Weather weatherData={weatherData} setWeatherData={setWeatherData} />
    </div>
  );
}
