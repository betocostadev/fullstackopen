import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  const notification = props.notification
  const show = {
    textAlign: 'center',
    width: '80%',
    heigth: '1.5rem',
    background: '#203a50',
    color: 'whitesmoke',
    position: 'fixed',
    top: '10px',
    left: '10%',
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    lineHeight: '1.2rem',
    opacity: 1,
    transition: 'opacity 1.5s'
  }
  const hide = {
    width: '80%',
    heigth: '1.5rem',
    background: '#203a50',
    position: 'fixed',
    top: '10px',
    left: '10%',
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    opacity: 0,
    transition: 'opacity 1s'
  }

  return (
    <div style={notification.show ? show : hide}>
      {notification.message}
    </div>
  )
}

const mapStateToProps = state => {
  return { notification: state.notification }
}

export default connect(mapStateToProps, null)(Notification)
