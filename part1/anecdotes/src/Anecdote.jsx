import { useState } from 'react'


const Anecdote = ({text, handleBest, index}) =>{

    const [votes, setvotes] = useState([]);

    const handleVote = () =>{
        const actualVotes = [...votes];
        actualVotes.push(1);
        console.log(actualVotes)
        setvotes(actualVotes);
        handleBest(votes, index)
    }

    return (
        <div>
            <p>{text}</p>
            <button onClick={handleVote}>Vote</button>
        </div>
    );
}

export default Anecdote;