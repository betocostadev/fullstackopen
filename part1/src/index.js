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

const Display = ({ left, right }) => <p>Left: { left } | Right: { right }</p>

const Button = ({ handleClick, text }) => <button onClick={ handleClick }>{ text }</button>

const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }

  return (
    <div>
      button press history: {props.allClicks.join(' ')}
    </div>
  )
}

const App = (props) => {
  const now = new Date()
  // Use state
  // const [ clicks, setClicks ] = useState({
  //   left: 0, right: 0
  // })
  const [ left, setLeft] = useState(0)
  const [ right, setRight] = useState(0)
  const [ allClicks, setAllClicks ] = useState([])

  const [ who, setWho ] = useState('')

  const handleLeftClick = () => {
    setAllClicks(allClicks.concat('L'))
    setLeft(left + 1)
  }

  const handleRightClick = () => {
    setAllClicks(allClicks.concat('R'))
    setRight(right + 1)
  }

  // Returning a function inside a function
  /* const sayHi = who => {
    // const handler = () => console.log('Hello, ', who)
    const handler = () => setWho(who)
    return handler
  } */
  const sayHi = who =>
    () => setWho(who)


  return (
    <div>
      <h1>Greetings!</h1>
      <Hello name='Beto' age={34} />
      <p>It is now: { now.toString() }</p>

      <Display left={left} right={right} />

      <History allClicks={allClicks} />

      <Button handleClick={handleLeftClick} text='Left' />
      <Button handleClick={handleRightClick} text='Right' />

      <button onClick={() => setAllClicks([])}>Reset click log</button>

      <div>
        <button onClick={sayHi('World')}>World</button>
        <button onClick={sayHi('React')}>React</button>
        <button onClick={sayHi('function')}>Function</button>

        <p>Hello { who }!</p>
      </div>

    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
