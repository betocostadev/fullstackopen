import React from 'react'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'

const App = () => {
  // const anecdotes = useSelector(state => state)
  // const dispatch = useDispatch()

  // const addVote = (id) => {
  //   console.log('vote', id)
  //   dispatch(vote())
  // }

  return (
    <div>
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App
