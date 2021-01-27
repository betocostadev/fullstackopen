import React, { useState, useEffect } from 'react'
import { useApolloClient } from '@apollo/client'

import LoginForm from './components/LoginForm'
import Notify from './components/Notify'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Recommend from './components/Recommend'

const App = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)
  const [loadUser, setLoadUser] = useState(false)
  const client = useApolloClient()

  useEffect(() => {
    if ( !token ) {
      const auth = localStorage.getItem('booklibrary-user-token', token)
      if (auth) {
        setToken(auth)
      }
    }
  }, []) // eslint-disable-line

  const getRecommend = () => {
    setLoadUser(true)
    setPage('recommend')
  }

  const logout = () => {
    setPage('authors')
    // setLoadUser(false)
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 6500)
  }

  return (
    <div>
      <Notify errorMessage={errorMessage} />

      <div>
        {
          token
          ? <div>
              <button onClick={() => setPage('authors')}>authors</button>
              <button onClick={() => setPage('books')}>books</button>
              <button onClick={() => setPage('add')}>add book</button>
              <button onClick={getRecommend}>recommended</button>
              <button onClick={logout}>logout</button>
            </div>
          : <div>
              <button onClick={() => setPage('authors')}>authors</button>
              <button onClick={() => setPage('books')}>books</button>
              <button onClick={() => setPage('login')}>login</button>
            </div>
        }
      </div>

      <div>
        <LoginForm show={page === 'login'} setError={notify} setToken={setToken} setPage={setPage} />
        <Authors show={page === 'authors'} setError={notify} isAuth={token} />
        <Books show={page === 'books'} setError={notify} />
        <NewBook show={page === 'add'} setError={notify} />
        <Recommend show={page === 'recommend'} loadUser={loadUser} setError={notify} />
      </div>
    </div>
  )
}

export default App
