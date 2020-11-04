import React, {useEffect} from 'react'
import Notes from './components/Notes'
import NewNote from './components/NewNote'
import VisibilityFilter from './components/VisibilityFilter'

// Use the noteService to add the notes in DB.json for each note to the store
// import noteService from './services/notes'
import { initializeNotes } from './reducers/noteReducer'
import { useDispatch } from 'react-redux'


const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeNotes())
  },[dispatch])

  // Below is the example when not using Redux Thunk
  // useEffect(() => {
  //   noteService
  //     .getAll()
  //     .then(notes => dispatch(initializeNotes(notes)))
  // }, [dispatch]) // or ,[])

  return (
    <div>
      <NewNote />
      <VisibilityFilter />
      <Notes  />
    </div>
  )
}

export default App
