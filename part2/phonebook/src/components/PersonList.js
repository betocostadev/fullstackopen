import React from 'react'
import PersonDetails from './PersonDetails'

const PersonList = ({ displayList }) => {
  const list = displayList.map(person => <PersonDetails key={person.id} person={person} />)
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
