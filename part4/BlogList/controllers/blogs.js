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

blogsRouter.delete('/:id')
module.exports = blogsRouter;