import React, { useState } from 'react'
import Form from './Form'
import PersonList from './PersonList'
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
      <PersonList persons={persons}/>
    </div>
  )
}

export default App