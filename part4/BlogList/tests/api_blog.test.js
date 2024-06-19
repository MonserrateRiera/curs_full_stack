
//Importam els moduls per fer els tests
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const blog = require('../models/blog');

//Inicialitzam el supertest amb l'aplicació express.
const api = supertest(app);

//Deixam la base de dades en un estat conegut abans de fer els tests.
const inicialBlogs = [
    {
        title: 'Blog testing 1',
        author: 'Monserrat',
        url: 'testing1Monxo.com',
        likes: 4
    },
    {
        title: 'Blog testing 2',
        author: 'Tomas',
        url: 'testing2Tomas.com',
        likes: 4
    },
    {
        title: 'Blog testing 3',
        author: 'cati',
        url: 'testing3cati.com',
        likes: 4
    }
];
beforeEach(async () =>{
    //eliminam tots els blogs i insertam els tres que he creat abans a la base de dades de proves.
    await blog.deleteMany({});
    let blogObject = new blog(inicialBlogs[0]);
    await blogObject.save();
    blogObject = new blog(inicialBlogs[1]);
    await blogObject.save();
    blogObject = new blog(inicialBlogs[2]);
    await blogObject.save();
})

describe('Group of tests trying the api', () => {

    test('should return the number of blogs from the api',  async () => {
        const response = await api.get('/api/blogs/');
        console.log('response of the database ',response.body);
        expect(response.body).toHaveLength(inicialBlogs.length);
    });
    test('should return the id like id and not _id', async () => {
        const response = await api.get('/api/blogs/');
        expect(response.body[0].id).toBeDefined();
    })
});


afterAll(() => {
    mongoose.connection.close()
  })