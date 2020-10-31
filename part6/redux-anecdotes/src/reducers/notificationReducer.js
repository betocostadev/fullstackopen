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

export const notificationShow = message => {
  return {
    type: 'SHOW_NOTIFICATION',
    message,
  }
}

export const notificationHide = message => {
  return {
    type: 'HIDE_NOTIFICATION',
    message,
  }
}

export default notificationReducer
