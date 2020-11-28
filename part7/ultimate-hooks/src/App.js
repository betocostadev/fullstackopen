import React, { useEffect } from 'react'
import { useField, useResource } from './hooks/index'

const App = () => {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')

  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')

  const hook = () => {
    noteService.getAll()
    personService.getAll()
  }

  useEffect(hook, [])

  const handleNoteSubmit = async (event) => {
    event.preventDefault()
    noteService.create({ content: content.value }).then(() => hook())
    content.reset()
  }

  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: name.value, number: number.value}).then(() => hook())
    name.reset()
    number.reset()
  }

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} reset='' />
        <button>create</button>
      </form>
      {notes.map(n => <p key={n.id}>{n.content}</p>)}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} reset='' /> <br/>
        number <input {...number} reset='' />
        <button>create</button>
      </form>
      {persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
    </div>
  )
}

export default App
