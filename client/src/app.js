import React, { useEffect, useState } from "react";
import WeatherCard from "./components/weatherCard";
import HistoryToday from "./components/HistoryToday";
import CityInput from "./components/CityInput";
import "./App.css";
import axios from "axios";

function App() {
  const [weather, setWeather] = useState(null);
  const [history, setHistory] = useState(null);
  const [city, setCity] = useState(() => {
    return localStorage.getItem("lastCity") || "Nairobi";
  });
  
  const [loading, setLoading] = useState(true);

  const getWeatherMood = (description) => {
    if (!description) return "mood-default";
    const desc = description.toLowerCase();
    if (desc.includes("clear")) return "mood-clear";
    if (desc.includes("cloud")) return "mood-cloudy";
    if (desc.includes("rain")) return "mood-rainy";
    if (desc.includes("thunder")) return "mood-thunder";
    if (desc.includes("snow")) return "mood-snowy";
    return "mood-default";
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const weatherRes = await axios.get(`http://localhost:5000/api/weather?city=${city}`);
        const historyRes = await axios.get("http://localhost:5000/api/history");
        setWeather(weatherRes.data);
        setHistory(historyRes.data);
        localStorage.setItem("lastCity", city); 
      } catch (err) {
        console.error("Error fetching data", err);
      }
      setLoading(false);
    };
    fetchData();
  }, [city]);

  return (
    <div className={`App ${getWeatherMood(weather?.description)}`}>
      <h1>🌤️ VibeTime</h1>
      <CityInput setCity={setCity} />
      {loading ? (
        <p className="loading-text">Loading vibes... 🌦️</p>
      ) : (
        <>
          <WeatherCard weather={weather} />
          <HistoryToday history={history} />
        </>
      )}
    </div>
  );
}

export default App;
