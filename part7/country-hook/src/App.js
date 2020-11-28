import React, { useState } from 'react'
import { useField, useCountry } from './hooks/index'

const Country = ({ country, name }) => {
  if (country && !name) {
    return (
      <div>
      Please, type the name of the country above.
      </div>
    )
  }
  if (!country && name & name.length) {
    return null
  }

  if (!country.match) {
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    <div>
      <h3>{country.country.name} </h3>
      <div>capital {country.country.capital} </div>
      <div>population {country.country.population}</div>
      <img src={country.country.flag} height='100' alt={`flag of ${country.country.name}`}/>
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    // console.log(country)
    setName(nameInput.value)
    country.set(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>


      <Country country={country} name={nameInput.value} />
    </div>
  )
}

export default App
