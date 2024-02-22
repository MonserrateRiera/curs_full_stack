const entriesRouter = require ('express').Router();
const Entry = require('../models/Entry');

entriesRouter.get('/', (request, response) => {
    Entry.find({})
        .then((entries) => {
        response.json(entries);
        });
});
entriesRouter.get('/:id',(request, response, next)=>{
    Entry.findById(request.params.id)
      .then((person) => {
        person ? response.json(person) : response.status(404).end();
      })
      .catch((error) => next(error));
  });
  
  entriesRouter.delete('/:id', (request, response, next) => {
    Entry.findByIdAndDelete(request.params.id)
      .then((result) => {
        response.status(204).end
      })
      .catch((error) => next(error));
  });
  
  entriesRouter.put('/:id', (request, response, next) => {
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
  
  entriesRouter.post('/', (request, response, next) => {
    const { name, phoneNumber } = request.body;
    const newEntry = {
      name,
      phoneNumber,
    };
    const entry = new Entry(newEntry);
    entry.save()
      .then((savedEntry) => {
        response.json(savedEntry);
      })
      .catch((error) => next(error));
  });

module.exports = entriesRouter;
