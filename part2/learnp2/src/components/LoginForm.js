import React, { useState } from 'react'
import './LoginForm.css'

const LoginForm = ({ login }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


const handleSubmit = (event) => {
  event.preventDefault()
  login({ username, password })
}

const handleUserName = (event) => {
  setUsername(event.target.value)
}

const handlePassword = (event) => {
  setPassword(event.target.value)
}
  return (
    <div>
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username-input">Username:</label>
          <input
            className="login-input"
            id="username-input"
            type="text"
            value={username}
            name="username-input"
            onChange={handleUserName}
          />
        </div>
        <div>
          <label htmlFor="password-input">Password:</label>
          <input
            className="login-input"
            id="password-input"
            type="password"
            value={password}
            name="password-input"
            onChange={handlePassword}
          />
        </div>
        <button type="submit" disabled={!username.length || !password.length}>login</button>
      </form>
    </div>
  )
}

export default LoginForm
