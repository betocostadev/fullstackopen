import React from 'react'
import Note from './components/Note'

const App = ({ notes }) => {
  const noteList = notes.map((note) => <Note key={note.id} note={note} />)
  return (
    <div>
      <h1>Notes</h1>
      <ul>
        { noteList }
      </ul>
    </div>
  )
}

export default App
