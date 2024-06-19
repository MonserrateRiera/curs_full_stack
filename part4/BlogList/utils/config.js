const dotenv = require('dotenv').config();

const PORT = process.env.PORT
//si l'executam amb test, agafam sa variable de test.
const MONGODB_URI = process.env.NODE_ENV === 'test'   ? process.env.TEST_MONGODB_URI  : process.env.MONGODB_URI
module.exports = {
  MONGODB_URI,
  PORT
}