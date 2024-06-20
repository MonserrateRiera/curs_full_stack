const blog = require ('../models/blog');

const inicialBlogs = [
    {
        title: 'Blog testing 1',
        author: 'Monserrat',
        url: 'testing1Monxo.com',
        likes: 4
    },
    {
        title: 'Blog testing 2',
        author: 'Tomas',
        url: 'testing2Tomas.com',
        likes: 4
    },
    {
        title: 'Blog testing 3',
        author: 'cati',
        url: 'testing3cati.com',
        likes: 4
    }
];
const newBlog = {
    title: 'Blog testing 4',
    author: 'Joan',
    url: 'testing4Joan.com',
    likes: 4 
};

const blogNoLikes ={
    title: 'Blog testing without likes',
    author: 'testing',
    url: 'testing5'
};

const blogNoUrl = {
    author: 'testing',
    url: 'testing5',
    likes: 4
};


module.exports = {
    inicialBlogs, newBlog, blogNoLikes, blogNoUrl, getAllBlogs
}