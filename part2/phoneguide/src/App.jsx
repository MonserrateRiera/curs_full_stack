import React, { useState, useEffect } from 'react'
import Form from './Form'
import PersonList from './PersonList'
import Filter from './Filter'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled', response.data)
        setPersons(response.data)
      })
  }, [])

  const [filter, setfilter] = useState('')

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

  const filterPersons = () =>{
    const filtered = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    return filtered;

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={setfilter}/>
      <Form onSubmit={addPerson}  />
      <h2>Numbers</h2>
      <PersonList persons={filterPersons()}/>
    </div>
  )
}

export default App