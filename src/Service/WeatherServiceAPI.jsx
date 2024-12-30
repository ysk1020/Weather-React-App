export const fetchWeatherByCoordinates = async (latitude, longitude) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/weather?lat=${latitude}&lon=${longitude}&units=metric&exclude=hourly,daily&appid=${process.env.REACT_APP_API_KEY}`
    );
    const data = await response.json();
    console.log(data);
    return data;
  } catch (e) {
    console.error("Failed to fetch weather data", e);
    throw e;
  }
};

export const fetchWeatherByCity = async (city) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
    );
    const data = await response.json();
    console.log(data);
    return data;
  } catch (e) {
    console.error("Failed to fetch city data", e);
    throw e;
  }
};
