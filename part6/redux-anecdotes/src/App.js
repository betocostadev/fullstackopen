import React from 'react'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {
  // const anecdotes = useSelector(state => state)
  // const dispatch = useDispatch()

  // const addVote = (id) => {
  //   console.log('vote', id)
  //   dispatch(vote())
  // }

  return (
    <div>
      <Notification />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App
