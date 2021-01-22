import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_PERSONS } from './queries'

import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import PhoneForm from './components/PhoneForm'

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const result = useQuery(ALL_PERSONS)
  // This way will refetch every 2000 miliseconds
  // const result = useQuery(ALL_PERSONS, {
  //   pollInterval: 2000
  // })

  if (result.loading)  {
    return <div>loading...</div>
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <Persons persons={result.data.allPersons} />
      <PersonForm setError={notify} />
      <PhoneForm setError={notify} />
    </div>
  )
}

const Notify = ({errorMessage}) => {
  const styles = {
    padding: '1rem',
    position: 'fixed',
    top: '10%',
    left: '40%',
    color: 'red',
    borderRadius: '5%',
    boxShadow: '4px 6px 5px 2px rgba(0,0,0,0.75)'
  }
  if ( !errorMessage ) {
    return null
  }
  return (
    <div style={styles}>
    {errorMessage}
    </div>
  )
}

export default App
