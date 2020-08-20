import React from 'react'

const CountryList = ({countries, action}) => {
  return(
    countries.length >= 10
    ? <p>Too many matches, specify another filter</p>
    : <ul>
        { countries.map(c =>
          (
            <li key={c.alpha3Code}>{c.name} <button onClick={() => action(c.name)}>show</button></li>
          ))
        }
      </ul>
  )
}

export default CountryList
