import React from 'react'

import './PersonDetails.css'

const PersonDetails = ({ person, deletePerson }) => {
  return (
      <li className="person-details">
        <button className="person-details-button" onClick={() => deletePerson(person.id)}>delete</button>
        {person.name}: {person.number}
      </li>
  )
}

export default PersonDetails
