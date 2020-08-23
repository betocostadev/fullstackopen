import React from 'react'
import PersonDetails from './PersonDetails'

const PersonList = ({ displayList, deletePerson }) => {
  const listStyle = {
    padding: 0
  }
  const list = displayList
    ? displayList.map(person => <PersonDetails key={person.id} person={person} deletePerson={deletePerson} />)
    : []
  return (
    <div>
      <h2>Numbers</h2>
      {
        list.length > 0
        ? <ul style={listStyle}>
            { list }
          </ul>
        : <p>No data from server</p>
       }
    </div>
  )
}

export default PersonList
