import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const App = (props) => {
  const [ selected, setSelected ] = useState(0)
  const [ vote, setVote ] = useState(Array(anecdotes.length).fill(0))


  const choseAnecdote = () => setSelected([Math.floor(Math.random() * anecdotes.length)])
  const votesCopy = [...vote]

  const addVote = () => {
    votesCopy[selected] += 1
    setVote(votesCopy)
  }

  return (
    <div>
      <header>
        <h1>Anecdotes</h1>
      </header>
      <div>
        <h2>Anecdote of the day</h2>
        <p>{anecdotes[selected]}</p>
        <span>Has {votesCopy[selected]} votes</span>
        <div>
          <button onClick={addVote}>Vote</button>
          <button onClick={choseAnecdote}>Next anecdote</button>
        </div>
      </div>
      <div>
        <h2>Anecdote with most votes</h2>
        {
          Math.max(...votesCopy) === 0
          ?
          <div>
            <p>No votes yet.</p>
          </div>
          :
          <div>
            <p>{(anecdotes[votesCopy.indexOf(Math.max(...votesCopy))])}</p>
            <p>Has {Math.max(...votesCopy)} votes</p>
          </div>
        }
      </div>
    </div>
  )
}

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
