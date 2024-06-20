//Importam els moduls per fer els tests
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const User = require('../models/user')

//inicialitzam l'api

const api = supertest(app);