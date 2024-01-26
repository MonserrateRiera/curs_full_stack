import {useState} from 'react'

const Form = ({onChange, onSubmit}) =>{

    const [ newName, setNewName ] = useState('')

    const handleChange = (event) =>{
      setNewName(event.target.value);
    }
    const handleSubmit = (event) =>{
        event.preventDefault();
        const newPerson = {name: newName};
        onSubmit(newPerson);
        setNewName('');
    }

    return(
        <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default Form;