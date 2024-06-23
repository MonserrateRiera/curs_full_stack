const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();
const User = require('../models/user');

//Endpoint per fer el login.
loginRouter.post('/', async (request, response) => {

    //Agafam les dades del body i cercam si l'usuari existeix
    const {username, password} = request.body;
    const user = await User.findOne({username});

    //comprovam el password amb la funcio compare de bccrypt
    const correctPassword = user === null
        ? false
        : await bcrypt.compare(password, user.passwordHash)

    //si no son correctes tots dos acabam la funció i tornam un error
    if(!(user && correctPassword)){
        return response.status(401).json({
            error: 'invalid username or password'
        })
    }
    
    //Si són correctes generam un token amb el nom d'usuari i la id. la variable SECRET s'ha de crear al .env
    const userForToken = {
        username: user.username,
        id: user._id
    }
    const token = jwt.sign(    
        userForToken,     
        process.env.SECRET,    
        { expiresIn: 60*60 }
    )
    
    response
        .status(200)
        .send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter;