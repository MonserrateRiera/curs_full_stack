import { useState } from "react";
import Togglable from "./Toggable";
import PropTypes from "prop-types";

export const Blog = ({id, title, author, url, likes, user, onLikeClick, onDeleteClick }) => {

  const [currentLikes, setCurrentLikes] = useState(likes);
  

  const likeHandler = () =>{
    
    setCurrentLikes( currentLikes + 1);
   
    const blog = {
      id,
      title,
      author,
      likes : currentLikes,
      user
    };
    onLikeClick(blog);
  }

  const removeHandler = () => {
    const blog = {
      id,
      title,
      author,
      likes : currentLikes,
      user
    };
    onDeleteClick(blog)
  }

  return (
    <div>
        <h4>{ title }</h4>
        <Togglable buttonLabel="View" cancelButton="Hide">
            <p>Autor: { author }</p>
            <p>Direccion web: <a href={{ url }}> Direccion web</a></p>
            <p>Numero de likes: {currentLikes} <button onClick={likeHandler}>Like!</button></p>
            <p>Usuario que añadio el blog: {user.name} </p>
            <p><button onClick={removeHandler}>Remove</button></p>
        </Togglable>
        
    </div>
  );
};


export default Blog;

Blog.propTypes = {
  id: PropTypes.string.isRequired, 
  title: PropTypes.string.isRequired, 
  author: PropTypes.string.isRequired, 
  url: PropTypes.string.isRequired, 
  likes : PropTypes.number.isRequired, 
  user : PropTypes.object.isRequired, 
  onLikeClick : PropTypes.func.isRequired, 
  onDeleteClick: PropTypes.func.isRequired
}