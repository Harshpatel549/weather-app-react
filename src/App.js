import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("toronto");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=f8eb1296fa7117e36cb1d4a7e971f1fc&units=metric`;
  const imageUrl = `https://source.unsplash.com/1600x900/?${location}`;

  const searchLocation = (e) => {
    if (e.key === "Enter")
      axios.get(url).then((response) => {
        setData(response.data);
      }).catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    axios.get(url).then((response) => {
      setData(response.data);
    });
  },[]);

  return (
    <div className="app">
      <div className="search">
        <input
          type="text"
          value={location}
          placeholder="Enter Location"
          onChange={(e) => setLocation(e.target.value)}
          on
          onKeyPress={searchLocation}
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            <h1>{data.main ? data.main.temp : null} °C</h1>
            <div className="description">
              <p>{data.weather ? data.weather[0].main : null}</p>
            </div>
          </div>
        </div>
        <div className="bottom">
          <div className="feels">
            <p className="bold">{data.main ? data.main.feels_like : null} °C</p>
            <p>Feels Like</p>
          </div>
          <div className="humidity">
            <p className="bold">{data.main ? data.main.humidity : null}%</p>
            <p>Humidity</p>
          </div>
          <div className="wind">
            <p className="bold">{data.wind ? data.wind.speed : null} KPH</p>
            <p>Wind Speed</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;
