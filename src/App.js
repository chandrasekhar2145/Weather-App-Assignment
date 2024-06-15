import React, { useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';

const App = () => {
    const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const fetchWeather = async (city) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=fa086934b09dead6e824031f64f029c3`);
        setWeatherData(response.data);
        setError(null);
      } catch (err) {
        setError('Error');
        setWeatherData(null);
      }
    };

  const handleSearch = () => {
    fetchWeather(location);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={isDarkMode ? 'dark-mode' : 'light-mode'}>
      <div className="container">
      <img src="https://res.cloudinary.com/ddvqjo4f2/image/upload/v1718428972/cloudy_ip5r26.png" className="cloud-image" alt='img'/>
        <h1>Weather App</h1>
        <div className="search">
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter city name"
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        {error && <p className="error">{error}</p>}
        {weatherData && (
          <div className="weather-info">
            <h2>{weatherData.name}</h2>
            <p>{format(new Date(), 'PPPppp')}</p>
            <p>Temperature: {Math.round(weatherData.main.temp-273.25)} °C</p>
            <p>Humidity: {weatherData.main.humidity} %</p>
            <p>Wind Speed: {weatherData.wind.speed} m/s</p>
          </div>
        )}
        <button className="toggle-mode" onClick={toggleDarkMode}>
          Toggle {isDarkMode ? 'Light' : 'Dark'} Mode
        </button>
      </div>
    </div>
  );
};


export default App;