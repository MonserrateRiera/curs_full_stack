require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
app.use(express.json());
const Entry = require('./Models/Entry');

morgan.token('body', function (req, res) { return JSON.stringify(req.body) });
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));
app.use(cors());
app.use(express.static('dist'))

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })  
  }

  next(error);
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
};

app.get('/', (request, response) => {
  response.send('<h1>Hello Phonelist!</h1>');
});

app.get('/api/persons', (request, response) => {
  Entry.find({})
    .then((result) => {
      response.json(result);
    });
});

app.get('/info', (request, response) => {
  response.send('<p>Phonebook has info for 2 people.</p>');
});

app.get('/api/persons/:id',(request, response, next)=>{
  console.log(request.params.id)
  Entry.findById(request.params.id)
    .then((person) => {
      person ? response.json(person) : response.status(404).end();
    })
    .catch((error) => next(error));
});

app.delete('/api/persons/:id', (request, response, next) => {
  Entry.findByIdAndDelete(request.params.id)
    .then((result) => {
      response.status(204).end
    })
    .catch((error) => next(error));
});

app.put('/api/persons/:id', (request, response, next) => {
  const { name, phoneNumber } = request.body;
  const newEntry = {
    name,
    phoneNumber,
  };

  Entry.findByIdAndUpdate(request.params.id, newEntry, { new: true })
    .then((updatedNote) => {
      response.json(updatedNote);
    })
    .catch((error) => next(error));
});

app.post('/api/persons', (request, response, next) => {
  const { name, phoneNumber } = request.body;
  const newEntry = {
    name,
    phoneNumber,
  };

  console.log('prova amb vainas de js', newEntry);
  if (isEmpty(request.body.name) && isEmpty(request.body.number)) {
    return response.status(400).json({ error: 'name and phone cant be empty' });
  }
  const entry = new Entry(newEntry);
  entry.save()
    .then((savedEntry) => {
      response.json(savedEntry);
    })
    .catch((error) => next(error));
});

const isEmpty = (parameter) =>{
  if (!parameter || parameter.trim() === '') {
    return true;
  }
  return false;
};
app.use(unknownEndpoint);
app.use(errorHandler);

const { PORT } = process.env;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
