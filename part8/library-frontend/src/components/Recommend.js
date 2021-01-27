import React, { useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { ALL_BOOKS, USER } from '../queries'

const Recommend = ({ show, setError, loadUser }) => {

  const resultBooks = useQuery(ALL_BOOKS)
  const [getMe, { loading, data }] = useLazyQuery(USER, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    if (!loadUser) {
      return
    } else {
      getMe()
    }
  }, [loadUser, getMe])

  if (!show || !loadUser) {
    return null
  }

  if (loading || resultBooks.loading)  {
    return <div>loading...</div>
  }

  return (
    <div>
      <h3>Recommended</h3>
      {
        data
        ? <div>
            <p>Books in your favorite genre <strong>{data.me.favoriteGenre}</strong></p>
            <table>
            <tbody>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Published</th>
              </tr>
              { resultBooks.data.allBooks.filter(b => b.genres.includes(data.me.favoriteGenre)).map(a =>
                  <tr key={a.title}>
                    <td>{a.title}</td>
                    <td>{a.author.name}</td>
                    <td>{a.published}</td>
                  </tr>
              )}
            </tbody>
          </table>
          </div>
        : <div>NO DATA</div>
      }
    </div>
  )
}

export default Recommend
