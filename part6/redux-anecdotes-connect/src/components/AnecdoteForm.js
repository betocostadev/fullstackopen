import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { notificationToggle } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {

  const newAnecdote = async (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    e.target.anecdote.value = ''

    props.createAnecdote(content)
    props.notificationToggle(`New anecdote ${content.length > 15 ? content.slice(15) + '...' : content} added!`, 5)
  }

  return(
    <div>
      <h3>Add your anecdote</h3>
      <form onSubmit={newAnecdote}>
        <input name="anecdote" />
        <button type="submit">add</button>
      </form>
    </div>
  )
}

const mapDispatchToProps = {
  createAnecdote, notificationToggle
}

export default connect(null, mapDispatchToProps)(AnecdoteForm)
