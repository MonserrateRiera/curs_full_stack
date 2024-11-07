//formulari per fer login
import { useState } from "react";
import PropTypes from "prop-types";

const FormLogin = ({onSubmit}) =>{
    //declaram els useState per gestionar password i username
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    //Funció que serveix per controlar el que passsa al pitjar el botó
    const handleSubmit = (event) => {
        event.preventDefault();
        const credentials = {username : name,
             password: password}
             //cridam a la funció que hem rebut
        onSubmit(credentials);     
        //resetejam el contingut del formulari
        setName('');
        setPassword('');
    }

    return (
        <form onSubmit={handleSubmit}>
            username
            <input 
                type="text" 
                value={name}
                onChange={({target}) => setName(target.value)} 
                name="username"

            />
            password
            <input type="password" 
                value={password}
                onChange={({target}) => setPassword(target.value)}
                name="password"
            />
            <button type="submit">Login</button>
        </form>
    )
} 

export default FormLogin;

FormLogin.propTypes = {
    onSubmit: PropTypes.func.isRequired
  }