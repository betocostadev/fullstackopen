import React from 'react'

const PersonDetails = ({ person, deletePerson }) => {
  return (
      <li>
        {person.name}: {person.number}
        <button onClick={() => deletePerson(person.id)}>delete</button>
      </li>
  )
}

export default PersonDetails
