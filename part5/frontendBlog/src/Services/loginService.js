import axios from "axios";

const baseURL = 'http://localhost:3003/api/login';

const login = async (credentials) =>{
    const request = await axios.post(baseURL, credentials);
    return request.data;
}




export default{
    login
}