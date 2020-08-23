import React, { useState, useEffect } from 'react'
import personsService from './services/persons'

import PersonList from './components/PersonList'
import Search from './components/Search'
import AddPersons from './components/AddPersons'
import Notification from './components/Notification'

import './App.css'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ search, setSearch ] = useState('')
  const [ notifyMessage, setNotifyMessage] = useState(null)
  const [ notifyType, setNotifyType ] = useState(null)

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
        showNotification('update-success', newPerson.name)
        clearAddFields()
      } catch (error) {
        showNotification('update-error', newPerson.name)
        console.log(error)
        clearAddFields()
      }
    }
    else {
      let person = await personsService.create(newPerson)
      try {
        setPersons(persons.concat(person))
        showNotification('add-success', person.name)
        clearAddFields()
      } catch (error) {
        showNotification('add-error', person.name)
        clearAddFields()
      }
    }
  }

  const deletePerson = async id => {
    let personToRemove = persons.find(p => p.id === id)
    let deleteMessage = window.confirm(`Do you really want to remove ${personToRemove.name} ?`)

    if (deleteMessage) {
      let response = await personsService.remove(id)
      try {
        if (response.status === 200) {
          setPersons(persons.filter(p => p.id !== id))
          showNotification('delete-success', personToRemove.name)
        }
      } catch (error) {
        showNotification('delete-error', personToRemove.name)
        setPersons(persons.filter(p => p.id !== id))
        console.log(error)
      }
    }
  }

  const showNotification = (type, content) => {
    if (type === 'add-error') {
      setNotifyMessage('Error adding person to Phonebook')
      setNotifyType('error')
      clearNotifications()
    }
    else if(type === 'add-success') {
      setNotifyMessage(`${content} added to Phonebook`)
      setNotifyType('success')
      clearNotifications()
    }
    else if(type === 'update-success') {
      setNotifyMessage(`${content} phone updated`)
      setNotifyType('success')
      clearNotifications()
    }
    else if(type === 'update-error') {
      setNotifyMessage(`Error updating ${content}`)
      setNotifyType('error')
      clearNotifications()
    }
    else if(type === 'delete-success') {
      setNotifyMessage(`${content} removed from Phonebook`)
      setNotifyType('success')
      clearNotifications()
    }
    else if(type === 'delete-error') {
      setNotifyMessage(`${content} information not found on server`)
      setNotifyType('error')
      clearNotifications()
    }
  }

  const clearNotifications =() => {
    setTimeout(() => {
      setNotifyMessage(null)
      setNotifyType(null)
    }, 4800);
  }

  const clearAddFields = () => {
    setNewName('')
    setNewNumber('')
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
    <div className="app">
      <h1>Phonebook</h1>
      {
        notifyMessage
        ? <Notification message={notifyMessage} type={notifyType} />
        : null
      }
      <AddPersons add={addPerson} name={newName} phone={newNumber} handleName={handleNewName} handleNumber={handleNewNumber} />
      <Search term={search} action={handleSearch}/>
      <PersonList className="person-list" displayList={displayList} deletePerson={deletePerson}/>
    </div>
  )
}

export default App
