const filterReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.term
    default:
      return state
  }
}

export const setFilter = term => {
  return {
    type: 'SET_FILTER',
    term,
  }
}

export default filterReducer
