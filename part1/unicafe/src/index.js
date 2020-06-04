import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handler, text }) => <button onClick={handler}>{text}</button>

const Statistic = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const rateGood = () => setGood(good + 1)
  const rateNeutral = () => setNeutral(neutral + 1)
  const rateBad = () => setBad(bad + 1)

  const average = () => ((good - bad) / (good + neutral + bad)).toFixed(2)

  const positive = () => (good / (good + neutral + bad) * 100).toFixed(2)

  return (
    <div>
      <header>
        <h1>Unicafe</h1>
      </header>

      <div>
        <Button handler={rateGood} text='Good' />
        <Button handler={rateNeutral} text='Neutral' />
        <Button handler={rateBad} text='Bad' />
      </div>

      <div>
      {
        good === 0 && neutral === 0 && bad === 0
        ?
        <div>
          <p>Statistics</p>
          <p>No feedback given</p>
        </div>
        :
        <table>
          <thead>
            <tr>
              <th>Statistics</th>
            </tr>
          </thead>
          <tbody>
            <Statistic text='Good' value={good} />
            <Statistic text='Neutral' value={neutral} />
            <Statistic text='Bad' value={bad} />
            <Statistic text='All' value={good + neutral + bad} />
            <Statistic text='Average' value={average()} />
            <Statistic text='Positive' value={`${positive()}%`} />
          </tbody>
        </table>
      }
      </div>
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)
