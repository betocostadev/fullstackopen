import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Hello = ({ name, age }) => {
  const bornYear = () => new Date().getFullYear() - age

  return (
    <div>
    <p>
      Hello {name}, you are {age} years old
    </p>
    <p>So you were probably born in {bornYear()}</p>
    </div>
  )
}

const App = (props) => {
  const [ counter, setCounter ] = useState(0)

  // setTimeout(
  //   () => setCounter(counter + 1),
  //   1000)

  console.log('rendering...', counter)

  // const handleClick = () => console.log('clicked')

  const now = new Date()
  // Using the age here and also passing the age
  let someName = 'Arto Hellas'
  let someAge = 35

  return (
    <div>
      <h1>Greetings!</h1>
      <Hello name={someName} age={someAge} />
      <p>It is now: { now.toString() }</p>
      <p>{ counter }</p>
      <button onClick={() => setCounter(counter + 1)}>
        plus
      </button>
      <button onClick={() => setCounter(0)}>
        zero
      </button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
