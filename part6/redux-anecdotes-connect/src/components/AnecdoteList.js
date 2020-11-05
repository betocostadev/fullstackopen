import React from 'react'
import { connect } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { notificationToggle } from '../reducers/notificationReducer'
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

const AnecdoteList = (props) => {
  const anecdotes = props.anecdotes

  const handleVote = anecdote => {
    const anecdoteToVote = anecdotes.find(a => a.id === anecdote.id)
    props.addVote(anecdoteToVote)

    props.notificationToggle(`You voted ${anecdote.content}`, 5)
  }

  return(
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      { !anecdotes.length
        ? <div>No Anecdotes with the searched term</div>
        : anecdotes.sort((a,b) => b.votes - a.votes).map(anecdote =>
          <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => handleVote(anecdote)}
          />
        )
      }

    </div>
  )
}


const mapStateToProps = (state) => {
  return {
    filter: state.filter,
    anecdotes: (state.filter.length
      ? state.anecdotes.filter(a => a.content.toLowerCase().includes(state.filter.toLowerCase()))
      : state.anecdotes)
  }
}

const mapDispatchToProps = {
  addVote, notificationToggle
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
