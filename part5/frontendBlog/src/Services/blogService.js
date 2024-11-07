import axios from 'axios';

const URL = 'http://localhost:3003/api/blogs';

const getAll = async () =>{
    const request = await axios.get(URL);
    if(request){
        return request.data;
    }
}

const createBlog = async (newBlog, token) => {
    const config = {
        headers: {Authorization: `Bearer ${token.token}`}
    }
    console.log("Token ", config);
    const request = await axios.post(URL, newBlog, config);
    if(request){
        return request.data;
    }
}
/**
 * 
 * @param {*} id 
 * @returns 
 * Afegit aquest metodo. A nes backend s'ha de fer un put nombes amb so id per actualizar es likes
 */
const addLike = async (id) => {
    const request = await axios.put(`URL/${id}`);
    if(request){
        return request.data;
    }
}








export default {
    getAll,
    createBlog,
    addLike
}