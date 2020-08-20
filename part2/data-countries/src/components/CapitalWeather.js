import React from 'react'


const CapitalWeather = ({weather}) => {
  return (
    <div>
      <p>{weather.weather_descriptions}</p>
      <p><strong>Temperature:</strong> {weather.temperature} Celcius</p>
      { weather.weather_icons ? <img className="weather-icon" src={weather.weather_icons} alt="icon" /> : <div></div> }
      <p><strong>Wind:</strong> {weather.wind_speed} mph, direction {weather.wind_dir}</p>
    </div>
  )
}

export default CapitalWeather


