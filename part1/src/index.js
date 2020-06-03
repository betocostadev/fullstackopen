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

const Display = ({ counter }) => <p>{counter}</p>

const Button = ({ handleClick, text }) => <button onClick={ handleClick }>{ text }</button>

const App = (props) => {
  const [ counter, setCounter ] = useState(0)

  const increaseByOne = () => setCounter(counter + 1)
  const decreaseByOne = () => setCounter(counter - 1)
  const setToZero = () => setCounter(0)
  console.log('rendering...', counter)
  // setTimeout(
  //   () => setCounter(counter + 1),
  //   1000)

  const now = new Date()
  // Using the age here and also passing the age
  let someName = 'Arto Hellas'
  let someAge = 35

  return (
    <div>
      <h1>Greetings!</h1>
      <Hello name={someName} age={someAge} />
      <p>It is now: { now.toString() }</p>

      <Display counter={counter} />

      <Button handleClick={increaseByOne} text='Plus' />
      <Button handleClick={setToZero} text='Zero' />
      <Button handleClick={decreaseByOne} text='Minus' />

    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
