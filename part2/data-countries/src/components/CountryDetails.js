import React, { useState, useEffect } from 'react'
import axios from 'axios'

import CapitalWeather from './CapitalWeather'

const CountryDetails = ({ country }) => {
  const [ weather, setWeather ] = useState({})

  const api_key = process.env.REACT_APP_WEATHER_API

  const hook = () => {
    async function fetchWeather(capital) {
      let weatherUrl = `http://api.weatherstack.com/current?access_key=${api_key}`
      let response = await axios.get(`${weatherUrl}&query=${capital}`)
      try {
        setWeather(response.data.current)
      } catch (error) {
        console.log(error)
      }
    }
    fetchWeather(country.capital)
  }

  useEffect(hook, [])

  return(
    <div>
      <h3>{ country.name }</h3>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>

      <h4>Languages</h4>
      <ul>
        { country.languages.map(l => <li key={l.iso639_1}>{l.name}</li>) }
      </ul>
      <img src={country.flag} alt={`${country.name} flag`} />
      { weather !== undefined ? <CapitalWeather weather={weather} /> : <div>Loading</div>}

    </div>
  )
}

export default CountryDetails
