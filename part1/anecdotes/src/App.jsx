import { useState } from 'react'



const Button = ({handleClick, text}) =>{

  return (
    <button onClick={handleClick}>{text}</button>
  );
}

const Anecdote = ({text, handleMethod}) => {

  if(handleMethod!= null){
    return(
      <div>
        <p>{text}</p>
        <Button text={"vote"} handleClick={handleMethod}/>
      </div>
    );
  }
  return(
    <div>
      <h2>Most voted quote</h2>
      <p>{text}</p>
    </div>
  );

}




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
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  const [selected, setSelected] = useState(0)
  const [max, setMax] = useState(0);
  
  const handleQuote = () =>{
    const max = anecdotes.length;
    const min = 0;
    setSelected(Math.floor(Math.random() * (max - min) + min));
  }

  const handleVote = () => {
    console.log(votes)
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);
    calculateMax();
  }

  const calculateMax = () => {
    let maxValue = Math.max(...votes);
    let index = votes.indexOf(maxValue);
    setMax(index);
  }

  return (
    <div>
      <Anecdote text ={anecdotes[selected]} handleMethod={handleVote} />
      <Button text={'New Quote'} handleClick={handleQuote}></Button>
      <Anecdote text ={anecdotes[max]}  />
    </div>
  )
}

export default App