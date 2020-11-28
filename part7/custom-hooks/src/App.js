import React, { useState } from 'react'
import './App.css'

const useCounter = () => {
  const [value, setValue] = useState(0)

  const increase = () => {
    setValue(value + 1)
  }

  const decrease = () => {
    setValue(value - 1)
  }

  const zero = () => {
    setValue(0)
  }

  return {
    value,
    increase,
    decrease,
    zero
  }
}

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const App = (props) => {
  const counter = useCounter()
  const left = useCounter()
  const right = useCounter()

  const name = useField('text')
  const born = useField('date')
  const height = useField('number')

  const links = [
    { ref: 'https://github.com/rehooks/awesome-react-hooks', text: 'Awesome React Hooks Resources', key: 0},
    { ref: 'https://usehooks.com/', text: 'Easy to understand React Hook recipes by Gabe Ragland', key: 1},
    { ref: 'https://overreacted.io/why-do-hooks-rely-on-call-order/', text: 'Why Do React Hooks Rely on Call Order?', key: 2},
  ]

  return (
    <div>
      <h2>Custom Hooks</h2>
      <p>Full Stack Open <a href="https://fullstackopen.com/en/part7/custom_hooks#hooks" target="_blank" rel="noreferrer">Part 7b - Custom Hooks</a></p>
      <p>React offers the option to create our own <a href="https://reactjs.org/docs/hooks-custom.html" target="_blank" rel="noreferrer">custom hooks.</a> According to React, the primary purpose of custom hooks is to facilitate the reuse of the logic used in components</p>
      <p><em>Building your own Hooks lets you extract component logic into reusable functions.</em></p>

      <div>
        <h3>Counter</h3>
        <div>{counter.value}</div>
        <button onClick={counter.increase}>
          plus
        </button>
        <button onClick={counter.decrease}>
          minus
        </button>
        <button onClick={counter.zero}>
          zero
        </button>
      </div>

      <div>
        <h3>Left and Right Counter</h3>
        {left.value}
        <button onClick={left.increase}>
          left
        </button>
        <button onClick={right.increase}>
          right
        </button>
          {right.value}
      </div>

      <div>
      <h3>Form field</h3>
      <p>Name is the same as the others, but using spread</p>
        <form>
          name:
          <input {...name} />
          <br/>
          birthdate:
          <input
            type={born.type}
            value={born.value}
            onChange={born.onChange}
          />
          <br />
          height:
          <input
            type={height.type}
            value={height.value}
            onChange={height.onChange}
          />
        </form>
        <div>
          <p>Name: {name.value}</p>
          <p>Birthday: {born.value}</p>
          <p>Height: {height.value}</p>
        </div>
      </div>

      <div>
        <h3>More about <strong>React Hooks</strong></h3>
        <p>The internet is starting to fill up with more and more helpful material related to hooks. The following sources are worth checking out:</p>
        <ul>
        {
          links.map(l => {
            return <li key={l.key}><a href={l.ref} target="_blank" rel="noreferrer">{l.text}</a></li>
          })
        }
        </ul>
      </div>

    </div>
  )
}

export default App
