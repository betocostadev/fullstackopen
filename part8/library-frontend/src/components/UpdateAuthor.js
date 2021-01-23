import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS, UPDATE_AUTHOR } from '../queries'

const UpdateAuthor = ({ authors }) => {
  const [ name, setName ] = useState('')
  const [ birthYear, setBirthYear ] = useState('')

  const [ editAuthor ] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS } ],
    onError: (error) => console.log(error)
  })

  const handleChange = (event) => {
    setName(event.target.value)
  }

  const submit = async (event) => {
    event.preventDefault()

    editAuthor({ variables: { name, born: birthYear }})

    setName('')
    setBirthYear('')
  }

  return (
    <div>
      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <label>
          Select author to update:
          <select value={name} onChange={handleChange}>
            {
              authors.map(a => {
                return (<option key={a.id} value={a.name}>{a.name}</option>)
              })
            }
          </select>
        </label>
        <div>
          born year:
          <input
            type="number"
            value={birthYear}
            onChange={({ target }) => setBirthYear(Number(target.value))}
          />
        </div>
        <button
          type='submit'
          disabled={!name.length || !birthYear}
          >update author</button>
      </form>
    </div>
  )
}

export default UpdateAuthor
