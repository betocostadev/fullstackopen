const notificationReducer = (state = { show: false, message: null }, action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return { show: true, message: action.message }
    case 'HIDE_NOTIFICATION':
      return { show: false, message: null }
    default:
      return state
  }
}

let counter
export const notificationToggle = (message, time) => {
  return async dispatch => {
    dispatch({ type: 'SHOW_NOTIFICATION', message })
    clearTimeout(counter)

    counter = setTimeout(() => {
      dispatch({ type: 'HIDE_NOTIFICATION', message })
    }, time * 1000)
  }
}

// Old way, using a timeout with a promise
// export const notificationToggle = (message, time) => {
//   const timeout = (ms) => {
//     return new Promise(resolve => setTimeout(resolve, ms))
//   }

//   return async (dispatch, state) => {
//     dispatch({ type: 'SHOW_NOTIFICATION', message })
//     time = time * 1000
//     await timeout(time)
//     dispatch({ type: 'HIDE_NOTIFICATION', message })
//   }
// }

// export const notificationHide = message => {
//   return {
//     type: 'HIDE_NOTIFICATION',
//     message,
//   }
// }

export default notificationReducer
