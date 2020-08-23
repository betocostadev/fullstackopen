import React from 'react'

const Search = ({term, action}) => {
  return (
    <div>
      <label htmlFor="searchBox">Find countries: </label>
      <input id="searchBox" name="searchBox" label="Search" value={term} onChange={action} />
    </div>
  )
}

export default Search
