import React from 'react'
import PersonDetails from './PersonDetails'

const PersonList = ({ displayList, deletePerson }) => {
  const list = displayList.map(person => <PersonDetails key={person.id} person={person} deletePerson={deletePerson} />)
  return (
    <div>
      <h2>Numbers</h2>
      <ul>
        { list }
      </ul>
    </div>
  )
}

export default PersonList
