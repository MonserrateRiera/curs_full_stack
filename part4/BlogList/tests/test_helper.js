const blog = require('../models/blog');
const Blog = require ('../models/blog');

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
const newBlog = (userId) => {
    let blog = {
        title: 'Blog testing 4',
        author: 'Joan',
        url: 'testing4Joan.com',
        likes: 4,
        user: userId
        }

    return blog;
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

const blogsInDb = async () =>{

    const blogs = await Blog.find({});
    return blogs.map(note => note.toJSON())
}

const inicialUsers = [
    {
        username: "benitocamelas",
        name: "Benito",
        password: "benito123",
    },
    {
        username: "kerrykaverga",
        name: "Kerry",
        password: "kerry123",
        blogs: null
    },
    {
        username: "test",
        name: "Kerry test",
        password: "test123",
        blogs: null
    },
];

const newUser ={
    username: "Peptest",
    name: "pep testeo",
    password: "test123",
    blogs: null
};

module.exports = {
    inicialBlogs, newBlog, blogNoLikes, blogNoUrl, inicialUsers, newUser
}