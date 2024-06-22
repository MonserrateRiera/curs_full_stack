const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const { error } = require('../utils/logger');
const User = require('../models/user')

//Mostrar tots els blogs
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {username:1, name:1});
    if(blogs){
      response.json(blogs);
    }else{
      response.status(404);
    }
    // Blog
    //   .find({})
    //   .then(blogs => {
    //     response.json(blogs)
    //   })
  })
  //Postear un blog nou
blogsRouter.post('/', async (request, response) => {

  //Afegim el contingut a la variable body i cercam l'usuari que serà el creador de la nota.
    const body = request.body
    console.log(body);
    const user = await User.findById(body.userId)
//Cream un nou objecte blog, amb les dades rebudes
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user.id
    })
    //Desam el blog i amb la resposta afegim la id del blog a l'usuari i desam l'usuari..
    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    response.status(201).json(savedBlog);

})
//Eliminam un blog. 
blogsRouter.delete('/:id', async (request, response) => {
  console.log('request : '+ request.params.id);
  const id = request.params.id;
  const result = await Blog.findByIdAndDelete(id);
  if(result){
    response.send(204).end;
  }else{
    response.send(404).end;
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const updatedBlog = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes
  }
  const result = await Blog.findByIdAndUpdate(request.params.id, updatedBlog, { new: true });
  if(result){
    response.json(result);
  }else{
    response.status(400);
  }
})

module.exports = blogsRouter;