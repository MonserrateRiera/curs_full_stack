import { useState } from 'react'
import Anecdote from './Anecdote'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [best, setBest] = useState({max:0, text:0});

  const randomQuoteIndex = () =>{
    const min = 0;
    const max = anecdotes.length;
    setSelected( Math.floor(Math.random() * (max - min + 1)) + min);
  } 

  const calculateBest = (votes, index)=>{
    let sum = votes.reduce((a, b) => a + b, 0);
    if(sum > best.max){
      const newBest = {max: sum, text:index};
      setBest(newBest);
    }
  }
//Replantejar amb un boto aqui i l'array aqui.
  return (
    <div>
      <Anecdote text = {anecdotes[selected]} handleBest={calculateBest} index={selected}/>
      <p><button onClick={randomQuoteIndex}>Change Anectode!!</button></p>
      <Anecdote text = {anecdotes[best.index]} handleBest={calculateBest} index={selected}/>
    </div>
  )
}

export default App