const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const { error } = require('../utils/logger');
const User = require('../models/user')
const jwt = require('jsonwebtoken')

//Metode per extreure el token de la petició

// const getTokenFrom = request => {
//     const authorization = request.get('authorization')  
//     if (authorization && authorization.startsWith('Bearer ')) {   
//        return authorization.replace('Bearer ', '')  
//       }  
//     return null
//   }



//Mostrar tots els blogs
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {username:1, name:1});
    if(blogs){
      response.json(blogs);
    }else{
      response.status(404);
    }

  })

  //Postear un blog nou sempre i quant sigui un usuari autenticat.
blogsRouter.post('/', async (request, response) => {

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {    
    return response.status(401).json({ 
      error: 'token invalid' })  
    }  
    const user = await User.findById(decodedToken.id)
  //Afegim el contingut a la variable body i cercam l'usuari que serà el creador de la nota.
    const body = request.body
    console.log(body);

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

  //comprovam si esta logueat amb un token
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {    
    return response.status(401).json({ 
      error: 'token invalid' })  
    }  
    
  console.log('request : '+ request.params.id);
  const id = request.params.id;
  const blog = await Blog.findById(id);
  console.log("blog" , blog);
  console.log("token ", decodedToken);
  //comprovam si l'usuari es el mateix que ha donat el blog d'alta
  if ( blog.user.toString() === decodedToken.id.toString() ){
    const result = await Blog.findByIdAndDelete(id);
    if(result){
      response.send(204).end;
    }else{
      response.send(404).end;
    }
  }else{
    response.status(403).json({
      error: 'incorrect user'
    })
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