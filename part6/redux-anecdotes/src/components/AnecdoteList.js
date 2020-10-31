import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { notificationShow, notificationHide } from '../reducers/notificationReducer'
import Filter from './Filter'

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
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)

  const filtered = filter.length
    ? anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
    : anecdotes

    // console.log(filtered)

  const handleVote = id => {
    const anecdote = anecdotes.find(a => a.id === id)
    dispatch(vote(id))
    dispatch(notificationShow(`You voted ${anecdote.content}`))
    setTimeout(() => {
      dispatch(notificationHide(null))
    }, 5000)
  }

  return(
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      { !filtered.length
        ? <div>No Anecdotes with the searched term</div>
        : filtered.sort((a,b) => b.votes - a.votes).map(anecdote =>
          <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => handleVote(anecdote.id)}
          />
        )
      }
    </div>
  )
}

export default AnecdoteList
