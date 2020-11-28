import { useState, useEffect } from 'react'
import axios from 'axios'


export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = event => {
    setValue(event.target.value)
  }

  return {
    type, value, onChange
  }
}


export const useCountry = (name) => {
  const [country, setCountry] = useState(null)
  const [countryName, setCountryName] = useState('')
  const [match, setMatch] = useState(false)

  const hook = () => {
    async function fetchCountries() {
      console.log('called')
      if (!countryName) return

      try {
        let matchCountry = await axios.get(`https://restcountries.eu/rest/v2/name/${countryName}`)
        if (matchCountry) {
          setCountry(...matchCountry.data)
          console.log(...matchCountry.data)
          setMatch(true)
        }
      } catch (error) {
        console.log(error)
        setCountry(null)
        setMatch(false)
      }

    }
    fetchCountries()
  }

  useEffect(hook, [countryName])

  const set = name => {
    setCountryName(name)
  }

  return {
    country, match, set
  }
}
