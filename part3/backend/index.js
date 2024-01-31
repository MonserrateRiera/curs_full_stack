const express = require('express');
const app = express();

let agenda = [
    
          {
            "name": "Arto Hellas",
            "number": "040-123456",
            "id": "1"
          },
          {
            "name": "Ada Lovelace",
            "number": "39-44-5323523",
            "id": "2"
          },
          {
            "name": "Dan Abramov",
            "number": "12-43-234345",
            "id": "3"
          },
          {
            "name": "Mary Poppendieck",
            "number": "39-23-6423122",
            "id": "4"
          },
          {
            "name": "Arto Hellas Number",
            "number": "11111",
            "id": "1fdb"
          }
];


app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })
  
  app.get('/api/persons', (request, response) => {
    response.json(agenda)
  })
  app.get('/info', (request, response) => {
    const date = new Date();
    response.send(`<p>Phonebook has info for ${agenda.length} people.</p> <p>${date}</p>`)
  })

  app.get('/api/persons/:id',(request, response)=>{
    const id = request.params.id;
    const person = agenda.find(person=> person.id === id);
    if(person){
        response.json(person);
    }else{
        response.status(404).end()
    }
  })

  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })