import React, { useState, useEffect } from 'react'
import Note from './components/Note'
import NoteForm from './components/NoteForm'
import Notification from './components/Notification'
import Footer from './components/Footer'

import noteService from './services/notes'
import loginService from './services/login'
import './App.css'
import LoginForm from './components/LoginForm'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [notifyType, setNotifyType] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

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

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      setUsername('')
      setPassword('')
      setSuccessMessage(`Welcome ${user.username}!`)
      setNotifyType('success')
      setTimeout(() => {
        setSuccessMessage(null)
        setNotifyType(null)
      }, 4800)

    } catch (error) {
      setErrorMessage('Wrong credentials')
      setNotifyType('error')
      setTimeout(() => {
        setErrorMessage(null)
        setNotifyType(null)
      }, 5000)
    }
    console.log('logging in with', username, password)
  }


  const addNote = async (event) => {
    event.preventDefault()
    console.log(event)
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
      showNotification('add-success')
      setNewNote('')
    } catch (error) {
      showNotification('add-error')
      console.log(error)
    }
  }

  const showNotification = (type, content) => {
    if (type === 'add-error') {
      setErrorMessage('Error adding a new note!')
      setNotifyType('error')
      setTimeout(() => {
        setErrorMessage(null)
        setNotifyType(null)
      }, 4800)
    }
    else if(type === 'note-not-found') {
      setErrorMessage(`The note '${content}' was already deleted from the server`)
      setNotifyType('error')
      setTimeout(() => {
        setErrorMessage(null)
        setNotifyType(null)
      }, 4800)
    }
    else if(type === 'add-success') {
      setSuccessMessage(`note added!`)
      setNotifyType('success')
      setTimeout(() => {
        setSuccessMessage(null)
        setNotifyType(null)
      }, 4800)
    }
  }

  const handleNoteChange = (event) => {
    console.log(event)
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
        showNotification('note-not-found', note.content)
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  const removeNote = id => {
    const note = notes.find(n => n.id === id)
    noteService
      .remove(id)
      .then(result => {
        setNotes(notes.filter(n => n.id !== id))
      })
      .catch(e => {
        console.log(e)
        showNotification('note-not-found', note.content)
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  const notesToShow = showAll
  ? notes
  : notes.filter(note => note.important)

  const noteList = notesToShow
    .map((note) => <Note key={note.id} toggleImportance={() => toggleImportanceOf(note.id)} deleteNote={() => removeNote(note.id)} note={note} />)

  // DOM
  return (
    <div className="app">
      <h1>Notes App</h1>
      {
        errorMessage
        ? <Notification message={errorMessage} type={notifyType} />
        : successMessage
        ? <Notification message={successMessage} type={notifyType} />
        : null
      }

      {user === null
        ?
        <LoginForm loginHandler={handleLogin} user={username} pass={password} setUser={(e) => setUsername(e.target.value)} setPass={(e) => setPassword(e.target.value)} />
        :
        <div>
          <p>{user.name} logged-in</p>
          <NoteForm addANote={(note) => addNote(note)} noteToAdd={newNote} handleNote={(ev) => handleNoteChange(ev)} />
          </div>
        }

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show { showAll ? 'important' : 'all' }
        </button>
      </div>

      <ul className="note-list">
        { noteList }
      </ul>

      <Footer />
    </div>
  )
}

export default App
