import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return(
    <div key={anecdote.id}>
      <div style={{margin: '0.25rem 0'}}>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button style={{marginLeft: '0.2rem'}} onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state)

  return(
    <div>
      <h2>Anecdotes</h2>
      { anecdotes.sort((a,b) => b.votes - a.votes).map(anecdote =>
        <Anecdote
        key={anecdote.id}
        anecdote={anecdote}
        handleClick={() => dispatch(vote(anecdote.id))}
        />
      )}
    </div>
  )
}

export default AnecdoteList
