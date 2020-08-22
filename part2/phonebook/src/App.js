import React, { useState, useEffect } from 'react'
import personsService from './services/persons'

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
      const personList = await personsService.getAll()
      try {
        setPersons(personList)
      } catch (error) {
        console.log(error)
      }
    }
    fetchPersons()
  }

  useEffect(hook, [])

  const addPerson = async event => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }

    let personExists = persons.find(p => p.name.toLowerCase() === newPerson.name.toLowerCase())

    if(personExists) {
      let returnedPerson = await personsService.update(personExists.id, newPerson)
      try {
        setPersons(persons.map(person => person.id !== personExists.id ? person : returnedPerson))
      } catch (error) {
        console.log(error)
      }
    }
    else {
      let person = await personsService.create(newPerson)
      try {
        setPersons(persons.concat(person))
        setNewName('')
        setNewNumber('')
      } catch (error) {
        console.log(error)
      }
    }
  }

  const deletePerson = async id => {
    let personToRemove = persons.find(p => p.id === id)
    let deleteMessage = window.confirm(`Do you really want to remove ${personToRemove.name} ?`)

    if (deleteMessage) {
      try {
        let response = await personsService.remove(id)
        if (response.status === 200) {
          setPersons(persons.filter(p => p.id !== id))
        }
      } catch (error) {
        alert(`${personToRemove.name} was removed already`)
        setPersons(persons.filter(p => p.id !== id))
        console.log(error)
      }
    }
  }

  const handleNewName = event => {
    setNewName(event.target.value)
  }

  const handleNewNumber = event => {
    setNewNumber(event.target.value)
  }

  const handleSearch = event => {
    setSearch(event.target.value)
  }

  const list = persons
  const searchList = persons
    ? persons.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
    : []

  const displayList = searchList.length
    ? searchList
    : list

  return (
    <div>
      <h2>Phonebook</h2>
      <AddPersons add={addPerson} name={newName} phone={newNumber} handleName={handleNewName} handleNumber={handleNewNumber} />
      <Search term={search} action={handleSearch}/>
      <PersonList displayList={displayList} deletePerson={deletePerson}/>
    </div>
  )
}

export default App
