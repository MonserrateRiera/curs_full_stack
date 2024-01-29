import axios from "axios";

const URL = 'http://localhost:3001/persons';

const getAll = () =>{
    const request = axios.get(URL);
      return request.then(response=>response.data);
}
const postNew = (newPerson) =>{
    const request = axios.post(URL, newPerson);
    return request.then(response=>response.data);
}

const deletePerson = (id) =>{
    const request  = axios.delete(`${URL}/${id}`);
    return request.then(response => response.data);
}
const updatePerson = (id, newPerson) =>{
    console.log(`${URL}/${id}`, newPerson)
    const request = axios.put(`${URL}/${id}`, newPerson);
    return request.then(response=>response.data);
}

export default {getAll, postNew, deletePerson, updatePerson};