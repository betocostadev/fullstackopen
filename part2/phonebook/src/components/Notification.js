import React from 'react'

const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={ type === 'error' ? 'error-message' : 'success-message'}>
      {message}
    </div>
  )
}

export default Notification
