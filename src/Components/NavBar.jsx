import React, { useState } from "react";
import { MdMyLocation } from "react-icons/md";
import { fetchWeatherByCity } from "../Service/WeatherServiceAPI";

function NavBar({ setWeatherData }) {
  const [city, setCity] = useState("");

  const [location, setLocation] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    fetchWeatherByCity(city)
      .then(setWeatherData)
      .catch((error) => console.error(error));
  };

  const handleCurrentLocation = (e) => {
    e.preventDefault();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    } else {
      throw new Error(e.massage);
    }
  };

  return (
    <nav className="md:container md:mx-auto search-bar  flex items-center justify-center space-x-5 ">
      {/* TODO - do not work */}
      <button className="" onClick={handleCurrentLocation}>
        <MdMyLocation />
      </button>
      <input
        name="searchbar"
        type="text"
        placeholder="Search..."
        className=" p-2 rounded-lg w-2/4 "
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button
        className=" p-2 rounded-lg bg-lime-500 hover:bg-slate-600"
        onClick={handleSearch}
      >
        Search
      </button>
    </nav>
  );
}

export default NavBar;
