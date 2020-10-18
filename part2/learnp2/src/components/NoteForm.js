import React from 'react'
import './NoteForm.css'

const NoteForm = ({ addANote, noteToAdd, handleNote }) => {
  return (
    <form className="note-form" onSubmit={addANote}>
      <input
        className="note-form-input"
        placeholder={'Add a note'}
        value={noteToAdd}
        onChange={handleNote}
      />
      <button type="submit" disabled={noteToAdd.length ? false : true}>save</button>
    </form>
  )
}

export default NoteForm
