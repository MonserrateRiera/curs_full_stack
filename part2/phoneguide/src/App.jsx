import React, { useState } from 'react'
import Form from './Form'
import PersonList from './PersonList'
import Filter from './Filter'
const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [filteredPersons, setFilteredPersons] = useState(persons)

  const addPerson = (newPerson) =>{
    isValid(newPerson)
    ? setPersons(persons.concat(newPerson))
    : alert(`${newPerson.name} is already added to phonebook`)
  }

  const isValid = (newPerson) =>{
    if(persons.find(person=> person.name === newPerson.name)){
      return false;
    }
    return true;
  }

  const filterPersons = (filter) =>{
    setFilteredPersons(persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())));

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={filterPersons}/>
      <Form onSubmit={addPerson}  />
      <h2>Numbers</h2>
      <PersonList persons={filteredPersons}/>
    </div>
  )
}

export default App