import React, { useState, useRef, useEffect } from 'react'
import { fetchSimpleView, fetchFullView } from './api/fetchWeather'
import { fetchGeolocation } from './api/fetchGeolocation';
import './reset.css'
import './App.css'
import DailyWeather from './components/dailyWeather'


export default function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState('');
  const [forecast, setForecast] = useState('');
  const [fullView, setFullView] = useState(false);
  let input = useRef(null);

  const search = async (e) => {
    if (e.key === 'Enter') {
      const data = await fetchSimpleView(query);
      //const dataFull = await fetchFullView(query);
      //console.log(dataFull)
      setWeather(data);
      //setQuery('');
      setFullView(false);
    }
  }

  const handleButtonClick = async () => {
    const locationData = await fetchGeolocation(query);
    const { lat, lng } = locationData.results[0].geometry;
    const data = await fetchFullView(lat, lng);
    console.log(data)
    setForecast(data);
    setFullView(!fullView);
  }

  const convertToDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleString('pl',
      {
        weekday: 'long',
        day: 'numeric',
        month: 'short'
      })
  }

  useEffect(() => {
    input.current.focus();
  }, [])

  return (
    <div className="main-container">
      <input
        className="main-container__input"
        type="text"
        placeholder="Podaj miasto..."
        ref={input}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={search}
      />
      {weather.main && (
        <>
          <div className="weather">
            <div className="weather__city-info">
              <span className="weather__city-name">{weather.name}, {weather.sys.country}</span>
              <p className="weather_city-description">{weather.weather[0].description}</p>
            </div>
            <div className="weather__image-container">
              <img
                className="weather__image-picture"
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
                alt={weather.weather[0].description}
              />
            </div>
            <div className="weather__temp">
              <div className="weather__temp-current">
                <h2 className="weather__temp-current-info">
                  {Math.round(weather.main.temp)}
                  <sup>&deg;C</sup>
                </h2>
              </div>
              <div className="weather__temp-today">
                <h3 className="weather__temp-today-max">
                  {Math.round(weather.main.temp_max)}
                  <sup>&deg;C</sup>
                </h3>
                <h3 className="weather__temp-today-min">
                  {Math.round(weather.main.temp_min)}
                  <sup>&deg;C</sup>
                </h3>
              </div>
            </div>
            <div className="weather__details">
              <h3 className="weather__details-pressure">
                <i className="fas fa-compress-alt"></i>
                <sup>{weather.main.pressure} hPa</sup>
              </h3>
              <h3 className="weather__details-wind">
                <i className="fas fa-wind"></i>
                <sup>{weather.wind.speed} km/h</sup>
              </h3>
              <h3 className="weather__details-humidity">
                <i className="fas fa-tint"></i>
                <sup>{weather.main.humidity} %</sup>
              </h3>
            </div>
          </div>
          {!fullView
            ? (
              <button className="main-container__button" onClick={handleButtonClick}>
                Pokaż więcej
              </button>
            )
            : (
              <section className="daily-forecast weather">
                <h1 className="daily-forecast__title">Następne 7 dni</h1>
                {forecast.daily.slice(1).map(item => (
                  <DailyWeather
                    key={item.dt}
                    date={convertToDate(item.dt)}
                    img={item.weather[0].icon}
                    imgAlt={item.weather[0].description}
                    maxTemp={item.temp.max}
                    minTemp={item.temp.min}
                  />
                ))}
              </section>
            )}
        </>
      )}

    </div>
  )
}
