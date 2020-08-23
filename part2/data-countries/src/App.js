import React, { useState, useEffect } from 'react'
import axios from 'axios'

import './App.css'
import Search from './components/Search'
import CountryDetails from './components/CountryDetails'
import CountryList from './components/CountryList'

const App = () => {
  const [ allCountries, setAllCountries ] = useState([])
  const [ countryList, setCountryList ] = useState([])
  const [ country, setCountry ] = useState({})
  const [ search, setSearch ] = useState('')

  const hook = () => {
    async function fetchCountries() {
      let response = await axios.get('https://restcountries.eu/rest/v2/all')
      try {
        setAllCountries(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchCountries()
  }

  useEffect(hook, [])

  const handleSearch = event => {
    setSearch(event.target.value)
    setCountryList(allCountries.filter(cnt => cnt.name.toLowerCase().includes(search.toLowerCase())))
    setCountry(countryList[0])
  }

  const handleSelectCountry = name => {
    let country = countryList.find(ct => name === ct.name)
    setCountry(country)
    setCountryList([country])
  }

  // const countryListToShow = showAll
  // ? notes
  // : notes.filter(note => note.important)

  // const matchCountries = countryList.map((cnt) => <li key={cnt.alpha3Code}>{cnt.name}</li>)

  return (
    <div className="App">
      <h2>Data for countries</h2>
      <Search term={search} action={handleSearch}/>
      { countryList.length === 1 && search.length !== 0
        ? <CountryDetails country={country} />
        : <CountryList countries={countryList} action={handleSelectCountry} />
      }
    </div>
  )
}

export default App
