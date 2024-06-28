import { useState } from 'react'

import './App.css'
import FormLogin from './Components/FormLogin'
import loginService from './Services/loginService'
import helpers from './helpers/helpers'


function App() {
const [user, setUser] = useState(null)

const loginHandler = async (credentials) =>{
  if(helpers.validateName(credentials.username)&&helpers.validatePassword(credentials.password)){
    console.log("usuari i password valids, anem a cridar es servei")
    const token = await loginService.login(credentials);
    console.log("resultat login: ",token);
    setUser(token);
  }else{
    console.log("usuari i password no valid, no faig res pero haure de mostrar error.")
  }
}



  return (
    <>
      {
        user ? <h3>Welcome back {user.name} </h3>
        : <FormLogin onSubmit={loginHandler} />
      }
      <h1>Llistat de blogs aqui</h1>
    </>
  )
}

export default App
