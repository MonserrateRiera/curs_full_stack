import { useState, useEffect } from 'react'
import Filter from './Filter'
import axios from 'axios'
import CountryList from './CountryList'

function App() {
 
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(()=>{
    axios
    .get(`https://restcountries.com/v3.1/name/${filter}`)
    .then(response =>{
      setCountries(response.data)
      console.log(response.data)
    })
    .catch(error => {
      console.log("Error, there aren't any countries with that name")
    })

  }, [filter])

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    console.log(filter);
  }

  return (
    <>
     <Filter handleFilterChange={handleFilterChange}/>
     <CountryList countries={countries}/>
    </>
  )
}

export default App
