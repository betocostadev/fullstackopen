import React, { useState } from 'react'

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
    } else {
      setPersons(persons.concat(newPerson))
      setNewName('')
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

  const list = persons.map(p => <li key={p.id}>{p.name}: {p.phone}</li>)
  const searchList = persons
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
    .map(p => <li key={p.id}>{p.name}: {p.phone}</li>)

  const displayList = searchList.length
    ? searchList
    : list

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNewName} />
        </div>
        <div>
          number: <input value={newPhone} onChange={handleNewPhone} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h4>Search</h4>
      <input label="Search" value={search} onChange={handleSearch} />
      <h2>Numbers</h2>
      <ul>
        { displayList }
      </ul>

    </div>
  )
}

export default App
