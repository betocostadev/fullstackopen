import React, { useState } from 'react'
import PersonList from './components/PersonList'
import Search from './components/Search'
import AddPersons from './components/AddPersons'

const App = () => {
  const [persons, setPersons] = useState([
    { id: 1, name: 'Arto Hellas', phone: '040-123456' },
    { id: 2, name: 'Ada Lovelace', phone: '39-44-5323523' },
    { id: 3, name: 'Dan Abramov', phone: '12-43-234345' },
    { id: 4, name: 'Mary Poppendieck', phone: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone ] = useState('')
  const [ search, setSearch ] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      id: persons.length + 1,
      name: newName,
      phone: newPhone
    }

    let personExists = persons.find(p => p.name.toLowerCase() === newPerson.name.toLowerCase())

    if(personExists) {
      alert(`${newPerson.name} is already in the Phonebook!`)
      setNewName('')
      setNewPhone('')
    } else {
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewPhone('')
    }
  }

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewPhone = (event) => {
    setNewPhone(event.target.value)
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
      <AddPersons add={addPerson} name={newName} phone={newPhone} handleName={handleNewName} handlePhone={handleNewPhone} />
      <Search term={search} action={handleSearch}/>
      <PersonList displayList={displayList} />
    </div>
  )
}

export default App
