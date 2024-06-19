const mongoose = require('mongoose'); 

const entrySchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  phoneNumber: {
    type: String,
    validate: {
      validator: function(v) {
        return /\d{3}-\d{6}/.test(v);
      },
      message: (props) => `${props.value} no es un número de teléfono válido. El formato debe ser 123-456789`,
    },
    required: true,
  },
});

//Esborram valors que te a sa bbdd.
entrySchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

module.exports = mongoose.model('Entry', entrySchema)