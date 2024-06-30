import axios from 'axios';

const URL = 'http://localhost:3003/api/blogs';

const getAll = async () =>{
    const request = await axios.get(URL);
    if(request){
        return request.data;
    }
}








export default {
    getAll
}