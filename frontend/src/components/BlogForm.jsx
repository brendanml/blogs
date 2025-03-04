import {useState} from 'react';
import bs from '../services/blogs';

const BlogForm = ({user, setBlogs, setNotification}) => {

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const onSubmit = async (event) => {
        console.log("submitting a blog")
        event.preventDefault()
        console.log("in blogform the user token is: ", user.token)
        const blog = {
            title: title,
            author: author,
            url: url,
            likes: 0,
        }
        try {
            const res = await bs.create(blog, user.token)
            if(res === null) {
                throw new Error("there was an error creating the blog")
            }
            console.log("the res is...", res)
            setBlogs((prevBlogs) => [...prevBlogs, res])
            console.log("blog created successfully")
            setTitle('')
            setAuthor('')
            setUrl('')
        } catch(e) {
            console.log("there was an error", e)
            setNotification("there was an error posting the blog")
            setTimeout(() => {
                setNotification(null)
            }, 3000)
        }
    }

    return (
        <div>
            <h2>post a blog...</h2>
            <form onSubmit={onSubmit}>
                <div>
                    Title: 
                    <input type="text" name="title" value={title} onChange={(e)=>{setTitle(e.target.value)}}/>
                </div>
                <div>
                    Author: 
                    <input type="text" name="author" value={author} onChange={(e)=>{setAuthor(e.target.value)}} />
                </div>
                <div>
                    URL: 
                    <input type="text" name="url" value={url} onChange={(e)=>{setUrl(e.target.value)}}/>
                </div>
                <button>Submit</button>
            </form>
        </div>
    )
}

export default BlogForm;