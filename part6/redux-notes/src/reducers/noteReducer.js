import noteService from '../services/notes'
// import { createStore } from 'redux'
// const initialState = [
//   {
//     content: 'reducer defines how redux store works',
//     important: true,
//     id: 1,
//   },
//   {
//     content: 'state of store can contain any data',
//     important: false,
//     id: 2,
//   },
// ]

// const noteReducer = (state = initialState, action) => {
const noteReducer = (state = [], action) => {
  switch(action.type) {
    case 'NEW_NOTE':
      return [...state, action.data]

    case 'TOGGLE_IMPORTANCE': {
      const id = action.data.id
      const noteToChange = state.find(n => n.id === id)
      const changedNote = {
        ...noteToChange,
        important: !noteToChange.important
      }
      return state.map(note =>
        note.id !== id ? note : changedNote
      )
    }

    case 'INIT_NOTES': {
      return action.data
    }

    default:
      return state
  }
}

// const store = createStore(noteReducer)

// Not using generateId anymore. Generating in DB
// const generateId = () =>
//   Number((Math.random() * 1000000).toFixed(0))

// export const createNote = (data) => {
//   return {
//     type: 'NEW_NOTE',
//     data: {
//       content,
//       important: false,
//       id: generateId()
//     }
//   }
// }

export const createNote = content => {
  return async dispatch => {
    const newNote = await noteService.createNew(content)
    dispatch({ type: 'NEW_NOTE', data: newNote })
  }
}

export const toggleImportanceOf = note => {
  return async dispatch => {
    const changedNote = await noteService.toggleImportanceOfNote(note)
    dispatch({ type: 'TOGGLE_IMPORTANCE', data: changedNote})
  }
}

export const initializeNotes = () => {
  return async dispatch => {
    const notes = await noteService.getAll()
    dispatch({ type: 'INIT_NOTES', data: notes})
  }
}

// Below is the other way, when not using Redux Thunk
// export const initializeNotes = async (notes) => {
//   return {
//     type: 'INIT_NOTES',
//     data: notes
//   }
// }

export default noteReducer
