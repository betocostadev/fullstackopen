import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import noteReducer from '../reducers/noteReducer'
import filterReducer from '../reducers/filterReducer'

const reducer = combineReducers({
  notes: noteReducer,
  filter: filterReducer,
})

// store.subscribe(() => console.log(store.getState()))
// store.dispatch(filterChange('IMPORTANT'))
// store.dispatch(createNote('combineReducers forms one reducer from many simple reducers'))

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store
