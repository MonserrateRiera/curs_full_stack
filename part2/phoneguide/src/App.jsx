import React, { useState } from 'react'
import Form from './Form'
const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  

  const addPerson = (newPerson) =>{
    setPersons(persons.concat(newPerson));
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Form onSubmit={addPerson}  />
      <h2>Numbers</h2>
      {persons.map(person =>
        <p key={person.name}>{person.name}</p>
        )}
    </div>
  )
}

export default App