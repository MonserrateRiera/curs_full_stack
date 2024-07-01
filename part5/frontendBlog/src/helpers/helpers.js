

const validateName = (name) => {
    if(name && name.length>3){
        return true;
    }
}

const validatePassword = (password) => {
    //Afegir validacions més currades més envant
    if(password && password.length>3){
        return true;
    }
    return false;
}

const validateBlog = (Blog) =>{
    if(validateBlogPart(Blog.title) && validateBlogPart(Blog.url) && validateBlogPart(Blog.author)){
        return true;
    }
    return false;
}

const validateBlogPart = (part) => {
    if(part && part.length>3){
        return true;
    }
    return false;
}


export default {validateName, validatePassword, validateBlog}