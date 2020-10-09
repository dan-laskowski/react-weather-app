import React from 'react'

export default function DailyWeather({ date, img, imgAlt, minTemp, maxTemp }) {
  return (
    <section className="daily-forecast__item">
      <div className="daily-forecast__picture-date">
        <img
          className="daily-forecast__image-picture"
          src={`https://openweathermap.org/img/wn/${img}@2x.png`}
          alt={imgAlt}
        />
        <h3 className="daily-forecast__date">
          {date}
        </h3>
      </div>
      <div className="daily-forecast__temp">
        <h3 className="daily-forecast__temp-max">
          {Math.round(maxTemp)}
          <sup>&deg;</sup>
        </h3>
        <h3 className="daily-forecast__temp-min">
          {Math.round(minTemp)}
          <sup>&deg;</sup>
        </h3>
      </div>
    </section>
  )
}
