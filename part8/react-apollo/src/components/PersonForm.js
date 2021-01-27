import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_PERSONS, CREATE_PERSON } from '../queries'

const PersonForm = ({ setError }) => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')

  // const [ createPerson ] = useMutation(CREATE_PERSON)
  // The way below will refetch the query as soon as a new person is added
  const [ createPerson ] = useMutation(CREATE_PERSON, {
    // To simply refetch the query
    // refetchQueries: [ { query: ALL_PERSONS } ],
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    },
    // To compare with what's in store and refetch only if needed
    update: (store, response) => {
      const dataInStore = store.readQuery({ query: ALL_PERSONS })
      store.writeQuery({
        query: ALL_PERSONS,
        data: {
          ...dataInStore,
          allPersons: [ ...dataInStore.allPersons, response.data.addPerson ]
        }
      })
    }
  })

  const submit = (event) => {
    event.preventDefault()

    createPerson({
      variables: {
        name, street, city,
        phone: phone.length ? phone : null
      }
    })

    setName('')
    setPhone('')
    setStreet('')
    setCity('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={submit}>
        <div>
          name <input value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          phone <input value={phone}
            onChange={({ target }) => setPhone(target.value)}
          />
        </div>
        <div>
          street <input value={street}
            onChange={({ target }) => setStreet(target.value)}
          />
        </div>
        <div>
          city <input value={city}
            onChange={({ target }) => setCity(target.value)}
          />
        </div>
        <button type='submit' disabled={!name.length || !street.length || !city.length}>add!</button>
      </form>
    </div>
  )
}

export default PersonForm
