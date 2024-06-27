const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user');


const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next();
}
//funcio per extreure sa info des token
const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')  
    if (authorization && authorization.startsWith('Bearer ')) {   
      request.token = authorization.replace('Bearer ', '')
      }  
  next()
}
const userExtractor =  (request, response, next) => {
  const user = {
    username :request.token.username, 
    id: request.token.id
  };
  
  if (user.username && user.id) {
    console.log("userExtractor: ",user)
    request.user = user;
    next();
  } else {
    // Enviar una respuesta de error si no se encuentra el usuario
    response.status(401).json({ error: 'User not found in token' });
  }
}
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {    
    return response.status(400).json({ error: 'expected `username` to be unique' })  
  }else if (error.name ===  'JsonWebTokenError') {
      return response.status(401).json({ error: 'token invalid' })
  }else if (error.name === 'TokenExpiredError') {    
    return response.status(401).json({ error: 'token expired'})  
  }else if (error.name === 'ForbiddenError') {    
    return response.status(401).json({ error: 'access denied'})  
  }else if (error.name ==='NotFound'){
    return response.status(404).json({error: 'resource not found'})
  }
  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}