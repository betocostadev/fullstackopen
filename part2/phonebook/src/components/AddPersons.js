import React from 'react'

const AddPersons = ({ add, name, phone, handleName, handleNumber }) => {
  return (
    <div className="add-person-form">
      <h3>Add contact</h3>
      <form onSubmit={add}>
        <div>
          name: <input value={name} onChange={handleName} />
        </div>
        <div>
          number: <input value={phone} onChange={handleNumber} />
        </div>
        <div>
          <button type="submit" disabled={ !name.length || !phone.length ? true : false }>ADD</button>
        </div>
      </form>
    </div>
  )
}

export default AddPersons
