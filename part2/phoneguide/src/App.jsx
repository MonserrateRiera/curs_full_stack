import React, { useState, useEffect } from 'react'
import Form from './Form'
import PersonList from './PersonList'
import Filter from './Filter'
import Services from './Services/Services'
import Notification from './Notification'

//TODO add styles

const App = () => {
  const [persons, setPersons] = useState([]);
  const [message, setMessage] = useState(null);
  const [clasname, setClasname] = useState('');
  useEffect(() => {
    console.log('effect')
    const data = Services.getAll();
    data.then(data => setPersons(data))  
  }, [])

  const [filter, setfilter] = useState('')

  const addPerson = (newPerson) =>{
    if (isValid(newPerson)){
      Services.postNew(newPerson)
      .then(data => setPersons(persons.concat(data)))
      setMessage("user created correctly");
      setClasname('notification');
    }
    else{
      confirmUpdate(newPerson);
    }
  }

  const isValid = (newPerson) =>{
    if(persons.find(person=> person.name === newPerson.name)){
      return false;
    }
    return true;
  }
  const confirmUpdate = (newPerson) =>{
    if (window.confirm(`${newPerson.name} is already added to phonebook, replace the old number with a new one?`)) {
      updatePerson(newPerson);
    }
  }

  const updatePerson = (newPerson) =>{
    const id = persons.find(person => person.name === newPerson.name).id;
    Services
    .updatePerson(id, newPerson)
    .then(data => {
      setPersons(persons.map(person => person.id !== data.id ? person : data))
      setMessage("User edited correctly")
    })
    .catch(error =>{
      setMessage("There's an Error!");
      setClasname('error');
    })
    
    
  }

  const filterPersons = () =>{
    const filtered = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    return filtered;

  }

  const deletePerson = (id) =>{   
    if(confirmDelete(id)){
      Services.deletePerson(id);
       const newPersons = persons.filter(person => person.id !== id)
       setPersons(newPersons);
    }
  }

  const confirmDelete = (id) =>{
    const name = persons.find(person => person.id === id).name;
    if (window.confirm(`Do you really want to delete ${name}?`)) {
      return true;
    }
    return false;
  } 

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={setfilter}/>
      <Form onSubmit={addPerson}  />
      <Notification message={message} clasname = {clasname} />
      <h2>Numbers</h2>
      <PersonList persons={filterPersons()} onDelete={deletePerson}/>
    </div>
  )
}

export default App