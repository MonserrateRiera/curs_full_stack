
//Importam els moduls per fer els tests
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const blog = require('../models/blog');
const User = require('../models/user');
const helper = require('./test_helper');
const jwt = require('jsonwebtoken');

//Inicialitzam el supertest amb l'aplicació express.
const api = supertest(app);

//Deixam la base de dades en un estat conegut abans de fer els tests.
let userObject = null; 
beforeEach(async () =>{
    //eliminam tots els blogs i insertam els tres que he creat abans a la base de dades de proves.
    await blog.deleteMany({});
    let blogObject = new blog(helper.inicialBlogs[0]);
    await blogObject.save();
    blogObject = new blog(helper.inicialBlogs[1]);
    await blogObject.save();
    blogObject = new blog(helper.inicialBlogs[2]);
    await blogObject.save();
    //a més, eliminam els usuaris que hi pugui haver i n'afegim un
    await User.deleteMany({});
    userObject = new User(helper.inicialUsers[0]);
    console.log('creant usuari ',userObject)
    await userObject.save();
})
const generateToken = async (id) =>{
    const user1 = await User.findById(id);
    //cream un tokem amb la informació de l'usuari per poder autenticar-no per crear el blog.
    const userForToken = {
        username: user1.username,
        id: user1._id
    }
    const token = jwt.sign(    
        userForToken,     
        process.env.SECRET,    
        { expiresIn: 60*60 }
    )
    return token;
}

describe('API BLOG test, GET', () => {

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

describe ('API BLOG test, POST', () => {

    test('Posting without autorization should be a 401 error', async () => {
        const user1 = await User.findById(userObject.id);
        console.log('usuari ', user1);
        await api.post('/api/blogs/').send(helper.newBlog(user1._id)).expect(401);
    });
    

    test('should create a new Blog', async ()  => {
        //obtenim l'usuari que tenim a la base de dades.
        const token = await generateToken(userObject.id);
        //ara ja si, feim la petició amb un nou blog i el token.
        const newBlog = helper.newBlog(userObject.id);
        console.log(newBlog);

        await api.post('/api/blogs/')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(201);
        
    });
    test('should add a new blog with likes 0 if likes are not defined', async()=> {
        //generam token
        const token = await generateToken(userObject.id);
        //Afegim el token
        await api.post("/api/blogs/")
        .set('Authorization', `Bearer ${token}`)
        .send(helper.blogNoLikes);
        const response = await api.get('/api/blogs/');
        //Comprovam si els likes del darrer valor introduït val 0 (el que hem introduit sense valor like.)
        expect(response.body[response.body.length -1].likes).toBe(0)
    });
    
    test('should receive a 400 bad request if title or url is missing', async () => {
        const token = await generateToken(userObject.id);
        await api
            .post("/api/blogs/")
            .set('Authorization', `Bearer ${token}`)
            .send(helper.blogNoUrl)
            .expect(400);
    });
});

describe("API BLOG test, DELETE", () => {
    test('should return code 401 deleting an existing blog without JWT', async () => {

        const response = (await api.get('/api/blogs/'));
        const id = response.body[response.body.length -1].id;
        console.log(id);
        await api
            .delete(`/api/blogs/${id}`)
            .expect(401);
    });

    // test('should return code 404 if id not exists', async () => {
    //     const token = await generateToken(userObject.id);
    //     const id = "65d77bf27d26a6f40cf58053"
    //     await api
    //         .delete(`/api/blogs/${id}`)
    //         .set('Authorization', `Bearer ${token}`)
    //         .expect(404);
    // });

    test('should return 400 if id isnt well formed', async () => {
        const token = await generateToken(userObject.id);
        const id = "asdas223"
        await api
            .delete(`/api/blogs/${id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(400);
    });
});

describe('API BLOG test, UPDATE', () => {
    test('should return updating blog', async () => {
        const token = await generateToken(userObject.id);
        const response = (await api.get('/api/blogs/'));
        const id = response.body[response.body.length -1].id;

        const updatingBlog = {
            title: 'Updating Blog testing',
            author: 'Test Updating',
            url: 'testUpdating.com',
            likes: 4,
            user: userObject.id
        }
        console.log(id);
        const result = await api
            .put(`/api/blogs/${id}`)
            .set('Authorization', `Bearer ${token}`)
            .send (updatingBlog);
        expect(result.body.title).toContain("Updating")    
    });
});

afterAll(() => {
    mongoose.connection.close()
  })