const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const { error } = require('../utils/logger');

//Mostrar tots els blogs
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
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
    const blog = new Blog(request.body)
    const savedBlog = await blog.save();
    response.status(201).json(savedBlog);
    // blog
    //   .save()
    //   .then(result => {
    //     response.status(201).json(result)
    //   })
    //   .catch((error) => next(error));
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