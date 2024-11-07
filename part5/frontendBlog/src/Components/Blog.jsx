import Togglable from "./Toggable";


export const Blog = ({id, title, author, url, likes, user, onLikeClick }) => {


  const likeHandler = () =>{
    const blog = {
      id,
      title,
      author,
      likes,
      user
    };
    onLikeClick(blog);
  }

  return (
    <div>
        <h4>{ title }</h4>
        <Togglable buttonLabel="View" cancelButton="Hide">
            <p>Autor: { author }</p>
            <p>Direccion web: <a href={{ url }}> Direccion web</a></p>
            <p>Numero de likes: {likes} <button>Like!</button></p>
        </Togglable>
        
    </div>
  );
};


export default Blog;