import React, { useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const [ genre, setGenre ] = useState('all genres')
  const [ booksByGenre, setBooksByGenre ] = useState(false)

  const [getByGenre, { loading, data }] = useLazyQuery(ALL_BOOKS, {
    variables: { 'genre': genre },
    onError: (error) => {
      props.setError(error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    if (genre === 'all genres') {
      setBooksByGenre(false)
    } else {
      getByGenre()
      setBooksByGenre(true)
    }
  }, [genre, getByGenre])

  if (result.loading || (loading && booksByGenre))  {
    return <div>Loading books...</div>
  }

  if (!props.show) {
    return null
  }

  const handleGenreChange = (event) => {
    setGenre(event.target.value)
  }

  const buildGenres = bookGenres => {
    /*eslint array-callback-return: [0, { allowImplicit: true }]*/
    let genres = ['all genres']
    bookGenres.map(b => {
      return b.genres.map(g => {
        if (!genres.includes(g)) {
          genres.push(g)
        }
      })
    })
    return genres
  }

  const books = result.data.allBooks && genre === 'all genres'
    ? result.data.allBooks
    : []

  const filteredBooks = data && data.allBooks && genre !== 'all genres'
    ? data.allBooks
    : []

  const bookGenres = result.data.allBooks
    ? buildGenres(result.data.allBooks)
    : []


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
          { booksByGenre
            ?
            filteredBooks.map(a =>
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>)
            :
            books.map(a =>
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
