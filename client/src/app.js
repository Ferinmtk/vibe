import React, { useEffect, useState } from "react";
import WeatherCard from "./components/WeatherCard";
import HistoryToday from "./components/HistoryToday";
import CityInput from "./components/CityInput";
import "./App.css";
import axios from "axios";

function App() {
  const [weather, setWeather] = useState(null);
  const [history, setHistory] = useState(null);
  const [city, setCity] = useState("Nairobi");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const weatherRes = await axios.get(`http://localhost:5000/api/weather?city=${city}`);
        const historyRes = await axios.get("http://localhost:5000/api/history");
        setWeather(weatherRes.data);
        setHistory(historyRes.data);
      } catch (err) {
        console.error("Error fetching data", err);
      }
      setLoading(false);
    };

    fetchData();
  }, [city]);

  return (
    <div className="App">
      <h1>🌤️ VibeTime</h1>
      <CityInput setCity={setCity} />
      {loading ? (
        <p>Loading vibes...</p>
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
