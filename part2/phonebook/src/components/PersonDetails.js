import React from 'react'

const PersonDetails = ({ person }) => {
  return (
      <li>{person.name}: {person.phone}</li>
  )
}

export default PersonDetails
