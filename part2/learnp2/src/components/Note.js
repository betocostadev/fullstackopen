import React from 'react'
import './Note.css'

const Note = ({ note, toggleImportance }) => {
  const label = note.important
    ? 'make not important' : 'make important'

<<<<<<< HEAD
  return (
    <li className={note.important ? 'note important' : 'note'}>
      <button className='note-button' onClick={toggleImportance}>{label}</button>
      {note.content}
=======
const Note = ({ note, toggleImportance }) => {
  const label = note.important
    ? 'make not important' : 'make important'

  return (
    <li>
      {note.content}
      <button style={{marginLeft: '10px'}} onClick={toggleImportance}>{label}</button>
>>>>>>> 927ad916d7995aaff33b3ac00cf579635c067b01
    </li>
  )
}

export default Note
