import Toggleable from './Toggleable'
import bs from '../services/blogs'

const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  
  const deleteButtonStyle = {
    backgroundColor: '#f44336',
    color: 'white',
    borderRadius: 2,
    // border: '1px solid black',
    border: 'none',
  }
  
  const updateLikes = async (blog, user, setBlogs) => {
    try {
      const res = await bs.increaseLikes(blog, user.token)
      const updatedBlog = { ...res, likes: blog.likes+1 }
      setBlogs((prevBlogs) => prevBlogs.map(b => b.id === blog.id ? updatedBlog : b))
    } catch(e) {
      console.log('there was an error updating the likes', e)
    }
  }
  
  const deleteBlog = async (blog, user, setBlogs) => {
    try {
      const res = await bs.deleteBlog(blog, user.token)
      setBlogs((prevBlogs) => prevBlogs.filter(b => b.id !== blog.id))
    } catch(e) {
      console.log('there was an error deleting the blog', e)
    }
  }
  
const Blog = ({ blog, user, setBlogs }) => (
<div style={blogStyle}>
    {blog.title}
    <Toggleable buttonLabel="view" cancel="hide">
    <div>{blog.url}</div>
    <div>{blog.likes}<button onClick={() => {updateLikes(blog, user, setBlogs)}} >Like</button></div>
    <div>{blog.author}</div>
    {user.id === blog.user ? <button style={deleteButtonStyle} onClick={() => {deleteBlog(blog, user, setBlogs)}}>delete</button> : null}
    </Toggleable>
</div>
)

export default Blog