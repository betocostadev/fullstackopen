import React from 'react'

const Search = ({term, action}) => {
  return (
    <div className="search">
      <h4>Search</h4>
      <input label="Search" value={term} onChange={action} />
    </div>
  )
}

export default Search
