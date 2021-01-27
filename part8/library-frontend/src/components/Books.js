import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const [ genre, setGenre ] = useState('all genres')

  if (result.loading)  {
    return <div>loading...</div>
  }

  if (!props.show) {
    return null
  }

  const handleGenreChange = (event) => {
    setGenre(event.target.value)
  }

  const buildGenres = bookGenres => {
    /*eslint array-callback-return: [0, { allowImplicit: true }]*/
    let result = ['all genres']
    bookGenres.map(b => {
      return b.genres.map(g => {
        if (!result.includes(g)) {
          result.push(g)
        }
      })
    })
    return result
  }

  const books = result.data.allBooks
    ? result.data.allBooks
    : []

  const bookGenres = result.data.allBooks
    ? buildGenres(result.data.allBooks)
    : []

  const filteredBooks = result.data.allBooks && genre === 'all genres'
  ? books
  : result.data.allBooks.filter(b => b.genres.includes(genre))

  return (
    <div>
      <h2>Books</h2>

      <table>
        <tbody>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Published</th>
          </tr>
          { filteredBooks.map(a =>
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
          )}
        </tbody>
      </table>
      <div>
        <label>
        Filter books by genre:
          <select value={genre} onChange={handleGenreChange}>
          {
            bookGenres.map(bg => <option key={bg} value={bg}>{bg}</option>)
          }
          </select>
        </label>
      </div>
    </div>
  )
}

export default Books
