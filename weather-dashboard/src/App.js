import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Search from './components/Search';
import WeatherDisplay from './components/WeatherDisplay';
import Favorites from './components/Favorites';
import './App.css';

function App() {
  const [weather, setWeather] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [city, setCity] = useState('');
  const [unit, setUnit] = useState('metric');
  
  const apiKey = '6bb23de30407abcf8413aa6492fae0de'; 

  const fetchWeather = useCallback((city) => {
    const weatherAPI = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=${apiKey}`;
    axios.get(weatherAPI)
      .then(response => {
        setWeather(response.data);
        setCity(city);
        localStorage.setItem('lastCity', city); 
      })
      .catch(error => {
        console.error("Error fetching weather data:", error);
      });
  }, [unit, apiKey]);

  useEffect(() => {
    const savedCity = localStorage.getItem('lastCity');
    if (savedCity) {
      fetchWeather(savedCity);
    }

    axios.get("http://localhost:5000/favorites")
      .then(response => {
        setFavorites(response.data);
      })
      .catch(error => {
        console.error("Error fetching favorite cities:", error);
      });
  }, [fetchWeather]);

  const toggleUnit = () => {
    const newUnit = unit === 'metric' ? 'imperial' : 'metric';
    setUnit(newUnit);
    if (city) {
      fetchWeather(city);
    }
  };

  return (
    <div className="App">
      <h1>Weather Dashboard</h1>
      
      <button onClick={toggleUnit}>
        Switch to {unit === 'metric' ? 'Fahrenheit' : 'Celsius'}
      </button>

      <Search fetchWeather={fetchWeather} />

      {weather && <WeatherDisplay weather={weather} />}

      <Favorites favorites={favorites} setFavorites={setFavorites} fetchWeather={fetchWeather} />
    </div>
  );
}

export default App;
