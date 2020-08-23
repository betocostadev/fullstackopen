import React from 'react'
import PersonDetails from './PersonDetails'

const PersonList = ({ displayList, deletePerson }) => {
  const list = displayList
    ? displayList.map(person => <PersonDetails key={person.id} person={person} deletePerson={deletePerson} />)
    : []
  return (
    <div>
      <h2>Numbers</h2>
      {
        list.length > 0
        ? <ul>
            { list }
          </ul>
        : <p>No data from server</p>
       }
    </div>
  )
}

export default PersonList
