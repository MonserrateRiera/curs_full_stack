import {useState} from 'react'

const Form = ({onChange, onSubmit}) =>{

    const [ newName, setNewName ] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const handleNameChange = (event) =>{
      setNewName(event.target.value);
    }
    const handleNumberChange = (event) =>{
      setNewNumber(event.target.value);
    }
    const handleSubmit = (event) =>{
        event.preventDefault();
        const newPerson = {name: newName, number: newNumber};
        onSubmit(newPerson);
        setNewName('');
    }

    return(
      
        <form onSubmit={handleSubmit}>
          <h2>Add a new</h2>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange = {handleNumberChange}/>
          </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default Form;