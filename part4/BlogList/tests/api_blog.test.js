
//Importam els moduls per fer els tests
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const blog = require('../models/blog');
const helper = require('./test_helper');

//Inicialitzam el supertest amb l'aplicació express.
const api = supertest(app);

//Deixam la base de dades en un estat conegut abans de fer els tests.

beforeEach(async () =>{
    //eliminam tots els blogs i insertam els tres que he creat abans a la base de dades de proves.
    await blog.deleteMany({});
    let blogObject = new blog(helper.inicialBlogs[0]);
    await blogObject.save();
    blogObject = new blog(helper.inicialBlogs[1]);
    await blogObject.save();
    blogObject = new blog(helper.inicialBlogs[2]);
    await blogObject.save();
})

describe('API test, GETing blogs', () => {

    test('should return the number of blogs from the api',  async () => {
        const response = await api.get('/api/blogs/');
        console.log('response of the database ',response.body);
        expect(response.body).toHaveLength(helper.inicialBlogs.length);
    });
    test('should return the id like id and not _id', async () => {
        const response = await api.get('/api/blogs/');
        expect(response.body[0].id).toBeDefined();
    })
});

describe ('API tests, POSTing blogs', () => {
    test('should add a new blog', async () => {
        

        await api.post('/api/blogs/').send(helper.newBlog);
        const response = await api.get('/api/blogs/');
        //Es comprova que la resposta de obtenir tots els post es la original més 1.
        expect(response.body).toHaveLength(helper.inicialBlogs.length + 1);
    });
    
    test('should add a new blog with likes 0 if likes are not defined', async()=> {
       
        await api.post("/api/blogs/").send(helper.blogNoLikes);
        const response = await api.get('/api/blogs/');
        //Comprovam si els likes del darrer valor introduït val 0 (el que hem introduit sense valor like.)
        expect(response.body[response.body.length -1].likes).toBe(0)
    });
    
    test('should receive a 400 bad request if title or url is missing', async () => {

        await api
            .post("/api/blogs/")
            .send(helper.blogNoUrl)
            .expect(400);

    });
});

describe("API tests, DELETEing blogs", () => {
    test('should return code 204 deleting an existing blog', async () => {

        const response = (await api.get('/api/blogs/'));
        const id = response.body[response.body.length -1].id;
        console.log(id);
        await api
            .delete(`/api/blogs/${id}`)
            .expect(204);
    });

    test('should return code 404 if id not exists', async () => {
        const id = "65d77bf27d26a6f40cf58053"
        await api
            .delete(`/api/blogs/${id}`)
            .expect(404);
    });

    test('should return 400 if id isnt well formed', async () => {
        const id = "sda2123"
        await api
            .delete(`/api/blogs/${id}`)
            .expect(400);
    });
});

describe('API tests UPDATING blogs', () => {
    test('should return updating blog', async () => {
        const response = (await api.get('/api/blogs/'));
        const id = response.body[response.body.length -1].id;

        const updatingBlog = {
            title: 'Updating Blog testing',
            author: 'Test Updating',
            url: 'testUpdating.com',
            likes: 4
        }
        console.log(id);
        const result = await api
            .put(`/api/blogs/${id}`)
            .send (updatingBlog);
        expect(result.body.title).toContain("Updating")    
    });
});

afterAll(() => {
    mongoose.connection.close()
  })