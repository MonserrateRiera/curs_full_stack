import { useState } from 'react'
import Button from './Components/Button'
import Statistics from './Components/Statistics'

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => setGood(good +1);
  const handleNeutral = () => setNeutral(neutral+1);
  const handleBad = () => setBad(bad+1);

  return (
    <div>
      <Button handleClick={handleGood} text={"Good"}/>
      <Button handleClick={handleNeutral} text={"Neutral"}/>
      <Button handleClick={handleBad} text={"Bad"}/>
      <Statistics good={good} neutral = {neutral} bad = {bad} />
    </div>
  )
}

export default App
