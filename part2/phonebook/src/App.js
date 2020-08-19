import React, { useState, useEffect } from 'react'
import axios from 'axios'

import PersonList from './components/PersonList'
import Search from './components/Search'
import AddPersons from './components/AddPersons'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ search, setSearch ] = useState('')

  const hook = () => {
    async function fetchPersons() {
      let response = await axios.get('http://localhost:3001/persons')
      try {
        setPersons(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchPersons()
  }

  useEffect(hook, [])

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      id: persons.length + 1,
      name: newName,
      number: newNumber
    }

    let personExists = persons.find(p => p.name.toLowerCase() === newPerson.name.toLowerCase())

    if(personExists) {
      alert(`${newPerson.name} is already in the Phonebook!`)
      setNewName('')
      setNewNumber('')
    } else {
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearch = event => {
    setSearch(event.target.value)
  }

  const list = persons
  const searchList = persons
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()))

  const displayList = searchList.length
    ? searchList
    : list

  return (
    <div>
      <h2>Phonebook</h2>
      <AddPersons add={addPerson} name={newName} phone={newNumber} handleName={handleNewName} handleNumber={handleNewNumber} />
      <Search term={search} action={handleSearch}/>
      <PersonList displayList={displayList} />
    </div>
  )
}

export default App
