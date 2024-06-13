const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) =>{
    return blogs.reduce((sumLikes, blog) => sumLikes += blog.likes, 0);
}
const favoriteBlog  = (blogs) =>{
    return blogs.reduce((favorite, blog) => favorite.likes > blog.likes ? favorite : blog, blogs[0])
}

module.exports ={
    dummy, totalLikes, favoriteBlog
}