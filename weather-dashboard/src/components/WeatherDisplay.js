import React from 'react';

function WeatherDisplay({ weather }) {
  return (
    <div>
      <h2>Weather in {weather.city.name}</h2>
      <p>Current: {weather.list[0].main.temp}°</p>
      <h3>5-day Forecast:</h3>
      <ul>
        {weather.list.map((item, index) => (
          <li key={index}>
            {new Date(item.dt_txt).toLocaleDateString()}: {item.main.temp}°
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WeatherDisplay;
