
//Importam encriptacio, funcions denrutament i el model
const bcrypt = require('bcrypt')
const usersRouter = require('express').Router();
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {

    //mitjançant desestructuracio d'objectes obtenim els paràmetres rebuts a la peticio.
    const {username, name, password} = request.body;

    const saltRounds = 10;
    //Encriptam el password i desam el hash
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash,
      })
    
      const savedUser = await user.save()
    
      response.status(201).json(savedUser)
    })
    
    usersRouter.get('/', async (request, response) => {
      const users = await User.find({}).populate('blogs');
      response.json(users)
    })

    module.exports = usersRouter
