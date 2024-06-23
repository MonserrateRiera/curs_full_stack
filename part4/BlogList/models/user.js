//Importam mongoose
const mongoose = require ('mongoose');

// cream esquema d'usuari

const userSchema = new mongoose.Schema({
    username: {    
        type: String,    
        required: true,    
        unique: true,
        minLength:3  
    },
    name: String,
    passwordHash: String,

    //Cada usuari tendrà un array de blogs. Per això, afegim sa id de cadascun i una referencia.

    blogs : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog'
        }
    ]
});

//Feim una transformació per llevar es guió baix de id que te per defecte i per no mostrar el password.

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
      // el passwordHash no debe mostrarse
      delete returnedObject.passwordHash
    }
  })
  
  const User = mongoose.model('User', userSchema)
  
  module.exports = User