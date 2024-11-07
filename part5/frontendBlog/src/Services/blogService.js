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


const addLike = async ( blog ) => {
    //console.log(`URL/${blog.id}`)
    const request = await axios.put( `${URL}/${blog.id}`, {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes
    });
    if(request){
        return request.data;
    }
}

const removeBlog = async ( id, user ) =>{
    const config = {
        headers: {Authorization: `Bearer ${user.token}`}
    }
    console.log("Token ", config);
    const request = await axios.delete( `${URL}/${id}`, config);
    if(request){
        return request.data;
    }
}






export default {
    getAll,
    createBlog,
    addLike,
    removeBlog
}