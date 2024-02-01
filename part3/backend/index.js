const express = require('express');
const app = express();
app.use(express.json())

let agenda = [
    
          {
            "name": "Arto Hellas",
            "number": "040-123456",
            "id": 1
          },
          {
            "name": "Ada Lovelace",
            "number": "39-44-5323523",
            "id": 2
          },
          {
            "name": "Dan Abramov",
            "number": "12-43-234345",
            "id": 3
          },
          {
            "name": "Mary Poppendieck",
            "number": "39-23-6423122",
            "id": 4
          },
          {
            "name": "Arto Hellas Number",
            "number": "11111",
            "id": 5
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
    const id = Number(request.params.id);
    const person = agenda.find(person=> person.id === id);
    if(person){
        response.json(person);
    }else{
        response.status(404).end()
    }
  })

  app.delete('/api/persons/:id', (request, response) =>{
    
    const id = Number(request.params.id);
    agenda = agenda.filter(person => person.id !== id);
    response.status(204).end();
  })

  app.post('/api/persons', (request, response) =>{
    console.log("lo que reb per es request: ", request.body );
    const {name, number} = request.body;
    const id = generateId();
    const newEntry = {
      name,
      number,
      id
    };
    console.log("prova amb vainas de js", newEntry);
    if(isEmpty(request.body.name)&& isEmpty(request.body.number)){
      return response.status(400).json({ error: 'name and phone cant be empty' });
    }
    if(isRepeated(name)){
      return response.status(400).json({ error: 'Name cant be repeatded' });
    }
    
      agenda.push(newEntry);
      response.status(200).json(newEntry);
      console.log(agenda);
  }) 

  const generateId = () => {
    const min = agenda.length;
    const max = 1000;
    return Math.floor(Math.random() * (max-min)+min);
  }
  
  const isEmpty = (parameter) =>{
    if(!parameter || parameter.trim() === ''){
      return true;
    }
    return false;
  }
  const isRepeated = (name) => {
    if(agenda.find(entry => entry.name === name)){
      return true;
    }
    return false;
  };

  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })