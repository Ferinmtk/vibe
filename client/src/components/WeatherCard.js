import React from "react";

export default function WeatherCard({ weather }) {
  if (!weather || weather.error) return <p>Weather data not available.</p>;

  return (
    <div className="weather-card">
      <h2>{weather.city}</h2>
      <p>{weather.temperature}°C</p>
      <p>{weather.description}</p>
      <img
        src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
        alt="weather icon"
      />
    </div>
  );
}
