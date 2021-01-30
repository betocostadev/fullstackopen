import React, { useState, useEffect } from 'react'
import { useQuery, useApolloClient, useSubscription } from '@apollo/client'
import { ALL_PERSONS, PERSON_ADDED } from './queries'

import LoginForm from './components/LoginForm'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import PhoneForm from './components/PhoneForm'

const App = () => {
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const result = useQuery(ALL_PERSONS)
  const client = useApolloClient()
  // This way will refetch every 2000 miliseconds
  // const result = useQuery(ALL_PERSONS, {
  //   pollInterval: 2000
  // })

  useEffect(() => {
    if ( !token ) {
      const auth = localStorage.getItem('phonenumbers-user-token', token)
      if (auth) {
        setToken(auth)
      }
    }
  }, []) // eslint-disable-line

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  // Update the cache after a new subscription of a person added is fired
  const updateCacheWith = (addedPerson) => {
    const includedIn = (set, object) =>
      set.map(p => p.id).includes(object.id)

    const dataInStore = client.readQuery({ query: ALL_PERSONS })
    if (!includedIn(dataInStore.allPersons, addedPerson)) {
      client.writeQuery({
        query: ALL_PERSONS,
        data: { allPersons : dataInStore.allPersons.concat(addedPerson) }
      })
    }
  }

  // Fire subscription and action when a new person is added
  useSubscription(PERSON_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedPerson = subscriptionData.data.personAdded
      notify(`${addedPerson.name} added`)
      updateCacheWith(addedPerson)
    }
  })

  if (!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <h2>Login</h2>
        <LoginForm
          setToken={setToken}
          setError={notify}
        />
      </div>
    )
  }

  if (result.loading)  {
    return <div>loading...</div>
  }

  return (
    <div>
      <button onClick={logout}>logout</button>
      <Notify errorMessage={errorMessage} />
      <Persons persons={result.data.allPersons} />
      <PersonForm setError={notify} />
      <PhoneForm setError={notify} />
    </div>
  )
}

const Notify = ({ errorMessage }) => {
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
