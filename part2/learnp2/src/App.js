import React, { useState, useEffect } from 'react'
import Note from './components/Note'
import axios from 'axios'

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
      let response = await axios.get('http://localhost:3001/notes')
      try {
        console.log('promise fulfilled')
        setNotes(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchNotes()
  }

  useEffect(hook, [])
  // console.log('render', notes.length, 'notes')


  const addNote = (event) => {
    event.preventDefault()
    // console.log('button clicked', event.target)
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      // id: notes.length + 1
    }
    axios.post('http://localhost:3001/notes', noteObject)
      .then(response => {
        console.log(response)
        setNotes(notes.concat(response.data))
        setNewNote('')
      })
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const toggleImportanceOf = id => {
    const noteEndpoint = `http://localhost:3001/notes/${id}`
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    axios.put(noteEndpoint, changedNote)
      .then(response => {
        setNotes(notes.map(note => note.id !== id ? note : response.data))
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
