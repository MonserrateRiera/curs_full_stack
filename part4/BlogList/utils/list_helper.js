const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) =>{
    return blogs.reduce((sumLikes, blog) => sumLikes += blog.likes, 0);
}
const favoriteBlog  = (blogs) =>{
    return blogs.reduce((favorite, blog) => favorite.likes > blog.likes ? favorite : blog, blogs[0])
}
const mostBlogs = (blogs) => {
    const count = {};
    
    blogs.forEach(blog => {
        if(count[blog.author]){
            count[blog.author] ++;
        }else {
            count[blog.author] = 1;
        }
    });
    let maxBlogs = 0;
    let maxAuthor ='';

    for (const author in count){
        if(count[author]>maxBlogs){
            maxBlogs = count[author];
            maxAuthor = author
        }
    }
    return maxAuthor;
}

module.exports ={
    dummy, totalLikes, favoriteBlog, mostBlogs
}