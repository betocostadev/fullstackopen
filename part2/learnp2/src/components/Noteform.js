import React from 'react'
// import './Note.css'

const Noteform = ({ addANote, noteToAdd, handleNote }) => {
  console.log('addNote', addANote)
  console.log('newNote', noteToAdd)
  console.log('HandleNote', handleNote)
  // disabled={newNote.length ? false : true}
  return (
    <form className="note-form" onSubmit={addANote}>
      <input
        placeholder={'Add a note'}
        value={noteToAdd}
        onChange={handleNote}
      />
      <button type="submit">save</button>
    </form>
  )
}

export default Noteform
