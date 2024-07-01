import { useState } from "react"



const CreateBlogForm = ({onSubmit}) =>{
    const [title, setTitle] = useState ('');
    const [author, setAuthor] = useState ('');
    const [url, setUrl] = useState ('');

    //Funció que recull les dades i les envia a la funcio encarregada de validar i crear el blog.
    const handleSubmit = (event) => {
        event.preventDefault();
        const newBlog = {
            title,
            author,
            url
        }
        onSubmit(newBlog);
        setAuthor('');
        setTitle('');
        setUrl('')

    }


    return (
        <> 
            <h4>Create blog</h4>
            <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input 
                    type = 'text' 
                    value = {title}
                    onChange = {({target}) => setTitle(target.value)}
                    name = "title"
                />
                <label>Author</label>
                <input 
                    type = 'text' 
                    value = {author}
                    onChange = {({target}) => setAuthor(target.value)}
                    name = "author"
                />
                <label>URL</label>
                <input
                    type ='text'
                    value = {url}
                    onChange = {({target}) => setUrl(target.value)}
                    name = "url"
                />
                <button type="submit">Create</button>
            </form>
        </>
    )
}


export default CreateBlogForm