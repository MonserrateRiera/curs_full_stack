import axios from 'axios';

const URL = 'api/blogs';

const getAll = async () =>{
    const request = await axios.get(URL);
    if(request){
        return request.data;
    }
}








export default {
    getAll
}