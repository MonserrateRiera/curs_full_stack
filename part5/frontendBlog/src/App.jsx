import { useState, useEffect } from 'react'

import './App.css'
import FormLogin from './Components/FormLogin'
import CreateBlogForm from './Components/CreateBlogForm'
import loginService from './Services/loginService'
import helpers from './helpers/helpers'
import blogService from './Services/blogService'

function App() {
const [user, setUser] = useState(null)
const [blogs, setBlogs] = useState([]);

//Hook que s'executa quant es carrega la primera vegada, agafant tots es blogs que hi ha i les carrega a l'estat blogs.
useEffect(() => {
  const fetchBlogs = async () => {
    try {
      const blogsData = await blogService.getAll(); // Asume que blogService tiene un método getAll()
      setBlogs(blogsData);
      console.log(blogsData);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  fetchBlogs();
}, []);

//Hook que serveix per agafar es token de s'emmagrzament local i l'assigna a l'user.
useEffect(() => {    
  const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')    
  if (loggedUserJSON) {      
    const user = JSON.parse(loggedUserJSON)      
    setUser(user)      
    //noteService.setToken(user.token)    
  } }, [])

const loginHandler = async (credentials) =>{
  if(helpers.validateName(credentials.username)&&helpers.validatePassword(credentials.password)){
    console.log("usuari i password valids, anem a cridar es servei")
    const token = await loginService.login(credentials);
    console.log("resultat login: ",token);
    setUser(token);
    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(token)      ) 
  }else{
    console.log("usuari i password no valid, no faig res pero haure de mostrar error.")
  }
}
const logoutHandler = () =>{
  console.log("Logout");
  window.localStorage.removeItem('loggedBlogappUser')
  setUser(null);
}
const createHandler = async (newBlog) => {
  //Cridam a la validació
  if(helpers.validateBlog(newBlog)){
    const resposta = await blogService.createBlog(newBlog, user);
    console.log(resposta);
    setBlogs(blogs.concat(resposta));
  }else{
    console.log("Blog no valid")
  }
}

  return (
    <>
      {
        user ?( 
          <div>
            <div>
              <h3>Welcome back {user.name} <button onClick={logoutHandler}>Logout</button></h3>
            </div>
            <CreateBlogForm onSubmit={createHandler} />
          </div>
        )
        : <FormLogin onSubmit={loginHandler} />
      }
      <h1>Llistat de blogs aqui</h1>
      {
        blogs ? blogs.map(blog => (
          <p key={blog.id}>{blog.title}</p>
        ))
        :<h4>Theres no blogs to show</h4>
      }
    </>
  )
}

export default App
