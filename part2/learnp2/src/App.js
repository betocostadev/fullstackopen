import React, { useState, useEffect } from 'react'
import Note from './components/Note'

import noteService from './services/notes'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  // useEffect(() => {
  //   console.log('effect')

  //   const eventHandler = response => {
  //     console.log('promise fulfilled')
  //     setNotes(response.data)
  //   }

  //   const promise = axios.get('http://localhost:3001/notes')
  //   promise.then(eventHandler)
  // }, [])

  const hook = () => {
    // console.log('effect')
    async function fetchNotes() {
      let initialNotes = await noteService.getAll()
      try {
        console.log('promise fulfilled')
        setNotes(initialNotes)
      } catch (error) {
        console.log(error)
      }
    }
    fetchNotes()
  }

  useEffect(hook, [])
  // console.log('render', notes.length, 'notes')


  const addNote = async (event) => {
    event.preventDefault()
    // console.log('button clicked', event.target)
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      // id: notes.length + 1
    }

    try {
      let newNote = await noteService.create(noteObject)
      setNotes(notes.concat(newNote))
      setNewNote('')
    } catch (error) {
      console.log(error)
    }
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const toggleImportanceOf = id => {
    // const noteEndpoint = `http://localhost:3001/notes/${id}`
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(e => {
        console.log(e)
        alert(`the note '${note.content}' was already deleted from server`)
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  const notesToShow = showAll
  ? notes
  : notes.filter(note => note.important)

  const noteList = notesToShow
    .map((note) => <Note key={note.id} toggleImportance={() => toggleImportanceOf(note.id)} note={note} />)

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show { showAll ? 'important' : 'all' }
        </button>
      </div>
      <ul>
        { noteList }
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App
