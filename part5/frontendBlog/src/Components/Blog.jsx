import Togglable from "./Toggable";


export const Blog = ({blogId, title, author, url, likes }) => {
  return (
    <div>
        <h4>{ title }</h4>
        <Togglable buttonLabel="View" cancelButton="Hide">
            <span>Autor: { author }</span>
            <span>Direccion web: { url }</span>
            <span>Numero de likes: {likes} <button>Like!</button></span>
        </Togglable>
        
    </div>
  );
};


export default Blog;