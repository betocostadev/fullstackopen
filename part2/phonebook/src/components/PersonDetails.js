import React from 'react'

const PersonDetails = ({ person }) => {
  return (
      <li>{person.name}: {person.number}</li>
  )
}

export default PersonDetails
