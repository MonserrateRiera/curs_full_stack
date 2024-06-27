//Importam els moduls per fer els tests
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const User = require('../models/user')
const helper = require ('./test_helper')

//inicialitzam l'api

const api = supertest(app);

//inicialitzam la base de dades de prova
beforeEach(async () =>{
    await User.deleteMany({});
    
    let userObject = new User(helper.inicialUsers[0]);
    await userObject.save();
     userObject = new User(helper.inicialUsers[1]);
    await userObject.save();
     userObject = new User(helper.inicialUsers[2]);
    await userObject.save();
})

describe('API USER, GET', () => {
    
    test('should get the number of inicial users', async () => {
        const result = await api.get('/api/users/')
        expect(result.body).toHaveLength(helper.inicialUsers.length);
    });
});

describe('API USER, POST', () => {
    test('should return 201 ok', async () => {

        await api
            .post('/api/users/')
            .send(helper.newUser)
            .expect(201);
    });
});



afterAll(async () => {
    await mongoose.connection.close();
  });