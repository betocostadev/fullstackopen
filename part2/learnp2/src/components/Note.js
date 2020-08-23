import React from 'react'
import './Note.css'

const Note = ({ note, toggleImportance }) => {
  const label = note.important
    ? 'make not important' : 'make important'

  return (
    <li className={note.important ? 'note important' : 'note'}>
      <button className='note-button' onClick={toggleImportance}>{label}</button>
      {note.content}
    </li>
  )
}

export default Note
