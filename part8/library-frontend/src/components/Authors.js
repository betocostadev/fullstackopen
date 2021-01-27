import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_AUTHORS } from '../queries'

import UpdateAuthor from './UpdateAuthor'

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)
  // This way will refetch every 2000 miliseconds
  // const result = useQuery(ALL_PERSONS, {
  //   pollInterval: 2000
  // })

  if (result.loading)  {
    return <div>loading...</div>
  }

  if (!props.show) {
    return null
  }
  const authors = result.data.allAuthors
    ? result.data.allAuthors
    : []

  return (
    <div>
      <h2>Authors</h2>
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Born in</th>
            <th>Books</th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      <UpdateAuthor authors={authors} />


    </div>
  )
}

// {
//   props.isAuth
//   ? <UpdateAuthor authors={authors} />
//   : null
// }

export default Authors
